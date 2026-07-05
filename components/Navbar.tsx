const navItems = [
  { label: "Shop", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#custom-order" },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="font-serif text-2xl font-semibold tracking-tight">
          Lilfybr
        </a>

        <nav className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-soft)] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[var(--pink-500)]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-soft)] transition hover:text-[var(--pink-500)] sm:inline"
          >
            Login
          </a>
          <a
            href="/signup"
            className="border border-[var(--pink-500)] bg-[var(--pink-500)] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--text)] sm:px-6"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  )
}
