import { NavLink as Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/chennai", label: "Chennai" },
  { to: "/coimbatore", label: "Coimbatore" },
  { to: "/about", label: "About" },
  { to: "/tariffs", label: "Tariffs" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white text-foreground">
      <div className="mx-auto flex h-24 sm:h-28 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img src="/logo.png" alt="Right Choice Logo" className="h-20 sm:h-24 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-md"
                  : "px-3 py-2 text-sm font-medium text-foreground/75 rounded-md hover:text-foreground hover:bg-muted transition"
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.tel}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:opacity-95 transition"
          >
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-foreground hover:bg-muted transition"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white text-foreground shadow-elegant">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition"
              >
                {n.label}
              </Link>
            ))}
            <a href={SITE.tel} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
