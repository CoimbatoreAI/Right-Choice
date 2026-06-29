import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { ContactQR } from "@/components/site/ContactQR";

export function Footer({ email }: { email?: string }) {
  return (
    <footer className="bg-white border-t border-border text-foreground pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Right Choice Logo" className="h-16 w-auto object-contain" />
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
            {SITE.years} Years of Experience
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Trusted tours, travels & vehicle rentals across Tamil Nadu.
            <br />Founder: <span className="font-semibold text-foreground">{SITE.founder}</span>
            <br />CEO: <span className="font-semibold text-foreground">{SITE.ceo}</span>
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/chennai" className="hover:text-foreground">Chennai</Link></li>
            <li><Link to="/coimbatore" className="hover:text-foreground">Coimbatore</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2 items-start"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /><span className="capitalize"><span className="font-semibold text-foreground">Chennai:</span> {SITE.addresses.chennai}</span></li>
            <li className="flex gap-2 items-start"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /><span><span className="font-semibold text-foreground">Coimbatore:</span> {SITE.addresses.coimbatore}</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 mt-0.5" /><a href={SITE.tel} className="hover:text-foreground">{SITE.phone}</a></li>
            {email ? (
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 mt-0.5" /><a href={`mailto:${email}`} className="hover:text-foreground break-all">{email}</a></li>
            ) : (
              <>
                <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 mt-0.5" /><a href={`mailto:${SITE.emails.chennai}`} className="hover:text-foreground break-all">{SITE.emails.chennai}</a></li>
                <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 mt-0.5" /><a href={`mailto:${SITE.emails.coimbatore}`} className="hover:text-foreground break-all">{SITE.emails.coimbatore}</a></li>
              </>
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Save Contact</h4>
          <ContactQR className="items-start !text-left" />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Right Choice. All rights reserved.</span>
          <span>Founded by {SITE.founder} · {SITE.years} Years of Experience</span>
        </div>
      </div>
    </footer>
  );
}
