import CollectionSection, { type Product } from "@/components/CollectionSection"
import CustomOrdersCTA from "@/components/CustomOrdersCTA"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import HowItWorks from "@/components/HowItWorks"
import Navbar from "@/components/Navbar"
import Testimonials from "@/components/Testimonials"
import About from "@/components/About"
import { supabase } from "@/lib/supabase"

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,description,price,stock_quantity,image_url,is_active,is_featured,created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to load products:", error.message)
  }

  const activeProducts = ((data ?? []) as Product[])

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <Hero />
      <CollectionSection products={activeProducts} />
      <About />
      <HowItWorks />
      <Testimonials />
      <CustomOrdersCTA />
      <Footer />
    </main>
  )
}