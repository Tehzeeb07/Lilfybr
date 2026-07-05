const steps = [
  {
    number: "01",
    title: "You Pick",
    text: "Choose a ready piece or request a custom style, color, and size.",
  },
  {
    number: "02",
    title: "We Crochet",
    text: "Each item is handmade with care using quality yarns and thoughtful detail.",
  },
  {
    number: "03",
    title: "It Reaches You",
    text: "Your order is packed beautifully and shipped safely to your doorstep.",
  },
]

export default function HowItWorks() {
  return (
    <section id="process" className="border-b bg-[var(--bg)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--rose-muted)]">Process</p>
        <h2 className="mt-5 font-serif text-4xl font-semibold sm:text-6xl">How Lilfybr works</h2>

        <div className="mt-14 grid grid-cols-1 border sm:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="border-b p-8 sm:border-b-0 sm:border-r sm:p-10 last:sm:border-r-0">
              <p className="font-serif text-7xl font-semibold text-[var(--pink-200)]">{step.number}</p>
              <h3 className="mt-8 font-serif text-3xl font-semibold">{step.title}</h3>
              <p className="mt-5 text-base leading-8 text-[var(--text-soft)]">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
