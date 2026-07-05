const guestActions = [
  "Browse all products",
  "View prices and photos",
  "Read descriptions",
  "Message Lilfybr on Instagram",
  "Send a custom request through Gmail",
]

const signedInActions = ["Save favorites", "Add to cart", "Place orders", "View order history"]

export default function CustomOrdersCTA() {
  return (
    <section id="custom-order" className="bg-[var(--text)] py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.55fr]">
        <div className="self-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--pink-200)]">Custom Orders</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Want a custom Lilfybr piece?
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--pink-100)]">
            Tell us your idea and we&rsquo;ll create something uniquely yours.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=tehzeeb.shkk%40gmail.com&su=Custom%20Lilfybr%20Order&body=Hi%20Lilfybr%2C%20I%20want%20to%20request%20a%20custom%20piece."
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--pink-200)] bg-[var(--pink-200)] px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--text)] transition hover:bg-white"
          >
            Request Custom Order
          </a>
          <a
            href="https://www.instagram.com/lilfybr/"
            target="_blank"
            rel="noreferrer"
            className="border border-white/30 px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-[var(--pink-200)] hover:text-[var(--pink-200)]"
          >
            Message on Instagram
          </a>
        </div>

        <div className="border border-white/15 bg-white/5 p-7 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--pink-200)]">How shopping works</p>
          <div className="mt-6 grid gap-7 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl">Without signing in</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--pink-100)]">
                {guestActions.map((action) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl">After signing in</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--pink-100)]">
                {signedInActions.map((action) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
