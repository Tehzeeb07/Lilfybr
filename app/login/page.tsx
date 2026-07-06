"use client"
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

console.log("DATA:", data)
console.log("ERROR:", error)

if (error) {
  console.error(error)
  setMessage(JSON.stringify(error, null, 2))
  return
}

    setLoading(false)
    router.push("/profile")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="w-80 rounded border p-6">
        <h1 className="mb-4 text-xl font-bold">Login</h1>

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
        />

        <button
          className="w-full bg-black p-2 text-white disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div className="mt-3 text-sm">
          <Link href="/forgot-password" className="underline">
            Forgot password?
          </Link>
        </div>

        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>
    </div>
  )
}