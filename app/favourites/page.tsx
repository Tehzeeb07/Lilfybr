"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type FavoriteProduct = {
  id: string
  name: string
  description: string | null
  price: string | number
  image_url: string
  stock_quantity: number
}

type FavoriteRow = {
  product_id: string
}

function formatPrice(price: string | number) {
  return Number(price).toFixed(3)
}

export default function FavoritesPage() {
  const [products, setProducts] = useState<FavoriteProduct[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data: favorites, error: favError } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", user.id)

      if (favError) {
        console.error(favError)
        setLoading(false)
        return
      }

      const rows = (favorites ?? []) as FavoriteRow[]
      const ids = rows.map((r) => r.product_id)

      if (ids.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, description, price, image_url, stock_quantity")
        .in("id", ids)

      if (productError) {
        console.error(productError)
        setLoading(false)
        return
      }

      setProducts((productData ?? []) as FavoriteProduct[])
      setLoading(false)
    }

    loadFavorites()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">Loading favorites...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Your Favorites</h1>
          <Link href="/profile" className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--pink-500)]">
            Back to Profile
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="border bg-[var(--surface)] p-7">
            <p className="text-[var(--text-soft)]">No favorite products yet.</p>
            <Link
              href="/#collection"
              className="mt-5 inline-flex border border-[var(--pink-500)] bg-[var(--pink-500)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="border bg-[var(--surface)] p-4">
                <div className="relative aspect-[4/5] overflow-hidden border bg-[var(--pink-100)]">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                </div>

                <h2 className="mt-4 font-serif text-2xl font-semibold">{product.name}</h2>

                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-soft)]">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-serif text-xl">BHD {formatPrice(product.price)}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--rose-muted)]">
                    Stock {product.stock_quantity}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}