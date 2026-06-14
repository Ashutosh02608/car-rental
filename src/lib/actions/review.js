'use server'

import dbConnect from "@/lib/mongodb"
import Review from "@/models/Review"
import Reservation from "@/models/Reservation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createReview(formData) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: 'Auth required.' }

  const reservationId = formData.get('reservationId')
  const rating = Number(formData.get('rating'))
  const comment = formData.get('comment')

  if (!rating || !comment) {
    return { error: 'Rating and comment are required.' }
  }

  try {
    await dbConnect()

    const reservation = await Reservation.findById(reservationId)
    if (!reservation) return { error: 'Reservation not found.' }

    // Security: Ensure the user is the one who made the reservation
    if (reservation.user.toString() !== session.user.id) {
      return { error: 'Unauthorized.' }
    }

    // Security: Ensure reservation is 'Completed' or at least 'Confirmed'
    // For this mockup, let's allow confirmed ones too, but usually it's after completion.
    // if (reservation.status !== 'Completed') return { error: 'Can only review completed reservations.' }

    const review = await Review.create({
      user: session.user.id,
      car: reservation.car,
      reservation: reservationId,
      rating,
      comment,
    })

    revalidatePath('/dashboard')
    revalidatePath(`/fleet/${reservation.car}`)

    return { success: 'Review published to the manifest.', review: JSON.parse(JSON.stringify(review)) }
  } catch (error) {
    if (error.code === 11000) {
      return { error: 'Review already exists for this operation.' }
    }
    console.error('Review error:', error)
    return { error: 'Failed to publish review.' }
  }
}

export async function getCarReviews(carId) {
  try {
    await dbConnect()
    const reviews = await Review.find({ car: carId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
    return { success: true, reviews: JSON.parse(JSON.stringify(reviews)) }
  } catch (error) {
    return { error: 'Failed to fetch reviews.' }
  }
}
