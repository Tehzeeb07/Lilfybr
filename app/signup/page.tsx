"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email ?? email,
      })

      if (profileError) {
        setMessage(`Account created, but profile sync failed: ${profileError.message}`)
        setLoading(false)
        return
      }
    }

    setMessage("Account created successfully! Redirecting...")

    setLoading(false)

    setTimeout(() => {
      router.push("/profile")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="w-80 rounded border p-6">
        <h1 className="mb-4 text-xl font-bold">Sign Up</h1>

        <input
          className="mb-3 w-full border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="mb-3 w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button
          className="w-full bg-black p-2 text-white disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>
    </div>
  )
}
