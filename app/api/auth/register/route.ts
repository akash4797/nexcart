import { NextResponse } from 'next/server'
import { db } from '@/db';
import {users} from "@/db/schema"
import { v4 as uuidv4 } from 'uuid';


async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // Basic validation
    if (!email || !password || !name) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        )
    }
    
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)
    })
    
    if (existingUser) {
        return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
        )
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password)
    
    // Create user and exclude password from response
     await db.insert(users).values({
      id: uuidv4(), 
      email,
      name,
      password: hashedPassword,
      role: 'user', 
  })

    return NextResponse.json({message:"User created successfully"}, { status: 201 })
  } catch (error) {
    console.log(error)
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}