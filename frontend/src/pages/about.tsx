import { Helmet } from "react-helmet-async";
import { Award, ShieldCheck, Heart, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCTA } from "@/components/site/StickyCTA";
import { SITE } from "@/lib/site";
import arjunImg from "@/assets/arjun.jpg";



function About() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Right Choice — Founded by V. Venkatesh Kumar</title>
        <meta name="description" content="26 years of trusted tours & travels. Meet V. Venkatesh Kumar, the founder behind Right Choice — Chennai & Coimbatore's premier vehicle rental service." />
      </Helmet>
      <Header />

      <section className="bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <Award className="h-3.5 w-3.5" /> Our Story
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-6xl font-extrabold leading-tight">
            Two-and-a-half decades<br />on the road with you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Right Choice was founded with one simple promise: every traveller deserves a safe, comfortable, fairly-priced journey.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-extrabold text-primary">Founder Talk</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            "At Right Choice, your safety, comfort, and satisfaction are not just goals—they are our personal guarantee. We confess to our customers that we will never compromise on vehicle quality, driver professionalism, or transparent pricing. Every journey you take with us is backed by our 26-year legacy of trust."
          </p>
          <p className="mt-3 font-bold text-foreground">— {SITE.founder}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 shadow-elegant flex flex-col justify-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-3xl font-black mb-6">V</div>
            <h2 className="font-display text-3xl font-extrabold">{SITE.founder}</h2>
            <p className="mt-1 text-primary-foreground/80 font-semibold tracking-widest uppercase text-sm">Founder</p>
            <p className="mt-5 text-sm leading-relaxed text-primary-foreground/90">
              "I started Right Choice 26 years ago with a single vehicle and a notebook full of routes. Today, every booking still gets the same personal attention. What began as a one-man operation has grown into a full-service tours & travels agency serving Chennai, Coimbatore and destinations across South India."
            </p>
          </div>
          
          <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden flex flex-col sm:flex-row items-center sm:items-stretch group">
            <div className="w-full sm:w-2/5 shrink-0 overflow-hidden bg-secondary">
              <img src={arjunImg} alt={SITE.ceo} className="w-full h-full object-cover transition duration-700 group-hover:scale-105 min-h-[300px] sm:min-h-full" />
            </div>
            <div className="p-8 flex flex-col justify-center w-full">
              <h2 className="font-display text-3xl font-extrabold">{SITE.ceo}</h2>
              <p className="mt-1 text-muted-foreground font-semibold tracking-widest uppercase text-sm">Chief Executive Officer</p>
              <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                Spearheading Right Choice into its next era, ensuring that our modern fleet of Urbania, Tempo Traveller, and Innova Crysta vehicles meets the highest standards of luxury and reliability for every customer.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: ShieldCheck, t: "Safety First", d: "Regularly serviced fleet, trained drivers, 24/7 support." },
            { icon: Heart, t: "Personal Touch", d: "Every booking still goes through our leadership's desk." },
            { icon: Users, t: "15,000+ Travellers", d: "Pilgrims, families, students, corporates — all welcome." },
            { icon: Award, t: "Honest Pricing", d: "No hidden charges, ever. The quote you get is the price you pay." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:-translate-y-1 hover:shadow-elegant transition-all">
              <v.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display font-bold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </div>
  );
}

export default About;
