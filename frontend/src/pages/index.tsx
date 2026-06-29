import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Award, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import { BookingBar } from "@/components/site/BookingBar";
import badgeImg from "@/assets/badge.png";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/hero-traveller.jpg";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import c1 from "@/assets/chennai.jpg";
import c2 from "@/assets/Akkarai_Beach.avif";
import c3 from "@/assets/Ashtalakshmi Temple.avif";
import c4 from "@/assets/Breezy_Beach.avif";
import c5 from "@/assets/Mylapore.avif";
import c6 from "@/assets/Vadapalani_Murugan_Temple.avif";
import c7 from "@/assets/Valluvar_Kottam.avif";
import c8 from "@/assets/guindy_national_park.avif";
import c9 from "@/assets/kapaleeswarar_temple.avif";
import c10 from "@/assets/mahabalipuram.avif";
import c11 from "@/assets/marina_beach.webp";

import cb1 from "@/assets/coimbatore.jpg";
import cb2 from "@/assets/brookefields_cbe.avif";
import cb3 from "@/assets/car_cbe.webp";
import cb4 from "@/assets/isha_cbe.webp";
import cb5 from "@/assets/kutralam_cbe.avif";
import cb6 from "@/assets/marudamalai_cbe.webp";
import cb7 from "@/assets/perur_cbe.webp";
import cb8 from "@/assets/voc_cbe.avif";

const chennaiImages = [
  { src: c1, name: "Chennai City" },
  { src: c11, name: "Marina Beach" },
  { src: c10, name: "Mahabalipuram" },
  { src: c9, name: "Kapaleeswarar Temple" },
  { src: c8, name: "Guindy National Park" },
  { src: c7, name: "Valluvar Kottam" },
  { src: c6, name: "Vadapalani Temple" },
  { src: c5, name: "Mylapore" },
  { src: c4, name: "Breezy Beach" },
  { src: c3, name: "Ashtalakshmi Temple" },
  { src: c2, name: "Akkarai Beach" },
];

const coimbatoreImages = [
  { src: cb1, name: "Coimbatore City" },
  { src: cb4, name: "Isha Yoga Center" },
  { src: cb6, name: "Marudamalai Temple" },
  { src: cb7, name: "Perur Temple" },
  { src: cb5, name: "Kovai Kutralam" },
  { src: cb3, name: "Gedee Car Museum" },
  { src: cb2, name: "Brookefields" },
  { src: cb8, name: "VOC Park" },
];

function CityCard({ to, label, images }: { to: string; label: string; images: { src: string, name: string }[] }) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-3xl shadow-elegant aspect-[4/3] sm:aspect-[16/10]"
    >
      {images.length > 1 ? (
        <Carousel 
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]} 
          className="absolute inset-0 h-full w-full"
          opts={{ loop: true }}
        >
          <CarouselContent className="h-full ml-0">
            {images.map((img, i) => (
              <CarouselItem key={i} className="relative h-full w-full pl-0 overflow-hidden">
                <img src={img.src} alt={img.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute top-5 right-5 z-20 pointer-events-none">
                  <span className="inline-block rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold tracking-widest text-white border border-white/20 shadow-sm">
                    {img.name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <img src={images[0].src} alt={label} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 text-white z-20">
        <span className="inline-block rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-widest">Right Choice</span>
        <h3 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold">{label}</h3>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-2.5 font-semibold transition group-hover:gap-3 pointer-events-auto">
          Explore <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Helmet>
        <title>Right Choice — Tours, Travels & Vehicle Rental | 26 Years Experience</title>
        <meta name="description" content="Right Choice — premium tempo traveller, Urbania & Innova rentals in Chennai & Coimbatore. 26 years of trusted service. Book now." />
      </Helmet>
      <Header />
      


      <section className="relative overflow-hidden pb-12">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center text-white flex flex-col items-center">
          <div className="mb-8 animate-float-up pointer-events-none drop-shadow-2xl" style={{ animationDelay: '0.3s' }}>
            <img src={badgeImg} alt="26 Years Experience" className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-full shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1.5" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-widest animate-float-up">
            <Award className="h-3.5 w-3.5" /> Founded by {SITE.founder}
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] animate-float-up">
            The Right Choice<br />for every journey.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/85 animate-float-up">
            Premium tempo traveller, Urbania & Innova rentals across Tamil Nadu. Pick your city to view tariffs, packages and book in seconds.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 animate-float-up">
            <a href={SITE.tel} className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold shadow-elegant hover:opacity-95">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-whatsapp text-whatsapp-foreground px-6 py-3 font-semibold shadow-elegant hover:opacity-95">
              <WhatsappIcon className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-20 sm:pb-28">
          <div className="text-center text-white/90 mb-6 text-sm uppercase tracking-widest font-semibold">Choose your city</div>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
            <CityCard to="/chennai" label="Chennai" images={chennaiImages} />
            <CityCard to="/coimbatore" label="Coimbatore" images={coimbatoreImages} />
          </div>
          <p className="mt-6 text-center text-sm text-white/75">Same trusted tariffs & packages in both cities.</p>
        </div>
      </section>

      <BookingBar />

      <Footer />
      <StickyCTA />
    </div>
  );
}

export default Index;
