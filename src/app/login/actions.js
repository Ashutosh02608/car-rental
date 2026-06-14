'use server'

import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function signup(formData) {
  const email = formData.get('email')
  const password = formData.get('password')
  const role = formData.get('role') || 'renter'

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    await dbConnect()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { error: 'User already exists' }
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const sanitizedRole = (role && ['renter', 'owner', 'admin'].includes(role.toLowerCase())) 
      ? role.toLowerCase() 
      : 'renter'

    console.log('DEBUG: Final sanitized role for DB:', sanitizedRole)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: sanitizedRole,
    })

    console.log('DEBUG: Created User Document:', JSON.parse(JSON.stringify(newUser)))

    return { success: 'Account established successfully. Access portal via Sign In.' }
  } catch (error) {
    console.error('Signup error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}
