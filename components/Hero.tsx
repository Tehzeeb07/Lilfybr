import Image from "next/image"

const heroImages = [
  {
    src: "https://dnnemyksfegffnyynfpr.supabase.co/storage/v1/object/public/Products/11.jpg",
    alt: "Crochet Bunny handmade plushie",
    className: "col-span-5 row-span-5",
  },
  {
    src: "https://dnnemyksfegffnyynfpr.supabase.co/storage/v1/object/public/Products/bouquet.jpg",
    alt: "Pipe cleaner flower bouquet",
    className: "col-span-3 row-span-3",
  },
  {
    src: "https://dnnemyksfegffnyynfpr.supabase.co/storage/v1/object/public/Products/bow.jpeg",
    alt: "Pink bow keychain",
    className: "col-span-3 row-span-2",
  },
]

export default function Hero() {
  return (
    <section className="border-b bg-[var(--bg)]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:py-0">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--rose-muted)]">
            Handmade with heart &middot; Lilfybr
          </p>
          <h1
            className="mt-8 font-serif text-5xl font-semibold leading-[0.95] tracking-normal text-[var(--text)] sm:text-7xl lg:text-8xl"
            aria-label="Soft threads, timeless pieces."
          >
            S<span className="yarn-o" aria-hidden="true" />ft threads, timeless pieces.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-soft)] sm:text-xl">
            Every Lilfybr piece is crocheted slowly by hand&mdash;made to be loved, used, and passed on.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#collection"
              className="inline-flex items-center justify-center border border-[var(--pink-500)] bg-[var(--pink-500)] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--text)]"
            >
              Shop Collection
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center border bg-[var(--surface)] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--text)] transition hover:border-[var(--pink-400)] hover:text-[var(--pink-500)]"
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="grid h-[520px] grid-cols-8 grid-rows-5 gap-4 lg:h-[680px]">
          {heroImages.map((image) => (
            <div key={image.src} className={`relative overflow-hidden border bg-[var(--pink-100)] ${image.className}`}>
              <Image src={image.src} alt={image.alt} fill className="object-cover" priority sizes="(max-width: 1024px) 90vw, 45vw" />
            </div>
          ))}
          <div className="col-span-3 row-span-2 border bg-[var(--surface)] p-6">
            <p className="font-serif text-2xl leading-snug">&ldquo;Made slowly, loved daily.&rdquo;</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose-muted)]">Lilfybr</p>
          </div>
        </div>
      </div>
    </section>
  )
}
