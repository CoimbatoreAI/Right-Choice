import { useState, useEffect, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/lib/site";

export function EnquiryForm({ email, variant = "glass" }: { email: string; variant?: "glass" | "card" }) {
  const [sent, setSent] = useState(false);
  const location = useLocation();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const v = params.get("vehicle");
    const p = params.get("package");
    if (v) {
      setMsg(`I'm interested in booking the ${v}. Please share tariff and availability.`);
    } else if (p) {
      setMsg(`I'm interested in the ${p} package. Please share details and pricing.`);
    }
  }, [location.search]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `New Enquiry from ${data.get("name")}`;
    const body = `Name: ${data.get("name")}\nMobile: ${data.get("mobile")}\nEmail: ${data.get("email")}\nMessage: ${data.get("message") ?? ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const wrap =
    variant === "glass"
      ? "glass rounded-2xl p-6 sm:p-7 text-white"
      : "rounded-2xl bg-card text-card-foreground p-6 sm:p-7 shadow-card border border-border";

  const inputCls =
    variant === "glass"
      ? "w-full rounded-lg bg-white/15 border border-white/25 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
      : "w-full rounded-lg bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form id="enquiry" onSubmit={onSubmit} className={wrap}>
      <h3 className={`font-display text-2xl font-bold ${variant === "glass" ? "text-white" : ""}`}>
        Enquire Now
      </h3>
      <p className={`mt-1 text-sm ${variant === "glass" ? "text-white/80" : "text-muted-foreground"}`}>
        Get a quick quote in minutes.
      </p>
      <div className="mt-5 space-y-3">
        <input required name="name" placeholder="Your Name" className={inputCls} />
        <input required name="mobile" type="tel" placeholder="Mobile Number" className={inputCls} />
        <input required name="email" type="email" placeholder="Email Address" className={inputCls} />
        <textarea name="message" value={msg} onChange={e => setMsg(e.target.value)} rows={3} placeholder="Trip details (optional)" className={inputCls} />
      </div>
      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:opacity-95 transition"
      >
        {sent ? "Opening your email…" : "Send Enquiry"}
      </button>
      <p className={`mt-3 text-xs ${variant === "glass" ? "text-white/70" : "text-muted-foreground"}`}>
        Or call us directly at <a className="font-semibold underline" href={SITE.tel}>{SITE.phone}</a>
      </p>
    </form>
  );
}
