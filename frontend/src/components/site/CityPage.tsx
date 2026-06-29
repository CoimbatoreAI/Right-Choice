import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Send, ShieldCheck, Award, IndianRupee, UserCheck, Star, Clock, CheckCircle2 } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCTA } from "./StickyCTA";
import { BookingBar } from "./BookingBar";
import badgeImg from "@/assets/badge.png";
import { SITE, FLEET, PACKAGES, TARIFF_TERMS, type VehicleCategory, type Vehicle } from "@/lib/site";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroImg from "@/assets/hero-traveller.jpg";

function waLink(text: string) {
  return SITE.whatsapp + "?text=" + encodeURIComponent(text);
}

function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-5xl font-extrabold text-primary">
        {n.toLocaleString()}{suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

const REVIEWS = [
  { name: "Rajesh K.", text: "Booked a 17-seater Urbania for our Ooty trip. Driver was punctual, vehicle spotless. Will book again!", role: "Family Trip" },
  { name: "Priya S.", text: "Best rates in the city, no hidden charges. Mr. Venkatesh personally coordinated our Tirupati darshan.", role: "Pilgrimage" },
  { name: "Arun M.", text: "Used them for a corporate offsite — 26 years of experience really shows. Smooth from quote to drop.", role: "Corporate" },
];

import { api, UPLOADS_URL } from "@/lib/api";

export function CityPage({ city }: { city: "Chennai" | "Coimbatore" }) {
  const location = useLocation();
  const email = city === "Chennai" ? SITE.emails.chennai : SITE.emails.coimbatore;
  const [fleetTab, setFleetTab] = useState<VehicleCategory>("Van Maxicab");
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  
  const [fleet, setFleet] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    api.get("/vehicles").then(res => setFleet(res.data)).catch(console.error);
    api.get("/packages").then(res => setPackages(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab") as VehicleCategory;
    if (tabParam && ["Van Maxicab", "Cars", "Bus", "Luxury Cars"].includes(tabParam)) {
      setFleetTab(tabParam);
    }
    if (location.hash === "#fleet") {
      setTimeout(() => {
        document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.search, location.hash]);

  const filteredFleet = fleet.filter(v => v.category === fleetTab);
  const groupedFleet = filteredFleet.reduce((acc: Record<string, any[]>, v: any) => {
    const sub = v.subcategory || "Other";
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(v);
    return acc;
  }, {});

  const getImgUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("/uploads/")) return `${UPLOADS_URL}${path}`;
    return path;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury tempo traveller" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 text-center flex flex-col items-center">
          <div className="mb-8 animate-float-up pointer-events-none drop-shadow-2xl" style={{ animationDelay: '0.3s' }}>
            <img src={badgeImg} alt="26 Years Experience" className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-full shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1.5" />
          </div>
          <div className="text-white animate-float-up">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5" /> {SITE.years} Years of Trust
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
              Right Choice Travels {city}
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-white/85">
              Premium Urbania, Tempo Traveller & Innova Crysta for outstation tours, local trips, weddings & pilgrimages. Genuine rates, professional drivers.
            </p>
          </div>
        </div>
      </section>

      <BookingBar />

      {/* Fleet */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20" id="fleet">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Fleet & Tariffs</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">Choose Your Vehicle</h2>
          <p className="mt-3 text-muted-foreground">Transparent fares for local and outstation trips from {city}.</p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {(["Van Maxicab", "Cars", "Bus", "Luxury Cars"] as VehicleCategory[]).map(t => (
            <button
              key={t}
              onClick={() => setFleetTab(t)}
              className={"px-6 py-2.5 rounded-full text-sm font-bold transition-all " + (fleetTab === t ? "bg-primary text-primary-foreground shadow-elegant" : "bg-muted text-muted-foreground hover:bg-muted/80")}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Vehicles */}
        <div className="mt-12 space-y-16">
          {Object.entries(groupedFleet).map(([sub, vehicles]: [string, any[]]) => (
            <div key={sub}>
              {sub !== "Other" && <h3 className="font-display text-2xl font-bold mb-6 pb-2 border-b border-border/60">{sub}</h3>}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((v: any, i: number) => (
                  <div key={i} onClick={() => setSelectedVehicle(v)} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-elegant transition flex flex-col cursor-pointer">
                    <div className="aspect-[16/10] overflow-hidden bg-secondary shrink-0 relative">
                      {v.gallery && v.gallery.length > 0 ? (
                        <Carousel 
                          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]} 
                          className="w-full h-full"
                          opts={{ loop: true }}
                        >
                          <CarouselContent className="h-full">
                            {v.gallery.map((gImg: string, gIdx: number) => (
                              <CarouselItem key={gIdx} className="h-full bg-black/5">
                                {gImg.includes(".mp4") ? (
                                  <video src={getImgUrl(gImg)} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                                ) : (
                                  <img src={getImgUrl(gImg)} alt={`${v.name} ${gIdx}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                                )}
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                      ) : (
                        v.img.includes(".mp4") ? (
                          <video src={getImgUrl(v.img)} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                        ) : (
                          <img src={getImgUrl(v.img)} alt={v.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        )
                      )}
                    </div>
                    <div className="p-5 flex flex-col grow">
                      <h4 className="font-display text-lg font-bold">{v.name}</h4>
                      
                      <div className="mt-4 border border-border/50 rounded-xl overflow-hidden text-sm flex-grow">
                        <div className="bg-muted/50 px-3 py-2 text-xs font-bold uppercase tracking-widest border-b border-border/50 text-foreground/80">Local Package</div>
                        <div className="p-3 grid grid-cols-1 gap-1.5">
                          {Object.entries(v.localTariff).map(([k, val]) => (
                            <div key={k} className="flex justify-between items-center">
                              <span className="text-muted-foreground">{k}</span>
                              <span className="font-semibold text-right">{val as string}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-muted/50 px-3 py-2 text-xs font-bold uppercase tracking-widest border-y border-border/50 text-foreground/80">Outstation Package</div>
                        <div className="p-3 space-y-1.5">
                           {v.outstationTariff.perDayRental && <div className="flex justify-between items-center"><span className="text-muted-foreground">Per Day Rental</span><span className="font-semibold text-primary">{v.outstationTariff.perDayRental}</span></div>}
                           {v.outstationTariff.ac && <div className="flex justify-between items-center"><span className="text-muted-foreground">AC Fare</span><span className={`font-semibold ${!v.outstationTariff.perDayRental ? "text-primary" : ""}`}>{v.outstationTariff.ac}</span></div>}
                           {v.outstationTariff.nonAc && <div className="flex justify-between items-center"><span className="text-muted-foreground">Non-AC Fare</span><span className={`font-semibold ${!v.outstationTariff.perDayRental && !v.outstationTariff.ac ? "text-primary" : ""}`}>{v.outstationTariff.nonAc}</span></div>}
                           {v.outstationTariff.minKms && <div className="flex justify-between items-center"><span className="text-muted-foreground">Min. Coverage</span><span className="font-semibold text-[11px] max-w-[50%] text-right">{v.outstationTariff.minKms}</span></div>}
                           <div className="flex justify-between items-center"><span className="text-muted-foreground">Driver Batta</span><span className="font-semibold">{v.outstationTariff.batta}</span></div>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-2 shrink-0">
                         <a href={waLink(`Hi, I'm enquiring about ${v.name} from ${city}.`)} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-whatsapp text-whatsapp-foreground px-2 py-2.5 text-sm font-semibold hover:opacity-95">
                           <WhatsappIcon className="h-4 w-4" /> WhatsApp
                         </a>
                         <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('select-vehicle', { detail: v.name })); }} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2 py-2.5 text-sm font-semibold hover:opacity-95">
                           <Send className="h-4 w-4" /> Enquire
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div className="mt-16 bg-muted/30 rounded-3xl p-6 sm:p-10 border border-border/50">
          <h3 className="font-display text-2xl font-bold mb-6">Tariff Rules & Conditions</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-foreground/85">
            {TARIFF_TERMS.map((rule, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="leading-relaxed"><strong className="text-foreground">{rule.title}:</strong> {rule.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={!!selectedVehicle} onOpenChange={(open) => !open && setSelectedVehicle(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border sm:rounded-2xl gap-0">
            {selectedVehicle && (
              <div className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[80vh]">
                {/* Gallery Side */}
                <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center shrink-0 min-h-[250px] md:min-h-[400px]">
                  {selectedVehicle.gallery && selectedVehicle.gallery.length > 0 ? (
                    <Carousel className="w-full h-full">
                      <CarouselContent className="h-full">
                        {selectedVehicle.gallery.map((gImg: string, i: number) => (
                          <CarouselItem key={i} className="h-full flex items-center justify-center relative">
                            {gImg.includes(".mp4") ? (
                              <video src={getImgUrl(gImg)} autoPlay loop muted playsInline controls className="w-full h-full object-cover" />
                            ) : (
                              <img src={getImgUrl(gImg)} className="w-full h-full object-cover" alt={`${selectedVehicle.name} - ${i + 1}`} />
                            )}
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-3 bg-black/50 border-white/20 text-white hover:bg-black hover:text-white" />
                      <CarouselNext className="right-3 bg-black/50 border-white/20 text-white hover:bg-black hover:text-white" />
                    </Carousel>
                  ) : (
                    selectedVehicle.img.includes(".mp4") ? (
                      <video src={getImgUrl(selectedVehicle.img)} autoPlay loop muted playsInline controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={getImgUrl(selectedVehicle.img)} className="w-full h-full object-cover" alt={selectedVehicle.name} />
                    )
                  )}
                  {selectedVehicle.gallery && (
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded font-medium z-10">
                      {selectedVehicle.gallery.length} Images
                    </div>
                  )}
                </div>
                
                {/* Details Side */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col bg-card">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="font-display text-2xl font-bold text-left">{selectedVehicle.name}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="border border-border/50 rounded-xl overflow-hidden text-sm mb-6 shrink-0">
                    <div className="bg-muted/50 px-3 py-2 text-xs font-bold uppercase tracking-widest border-b border-border/50 text-foreground/80">Local Package</div>
                    <div className="p-3 grid grid-cols-1 gap-2">
                      {Object.entries(selectedVehicle.localTariff).map(([k, val]) => (
                        <div key={k} className="flex justify-between items-center">
                          <span className="text-muted-foreground">{k}</span>
                          <span className="font-semibold text-right">{val as string}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-muted/50 px-3 py-2 text-xs font-bold uppercase tracking-widest border-y border-border/50 text-foreground/80">Outstation Package</div>
                    <div className="p-3 space-y-2">
                       {selectedVehicle.outstationTariff.perDayRental && <div className="flex justify-between items-center"><span className="text-muted-foreground">Per Day Rental</span><span className="font-semibold text-primary">{selectedVehicle.outstationTariff.perDayRental}</span></div>}
                       {selectedVehicle.outstationTariff.ac && <div className="flex justify-between items-center"><span className="text-muted-foreground">AC Fare</span><span className={`font-semibold ${!selectedVehicle.outstationTariff.perDayRental ? "text-primary" : ""}`}>{selectedVehicle.outstationTariff.ac}</span></div>}
                       {selectedVehicle.outstationTariff.nonAc && <div className="flex justify-between items-center"><span className="text-muted-foreground">Non-AC Fare</span><span className={`font-semibold ${!selectedVehicle.outstationTariff.perDayRental && !selectedVehicle.outstationTariff.ac ? "text-primary" : ""}`}>{selectedVehicle.outstationTariff.nonAc}</span></div>}
                       {selectedVehicle.outstationTariff.minKms && <div className="flex justify-between items-center"><span className="text-muted-foreground">Min. Coverage</span><span className="font-semibold text-[11px] max-w-[50%] text-right">{selectedVehicle.outstationTariff.minKms}</span></div>}
                       <div className="flex justify-between items-center"><span className="text-muted-foreground">Driver Batta</span><span className="font-semibold">{selectedVehicle.outstationTariff.batta}</span></div>
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 shrink-0">
                     <a href={waLink(`Hi, I'm enquiring about ${selectedVehicle.name} from ${city}.`)} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp text-whatsapp-foreground px-4 py-3 font-semibold hover:opacity-95 transition">
                       <WhatsappIcon className="h-5 w-5" /> WhatsApp
                     </a>
                     <button onClick={(e) => { e.stopPropagation(); setSelectedVehicle(null); setTimeout(() => window.dispatchEvent(new CustomEvent('select-vehicle', { detail: selectedVehicle.name })), 100); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-3 font-semibold hover:opacity-95 transition shadow-elegant">
                       <Send className="h-5 w-5" /> Enquire
                     </button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Packages */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Fixed Tour Packages</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold">Ready-to-Book Getaways</h2>
            <p className="mt-3 text-muted-foreground">All-inclusive packages departing from {city}. Pick a destination and we'll handle the rest.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PACKAGES.map((p, i) => (
              <div key={i} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-elegant transition">
                <div className="aspect-[5/3] relative overflow-hidden bg-secondary">
                  <img src={getImgUrl(p.img)} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 text-primary text-xs font-bold px-3 py-1 shadow-sm">{p.days}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  <div className="mt-1 text-2xl font-extrabold text-primary">{p.price}</div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a href={waLink(`Hi, I'm interested in the ${p.name} ${p.days} package from ${city}.`)} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-1 rounded-lg bg-whatsapp text-whatsapp-foreground px-2 py-2 text-xs font-semibold">
                      <WhatsappIcon className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('select-vehicle', { detail: '' }))} className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary text-primary-foreground px-2 py-2 text-xs font-semibold">
                      <Send className="h-3.5 w-3.5" /> Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Why Travellers Pick Right Choice</h2>
            <p className="mt-3 text-primary-foreground/80">A name {city} has trusted for over two and a half decades.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, t: `${SITE.years} Years of Trustable Travels`, d: `A legacy built by Founder ${SITE.founder} and CEO ${SITE.ceo}.` },
              { icon: Award, t: "Luxury Vehicles", d: "Latest Urbania, Tempo & Innova fleet." },
              { icon: IndianRupee, t: "Genuine Rates", d: "Transparent fares, zero hidden charges." },
              { icon: UserCheck, t: "Professional Drivers", d: "Trained, courteous, route-experienced." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                <f.icon className="h-8 w-8 text-white" />
                <h3 className="mt-4 font-display text-lg font-bold">{f.t}</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl bg-white/10 p-8 backdrop-blur">
            <Counter end={26} suffix="+" label="Years Experience" />
            <Counter end={2000} suffix="+" label="Trips Delivered" />
            <Counter end={15000} suffix="+" label="Happy Travellers" />
            <Counter end={50} suffix="+" label="Vehicles in Fleet" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold">What Our Customers Say</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground font-bold">{r.name[0]}</div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer email={email} />
      <StickyCTA />
    </div>
  );
}
