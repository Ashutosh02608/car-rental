'use server'

import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: 'Authentication required.' }
  }

  const name = formData.get('name')
  const phoneNumber = formData.get('phoneNumber')
  const licenseNumber = formData.get('licenseNumber')

  try {
    await dbConnect()

    const updateData = {
      name,
      phoneNumber,
      licenseNumber,
    }

    // If they provided both phone and license, mark as Pending for concierge review
    if (phoneNumber && licenseNumber) {
      updateData.verificationStatus = 'Pending'
    }

    await User.findByIdAndUpdate(session.user.id, updateData)

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/settings')

    return { success: 'Profile attributes synchronized. Awaiting verification review.' }
  } catch (error) {
    console.error('Profile update error:', error)
    return { error: 'System error during attribute synchronization.' }
  }
}
