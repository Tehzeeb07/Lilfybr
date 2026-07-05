"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Product = {
  id: string
  name: string
  slug: string
  price: number | string
  stock_quantity: number
  is_active: boolean
  is_featured: boolean
  category_id: string | null
  categories?: {
    name: string
  } | null
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const loadProducts = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profile?.role !== "admin") {
      router.push("/profile")
      return
    }

    const { data, error } = await supabase
      .from("products")
      .select("id,name,slug,price,stock_quantity,is_active,is_featured,category_id,categories(name)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      alert("Failed to load products")
      setLoading(false)
      return
    }

    setProducts(((data ?? []) as unknown) as Product[])
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this product?")
    if (!ok) return

    setDeletingId(id)

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error(error)
      alert(`Delete failed: ${error.message}`)
      setDeletingId(null)
      return
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeletingId(null)
  }

  if (loading) {
    return <div className="p-8">Loading admin products...</div>
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-4xl font-semibold">Admin Products</h1>

          <div className="flex gap-3">
            <Link
              href="/admin/products/new"
              className="border border-[var(--pink-500)] bg-[var(--pink-500)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white"
            >
              Add Product
            </Link>
            <Link
              href="/profile"
              className="border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
            >
              Back
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="border bg-[var(--surface)] p-6">No products found.</div>
        ) : (
          <div className="overflow-x-auto border bg-[var(--surface)]">
            <table className="min-w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Active</th>
                  <th className="p-3">Featured</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.slug}</td>
                    <td className="p-3">BHD {Number(p.price).toFixed(3)}</td>
                    <td className="p-3">{p.stock_quantity}</td>
                    <td className="p-3">{p.categories?.name ?? "-"}</td>
                    <td className="p-3">{p.is_active ? "Yes" : "No"}</td>
                    <td className="p-3">{p.is_featured ? "Yes" : "No"}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="border px-3 py-1 text-xs font-bold uppercase"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="border px-3 py-1 text-xs font-bold uppercase text-red-600 disabled:opacity-50"
                        >
                          {deletingId === p.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

