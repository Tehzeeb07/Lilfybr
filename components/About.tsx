import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="border-b bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden border bg-[var(--pink-100)] sm:min-h-[560px]">
          <Image
            src="https://dnnemyksfegffnyynfpr.supabase.co/storage/v1/object/public/Products/bookmark.jpg"
            alt="Handmade crochet flower bookmark by Lilfybr"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
        </div>

        <div className="max-w-2xl lg:pl-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--rose-muted)]">Our Story</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Crafted by hand, made to last.
          </h2>
          <p className="mt-8 border-l-2 border-[var(--pink-400)] pl-7 text-lg leading-9 text-[var(--text-soft)] sm:text-xl">
            Lilfybr began with a love for soft textures and meaningful handmade work. We focus on comfort, quality,
            and one-of-a-kind charm in every stitch.
          </p>
        </div>
      </div>
    </section>
  )
}
