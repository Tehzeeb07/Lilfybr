"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage("Password updated successfully! Redirecting to login...")
    setLoading(false)

    setTimeout(() => {
      router.push("/login")
    }, 1200)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleUpdatePassword} className="w-80 rounded border p-6">
        <h1 className="mb-4 text-2xl font-bold">Set New Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="mb-4 w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button disabled={loading} className="w-full bg-black p-2 text-white disabled:opacity-60" type="submit">
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
  )
}