const reviews = [
  "Even prettier in real life. You can feel the care in every stitch.",
  "I requested custom colors and it came out exactly how I imagined.",
  "So soft, so well made, this is so far my favorite handmade purchase.",
]

export default function Testimonials() {
  return (
    <section className="border-b bg-[var(--surface)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--rose-muted)]">Community</p>
        <h2 className="mt-5 font-serif text-4xl font-semibold sm:text-6xl">Loved by our community</h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <article key={review} className="border bg-[var(--pink-100)] p-8 sm:p-10">
              <p className="font-serif text-5xl text-[var(--pink-300)]">&ldquo;</p>
              <p className="mt-8 font-serif text-2xl leading-10">{review}</p>
              <div className="mt-10 border-t pt-6">
                <p className="text-sm font-bold">Lilfybr customer {index + 1}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--rose-muted)]">Handmade love</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
