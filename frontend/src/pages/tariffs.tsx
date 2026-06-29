import { Helmet } from "react-helmet-async";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import { FLEET, SITE, TARIFF_TERMS } from "@/lib/site";

export default function Tariffs() {
  const vanMaxicabs = FLEET.filter(v => v.category === "Van Maxicab");
  const buses = FLEET.filter(v => v.category === "Bus");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tariffs & Pricing - {SITE.name}</title>
      </Helmet>
      <Header />

      <section className="bg-primary text-primary-foreground py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold">Transparent Tariffs</h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Clear, honest pricing for our entire fleet. No hidden charges.
          </p>
        </div>
      </section>

      {/* Van & Minibus Tariffs Table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground">Van & Minibus Pricing</h2>
          <p className="mt-2 text-muted-foreground">Comprehensive local and outstation rates for our Tempo Travellers and Minibuses.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground font-bold uppercase tracking-wider text-xs border-b border-border">
              <tr>
                <th className="px-5 py-4">Vehicle</th>
                <th className="px-5 py-4 bg-muted/50">Local Package</th>
                <th className="px-5 py-4 text-primary">Outstation Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vanMaxicabs.map((v, i) => {
                const localStr = Object.entries(v.localTariff).filter(([_, val]) => val && val !== "Rs. XX").map(([k, val]) => `${k}: ${val}`).join(" | ");
                const outStr = [
                  v.outstationTariff.perDayRental ? `Rental: ${v.outstationTariff.perDayRental}` : null,
                  v.outstationTariff.ac && v.outstationTariff.ac !== "Rs. XX/km" && v.outstationTariff.ac !== "-" ? `AC: ${v.outstationTariff.ac}` : null,
                  v.outstationTariff.nonAc && v.outstationTariff.nonAc !== "Rs. XX/km" ? `Non-AC: ${v.outstationTariff.nonAc}` : null,
                  v.outstationTariff.minKms ? `Min: ${v.outstationTariff.minKms}` : null,
                  v.outstationTariff.batta && v.outstationTariff.batta !== "Rs. XX/day" ? `Batta: ${v.outstationTariff.batta}` : null,
                ].filter(Boolean).join(" | ");

                return (
                  <tr key={i} className="hover:bg-muted/30 transition">
                    <td className="px-5 py-4 font-bold text-foreground">{v.name}</td>
                    <td className="px-5 py-4 text-muted-foreground bg-muted/10">{localStr || "Contact for details"}</td>
                    <td className="px-5 py-4 text-foreground font-medium">{outStr || "Contact for details"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bus Tariffs Table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground">Bus Rental Tariffs</h2>
          <p className="mt-2 text-muted-foreground">Per day outstation rental charges for our extensive bus fleet.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground font-bold uppercase tracking-wider text-xs border-b border-border">
              <tr>
                <th className="px-5 py-4">Bus Type</th>
                <th className="px-5 py-4 text-primary">Rental Package</th>
                <th className="px-5 py-4">Extra KM</th>
                <th className="px-5 py-4">Driver Batta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {buses.map((v, i) => (
                <tr key={i} className="hover:bg-muted/30 transition">
                  <td className="px-5 py-4 font-bold text-foreground">{v.name}</td>
                  <td className="px-5 py-4 text-foreground font-medium">
                    {v.outstationTariff.perDayRental || "-"} <span className="text-muted-foreground text-xs font-normal">({v.outstationTariff.minKms || "-"})</span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{v.outstationTariff.ac || v.outstationTariff.nonAc || "-"}</td>
                  <td className="px-5 py-4 text-muted-foreground">{v.outstationTariff.batta || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="bg-secondary/40 py-20 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-3">Important Info</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">Tariff Rules & Conditions</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {TARIFF_TERMS.map((t, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  {t.title}
                </h3>
                <p className="text-sm text-foreground/85 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glimpse of Fleet */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold">Glimpse of Our Fleet</h2>
          <p className="mt-2 text-muted-foreground">A small look at the vehicles ready for your next journey.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {FLEET.slice(0, 8).map((v, i) => (
            <div key={i} className="relative group overflow-hidden rounded-2xl bg-secondary aspect-[4/3] border border-border shadow-sm">
              <img src={v.img} alt={v.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white font-bold text-sm">{v.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer email={SITE.emails.coimbatore} />
      <StickyCTA />
    </div>
  );
}
