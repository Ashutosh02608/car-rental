'use server'

import dbConnect from "@/lib/mongodb"
import Reservation from "@/models/Reservation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { sendEmail, emailTemplates } from "@/lib/email"
import Car from "@/models/Car"

export async function createReservation(formData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: 'Authentication required to initiate reservation.' }
  }

  const carId = formData.get('carId')
  const startDate = formData.get('startDate')
  const endDate = formData.get('endDate')
  const pricePerDay = Number(formData.get('pricePerDay'))

  if (!startDate || !endDate) {
    return { error: 'Reservation cycle dates are required.' }
  }

  try {
    await dbConnect()

    const car = await Car.findById(carId)
    if (!car) return { error: 'Unit not found.' }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end <= start) {
      return { error: 'End cycle must follow start cycle.' }
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    const totalPrice = days * pricePerDay

    const reservation = new Reservation({
      user: session.user.id,
      car: carId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'Pending'
    })

    await reservation.save()

    // Async email notification
    const template = emailTemplates.reservationRequest(session.user, car, reservation)
    await sendEmail({
      to: session.user.email,
      ...template
    })

    revalidatePath('/dashboard')
    revalidatePath(`/fleet/${carId}`)

    return { success: 'Reservation request transmitted. Awaiting concierge confirmation.' }
  } catch (error) {
    console.error('Reservation error:', error)
    return { error: 'Critical system error during transmission.' }
  }
}

export async function payReservation(id) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: 'Auth required' }

  try {
    await dbConnect()
    const reservation = await Reservation.findById(id)
    if (!reservation) return { error: 'Reservation not found' }
    
    if (reservation.user.toString() !== session.user.id) {
      return { error: 'Unauthorized' }
    }

    reservation.status = 'Confirmed'
    await reservation.save()

    revalidatePath('/dashboard')
    revalidatePath(`/checkout/${id}`)

    return { success: 'Payment authorized and escrow finalized.' }
  } catch (error) {
    return { error: 'Transaction failed.' }
  }
}
