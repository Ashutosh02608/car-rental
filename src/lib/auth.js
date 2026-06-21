import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb-client"
import CredentialsProvider from "next-auth/providers/credentials"

import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        await dbConnect()

        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.password) {
          throw new Error('No user found with this email')
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
          throw new Error('Invalid password')
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async createUser({ user }) {
      // For users created via Email or Social providers
      await dbConnect()
      await User.findByIdAndUpdate(user.id, { role: 'renter' })
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  logger: {
    error(code, metadata) {
      if (code === "JWT_SESSION_ERROR") {
        // Log as a warning to keep dev logs clean and prevent next.js dev overlay popups
        console.warn(`[next-auth][warn][${code}]: Session decryption failed (stale cookie or changed secret). User is treated as logged out.`);
        return;
      }
      console.error(code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
