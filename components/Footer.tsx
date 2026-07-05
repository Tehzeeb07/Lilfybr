export default function Footer() {
  return (
    <footer className="border-t bg-[var(--surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[var(--text-soft)] sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-2xl font-semibold text-[var(--text)]">Lilfybr</p>
        <p>Lilfybr &copy; 2026. Handmade with love.</p>
        <div className="flex gap-6 text-xs font-semibold uppercase tracking-[0.2em]">
          <a href="#collection" className="transition hover:text-[var(--pink-500)]">
            Shop
          </a>
          <a href="#about" className="transition hover:text-[var(--pink-500)]">
            About
          </a>
          <a href="#custom-order" className="transition hover:text-[var(--pink-500)]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
