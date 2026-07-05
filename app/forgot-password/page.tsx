"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Password reset email sent!")
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleReset} className="w-80 rounded border p-6">
        <h1 className="mb-4 text-2xl font-bold">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="mb-4 w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black p-2 text-white disabled:opacity-60"
          type="submit"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
  )
}