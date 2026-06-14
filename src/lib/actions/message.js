'use server'

import dbConnect from "@/lib/mongodb"
import Message from "@/models/Message"
import Reservation from "@/models/Reservation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { sendEmail, emailTemplates } from "@/lib/email"
import User from "@/models/User"

export async function sendMessage(reservationId, content) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: 'Auth required.' }

  try {
    await dbConnect()
    const reservation = await Reservation.findById(reservationId).populate('car')
    if (!reservation) return { error: 'Reservation not found.' }

    // Determine receiver (the other party in the reservation)
    const isRenter = reservation.user.toString() === session.user.id
    const isOwner = reservation.car.owner.toString() === session.user.id

    if (!isRenter && !isOwner) {
      return { error: 'Unauthorized to participate in this thread.' }
    }

    const receiverId = isRenter ? reservation.car.owner : reservation.user
    const receiver = await User.findById(receiverId)

    const newMessage = await Message.create({
      reservation: reservationId,
      sender: session.user.id,
      receiver: receiverId,
      content,
    })

    // Async email notification
    if (receiver) {
      const template = emailTemplates.newMessage(session.user, receiver, reservation, reservation.car, content)
      await sendEmail({
        to: receiver.email,
        ...template
      })
    }

    revalidatePath(`/dashboard/messages/${reservationId}`)
    return { success: 'Message transmitted.', message: JSON.parse(JSON.stringify(newMessage)) }
  } catch (error) {
    console.error('Messaging error:', error)
    return { error: 'Failed to transmit message.' }
  }
}

export async function getMessages(reservationId) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: 'Auth required.' }

  try {
    await dbConnect()
    const reservation = await Reservation.findById(reservationId).populate('car')
    if (!reservation) return { error: 'Reservation not found.' }

    if (reservation.user.toString() !== session.user.id && reservation.car.owner.toString() !== session.user.id) {
       return { error: 'Unauthorized.' }
    }

    const messages = await Message.find({ reservation: reservationId }).sort({ createdAt: 1 })
    return { success: true, messages: JSON.parse(JSON.stringify(messages)) }
  } catch (error) {
    return { error: 'Failed to fetch thread.' }
  }
}
