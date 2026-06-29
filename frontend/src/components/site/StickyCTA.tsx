import { Phone, Send } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { SITE } from "@/lib/site";

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:bottom-6 lg:right-6 lg:left-auto lg:inset-x-auto">
      <div className="lg:flex lg:flex-col lg:gap-3 grid grid-cols-3 gap-px bg-border lg:bg-transparent border-t border-border lg:border-0 shadow-elegant lg:shadow-none">
        <a
          href="#enquiry"
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 lg:rounded-full lg:px-5 lg:shadow-elegant hover:opacity-95"
        >
          <Send className="h-4 w-4" /> Enquire
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground font-semibold py-3.5 lg:rounded-full lg:px-5 lg:shadow-elegant hover:opacity-95"
        >
          <WhatsappIcon className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href={SITE.tel}
          className="flex items-center justify-center gap-2 bg-[oklch(0.55_0.2_25)] text-white font-semibold py-3.5 lg:rounded-full lg:px-5 lg:shadow-elegant hover:opacity-95"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
      </div>
    </div>
  );
}
