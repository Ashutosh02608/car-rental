'use server'

import dbConnect from "@/lib/mongodb"
import Reservation from "@/models/Reservation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { sendEmail, emailTemplates } from "@/lib/email"
import User from "@/models/User"
import Car from "@/models/Car"

export async function updateReservationStatus(id, status) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: 'Auth required' }

  try {
    await dbConnect()
    const reservation = await Reservation.findById(id).populate('car')
    if (!reservation) return { error: 'Reservation not found' }

    // Check if Admin or the Owner of the specific car
    const isOwner = reservation.car.owner.toString() === session.user.id
    const isAdmin = session.user.role === 'admin'

    if (!isAdmin && !isOwner) {
      return { error: 'Unauthorized to modify this reservation manifest.' }
    }

    reservation.status = status
    await reservation.save()
    
    // Refresh user/car data for email
    const populatedRes = await Reservation.findById(id).populate('user car')
    const template = emailTemplates.statusUpdate(populatedRes.user, populatedRes.car, status)
    await sendEmail({
      to: populatedRes.user.email,
      ...template
    })

    revalidatePath('/admin/reservations')
    revalidatePath('/dashboard')
    return { success: `Operational status updated to ${status}.` }
  } catch (error) {
    return { error: 'System error during status synchronization.' }
  }
}

export async function createCar(formData) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'owner')) {
    return { error: 'Unauthorized to commission assets.' }
  }

  try {
    await dbConnect()
    const carData = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      type: formData.get('type'),
      pricePerDay: Number(formData.get('pricePerDay')),
      horsepower: Number(formData.get('horsepower')),
      topSpeed: Number(formData.get('topSpeed')),
      imageUrl: formData.get('imageUrl'),
      owner: session.user.id,
    }
    await Car.create(carData)
    revalidatePath('/admin/fleet')
    revalidatePath('/fleet')
    return { success: 'Unit added to fleet.' }
  } catch (error) {
    return { error: 'Failed to create unit.' }
  }
}

export async function deleteCar(id) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return { error: 'Unauthorized' }

  try {
    await dbConnect()
    await Car.findByIdAndDelete(id)
    revalidatePath('/admin/fleet')
    revalidatePath('/fleet')
    return { success: 'Unit decommissioned.' }
  } catch (error) {
    return { error: 'Failed to delete unit.' }
  }
}

export async function updateUserRole(id, role) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return { error: 'Unauthorized' }

  try {
    await dbConnect()
    await User.findByIdAndUpdate(id, { role })
    revalidatePath('/admin/users')
    return { success: `Role updated to ${role}.` }
  } catch (error) {
    return { error: 'Role update failed.' }
  }
}

export async function updateUserVerification(id, status) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return { error: 'Unauthorized' }

  try {
    await dbConnect()
    await User.findByIdAndUpdate(id, { verificationStatus: status })
    revalidatePath('/admin/users')
    return { success: `Verification status updated to ${status}.` }
  } catch (error) {
    return { error: 'Verification update failed.' }
  }
}

export async function deleteUser(id) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return { error: 'Unauthorized' }

  try {
    await dbConnect()
    await User.findByIdAndDelete(id)
    revalidatePath('/admin/users')
    return { success: 'User account terminated.' }
  } catch (error) {
    return { error: 'Deletetion failed.' }
  }
}
