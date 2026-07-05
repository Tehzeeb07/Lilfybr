"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Category = {
  id: string
  name: string
}

export default function EditProductPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const router = useRouter()

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
  const load = async () => {
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

    const { data: categoriesData } = await supabase
      .from("categories")
      .select("id,name")
      .order("name")

      setCategories((categoriesData ?? []) as Category[])

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !data) {
        alert("Product not found")
        router.push("/admin/products")
        return
      }

      setName(data.name ?? "")
      setSlug(data.slug ?? "")
      setDescription(data.description ?? "")
      setPrice(String(data.price ?? ""))
      setStock(String(data.stock_quantity ?? ""))
      setImageUrl(data.image_url ?? "")
      setIsActive(Boolean(data.is_active))
      setIsFeatured(Boolean(data.is_featured))
      setCategoryId(data.category_id ?? "")
      setLoading(false)
    }

    if (id) load()
  }, [id, router])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from("products")
      .update({
        name,
        slug,
        description: description || null,
        price: Number(price),
        stock_quantity: Number(stock),
        image_url: imageUrl || "",
        is_active: isActive,
        is_featured: isFeatured,
        category_id: categoryId || null,
      })
      .eq("id", id)

    if (error) {
      console.error(error)
      alert(`Update failed: ${error.message}`)
      setSaving(false)
      return
    }

    router.push("/admin/products")
  }

  if (loading) return <div className="p-8">Loading product...</div>

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl border bg-[var(--surface)] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-semibold">Edit Product</h1>
          <Link href="/admin/products" className="text-xs font-bold uppercase">
            Back
          </Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full border p-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="w-full border p-3" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          <textarea className="w-full border p-3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="w-full border p-3" type="number" step="0.001" placeholder="Price (BHD)" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input className="w-full border p-3" type="number" placeholder="Stock quantity" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <input className="w-full border p-3" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

          <select className="w-full border p-3" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            Featured
          </label>

          <button
            type="submit"
            disabled={saving}
            className="border border-[var(--pink-500)] bg-[var(--pink-500)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Update Product"}
          </button>
        </form>
      </div>
    </main>
  )
}

