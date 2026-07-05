"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export type Product = {
  id: string
  name: string
  description: string | null
  price: string | number
  stock_quantity: number
  image_url: string
  is_active: boolean
  is_featured: boolean
}

type CollectionSectionProps = {
  products: Product[]
}

type FavoriteRow = {
  product_id: string
}

function formatPrice(price: string | number) {
  return Number(price).toFixed(3)
}

export default function CollectionSection({ products }: CollectionSectionProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [loadingFavoriteId, setLoadingFavoriteId] = useState<string | null>(null)

  useEffect(() => {
    const loadFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", user.id)

      if (error) {
        console.error(error)
        return
      }

      const rows = (data ?? []) as FavoriteRow[]
      setFavoriteIds(rows.map((r) => r.product_id))
    }

    loadFavorites()
  }, [])

  const toggleFavorite = async (productId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Please login first.")
      return
    }

    setLoadingFavoriteId(productId)

    const isAlreadyFavorite = favoriteIds.includes(productId)

    if (isAlreadyFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId)
      
      if (error) {
        console.error("DELETE ERROR:", error)
        alert(`Delete failed: ${error.message}`)
        setLoadingFavoriteId(null)
        return
      }

      setFavoriteIds((prev) => prev.filter((id) => id !== productId))
      alert("Removed from favorites.")
      setLoadingFavoriteId(null)
      return
    }

    const { error } = await supabase.from("favorites").insert({
      user_id: user.id,
      product_id: productId,
    })

    if (error) {
      console.error(error)
      alert("Failed to save favorite.")
      setLoadingFavoriteId(null)
      return
    }

    setFavoriteIds((prev) => [...prev, productId])
    alert("Added to favorites ❤️")
    setLoadingFavoriteId(null)
  }

  return (
    <section id="collection" className="border-b bg-[var(--surface)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--rose-muted)]">
              Featured
            </p>

            <h2 className="mt-5 font-serif text-4xl font-semibold sm:text-6xl">
              Featured Pieces
            </h2>
          </div>

          <div className="flex gap-4">
            <Link
              href="/profile"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--pink-500)]"
            >
              Profile
            </Link>

            <a
              href="#collection"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--rose-muted)] transition hover:text-[var(--pink-500)]"
            >
              See all products
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const isFavorite = favoriteIds.includes(product.id)
            const isLoading = loadingFavoriteId === product.id

            return (
              <article key={product.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden border bg-[var(--pink-100)]">
                  {product.is_featured ? (
                    <span className="absolute left-5 top-5 z-10 bg-[var(--surface)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text)]">
                      Featured
                    </span>
                  ) : null}

                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold leading-tight">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-soft)]">
                      {product.description}
                    </p>

                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--rose-muted)]">
                      Stock {product.stock_quantity}
                    </p>
                  </div>

                  <p className="shrink-0 font-serif text-xl">
                    BHD {formatPrice(product.price)}
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    disabled={isLoading}
                    className="w-full border bg-[var(--surface)] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text)] transition hover:border-[var(--pink-400)] hover:text-[var(--pink-500)] disabled:opacity-60"
                  >
                    {isLoading
                      ? "Please wait..."
                      : isFavorite
                      ? "Unfavorite 💔"
                      : "Favorite ❤️"}
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-[var(--text-soft)]">
                  Browse freely. Sign in when you want to save your favorite pieces.
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}