"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    if (response?.error) {
      setError("Invalid credentials")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}