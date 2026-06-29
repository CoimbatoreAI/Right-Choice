import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ContactQR } from "@/components/site/ContactQR";
import { SITE } from "@/lib/site";



function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Right Choice — Chennai & Coimbatore</title>
        <meta name="description" content="Call, WhatsApp or email Right Choice for tempo traveller & vehicle rental enquiries in Chennai and Coimbatore." />
      </Helmet>
      <Header />

      <section className="bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Get in touch</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            We reply to most enquiries within minutes. Pick the fastest channel.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Phone className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-xs uppercase font-semibold tracking-widest text-muted-foreground">Call</div>
              <a href={SITE.tel} className="mt-1 block font-display text-xl font-extrabold text-primary hover:underline">{SITE.phone}</a>
              <p className="text-sm text-muted-foreground mt-1">Available 7 days · 6 AM – 11 PM</p>
            </div>
          </div>

          <a href={SITE.whatsapp} target="_blank" rel="noopener" className="block rounded-2xl border border-border bg-whatsapp text-whatsapp-foreground p-6 shadow-card hover:opacity-95 transition">
            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20"><WhatsappIcon className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase font-semibold tracking-widest opacity-90">WhatsApp</div>
                <div className="mt-1 font-display text-xl font-extrabold">Chat with us now</div>
                <p className="text-sm opacity-90 mt-1">Instant quotes, vehicle photos & itineraries.</p>
              </div>
            </div>
          </a>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Mail className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="text-xs uppercase font-semibold tracking-widest text-muted-foreground">Email</div>
                <div className="mt-2 space-y-1.5">
                  <a href={`mailto:${SITE.emails.chennai}`} className="block text-sm hover:text-primary break-all"><span className="font-semibold">Chennai:</span> {SITE.emails.chennai}</a>
                  <a href={`mailto:${SITE.emails.coimbatore}`} className="block text-sm hover:text-primary break-all"><span className="font-semibold">Coimbatore:</span> {SITE.emails.coimbatore}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><MapPin className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-xs uppercase font-semibold tracking-widest text-muted-foreground">Chennai Office</div>
              <p className="mt-1 text-sm leading-relaxed capitalize">{SITE.addresses.chennai}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><MapPin className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-xs uppercase font-semibold tracking-widest text-muted-foreground">Coimbatore Office</div>
              <p className="mt-1 text-sm leading-relaxed">{SITE.addresses.coimbatore}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 flex flex-col">
          <EnquiryForm email={SITE.emails.coimbatore} variant="card" />
          <ContactQR />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold">Find Us</h2>
          <p className="text-muted-foreground mt-2">Visit our offices in Chennai and Coimbatore</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold px-1 text-lg">Chennai Office</h3>
            <div className="rounded-2xl border border-border overflow-hidden shadow-card h-[350px]">
              <iframe 
                src="https://maps.google.com/maps?q=Hotel%20MASA,%20Kennet%20Lane,%20Egmore,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold px-1 text-lg">Coimbatore Office</h3>
            <div className="rounded-2xl border border-border overflow-hidden shadow-card h-[350px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.12028689581!2d76.9208034!3d11.0453303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85f002b8d5cf9%3A0xc02e3b2e0be3060c!2sPannimadai%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716900000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </div>
  );
}

export default Contact;
