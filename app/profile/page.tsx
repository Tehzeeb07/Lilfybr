"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type ProfileRow = {
  email?: string
  role?: string | null
}

type FavoriteProduct = {
  id: string
  name: string
}

type FavoriteRow = {
  product_id: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([])
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: authData } = await supabase.auth.getUser()

      if (!authData.user) {
        router.push("/login")
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("email, role")
        .eq("id", authData.user.id)
        .single()

      const { data: favorites, error: favError } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", authData.user.id)

      if (favError) {
        console.error(favError)
      } else {
        const rows = (favorites ?? []) as FavoriteRow[]
        const ids = rows.map((row) => row.product_id)

        if (ids.length > 0) {
          const { data: products } = await supabase
            .from("products")
            .select("id, name")
            .in("id", ids)

          setFavoriteProducts((products ?? []) as FavoriteProduct[])
        } else {
          setFavoriteProducts([])
        }
      }

      setUser({
        email: profile?.email ?? authData.user.email,
        role: profile?.role ?? "customer",
      })

      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        Loading...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b bg-[var(--surface)]">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="font-serif text-2xl font-semibold">
            Lilfybr
          </Link>

          <button
            onClick={handleLogout}
            className="border border-[var(--pink-500)] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--pink-500)] transition hover:bg-[var(--pink-500)] hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--rose-muted)]">
          Customer Account
        </p>

        <h1 className="mt-5 font-serif text-4xl font-semibold sm:text-6xl">
          Welcome back.
        </h1>

        {user?.role === "admin" ? (
          <Link
            href="/admin/products"
            className="mt-6 inline-flex border border-[var(--pink-500)] bg-[var(--pink-500)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white"
          >
            Open Admin Products
          </Link>
        ) : null}

        <div className="mt-8 grid gap-4 border bg-[var(--surface)] p-6 text-sm text-[var(--text-soft)] sm:grid-cols-2">
          <p>
            <span className="font-semibold text-[var(--text)]">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold text-[var(--text)]">Role:</span> {user?.role ?? "customer"}
          </p>
        </div>

        <div className="mt-10 border bg-[var(--surface)] p-7">
          <h2 className="font-serif text-3xl font-semibold">Your Favorites</h2>

          {favoriteProducts.length === 0 ? (
            <p className="mt-4 text-[var(--text-soft)]">No favorite products yet.</p>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="border bg-[var(--pink-100)] p-4">
                  <span className="font-semibold">{product.name}</span>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/favourites"
            className="mt-6 inline-flex border border-[var(--pink-500)] bg-[var(--pink-500)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--text)]"
          >
            Open Favorites Page
          </Link>
        </div>
      </section>
    </main>
  )
}
