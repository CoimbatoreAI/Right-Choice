import { useState, useEffect, useRef } from "react";
import { MapPin, Calendar, ArrowRightLeft, Users, Car } from "lucide-react";
import { SITE, FLEET } from "@/lib/site";

import { SOUTH_INDIAN_DISTRICTS } from "@/lib/districts";

function LocationInput({ label, value, onChange, placeholder, disabled }: { label: string, value: string, onChange: (v: string) => void, placeholder: string, disabled?: boolean }) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query === value) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = SOUTH_INDIAN_DISTRICTS.filter((d) => d.toLowerCase().includes(q)).slice(0, 5);
    setResults(filtered);
    setShow(true);
  }, [query, value]);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{label}</label>
      <div className={"flex items-center gap-2 border border-input rounded-lg px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring " + (disabled ? "opacity-50 pointer-events-none" : "")}>
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!show) setShow(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm font-semibold placeholder:font-normal"
          disabled={disabled}
        />
      </div>
      {show && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-elegant z-50 max-h-60 overflow-y-auto">
          {results.map((r, i) => (
            <div
              key={i}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-muted truncate border-b border-border last:border-0"
              onClick={() => {
                onChange(r);
                setQuery(r);
                setShow(false);
              }}
            >
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type Tab = "OUT OF STATION" | "LOCAL PACKAGE";

export function BookingBar() {
  const [tab, setTab] = useState<Tab>("OUT OF STATION");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pickup, setPickup] = useState("");
  const [returnDt, setReturnDt] = useState("");
  const [members, setMembers] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [fleet, setFleet] = useState<any[]>([]);

  useEffect(() => {
    import("@/lib/api").then(({ api }) => {
      api.get("/vehicles").then(res => setFleet(res.data)).catch(console.error);
    });

    const handleSelectVehicle = (e: CustomEvent<string>) => {
      setVehicle(e.detail);
      document.getElementById("booking-bar")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("select-vehicle", handleSelectVehicle as EventListener);
    return () => window.removeEventListener("select-vehicle", handleSelectVehicle as EventListener);
  }, []);

  function onExplore() {
    if (!members) {
      onEnquire();
      return;
    }
    const num = parseInt(members) || 1;
    let cat = "Cars";
    if (num > 7 && num <= 18) {
      cat = "Van Maxicab";
    } else if (num > 18) {
      cat = "Bus";
    }
    const isCbe = from.toLowerCase().includes("coimbatore");
    const cityPath = isCbe ? "/coimbatore" : "/chennai";
    window.location.href = `${cityPath}?tab=${encodeURIComponent(cat)}#fleet`;
  }

  function onEnquire() {
    let msg = `*New Booking Query*\nType: ${tab}\nFrom: ${from}\nTo: ${tab === "LOCAL PACKAGE" ? "N/A" : to}\nPickup: ${pickup}\nMembers: ${members}\nVehicle: ${vehicle || "Any"}`;
    if (tab === "OUT OF STATION") {
      msg += `\nReturn: ${returnDt}`;
    }
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div id="booking-bar" className="mx-auto max-w-[90rem] px-4 sm:px-6 relative z-20 -mt-8 sm:-mt-12 mb-12 scroll-mt-24">
      <div className="rounded-2xl bg-white shadow-elegant border border-border">
        {/* Tabs */}
        <div className="flex border-b border-border bg-muted/30 overflow-x-auto hide-scrollbar rounded-t-2xl">
          {(["OUT OF STATION", "LOCAL PACKAGE"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={"px-6 py-4 text-sm font-bold tracking-widest whitespace-nowrap transition-colors " + (tab === t ? "bg-white text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground")}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="p-4 sm:p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.2fr_auto_1.2fr_1fr_1fr_0.6fr_1fr_auto] items-center">
          
          <LocationInput label="From" value={from} onChange={setFrom} placeholder="Enter Pickup Location" />

          <div className="hidden xl:flex items-center justify-center -mx-2 z-10 mt-5">
            <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center text-primary shadow-sm">
              <ArrowRightLeft className="h-4 w-4" />
            </div>
          </div>

          <LocationInput label="To" value={to} onChange={setTo} placeholder="Enter Drop Location" disabled={tab === "LOCAL PACKAGE"} />

          <div className="relative">
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Pick Up</label>
            <div className="flex items-center gap-2 border border-input rounded-lg px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <input
                type="datetime-local"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold"
              />
            </div>
          </div>

          <div className={"relative " + (tab === "LOCAL PACKAGE" ? "opacity-50 pointer-events-none" : "")}>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Return</label>
            <div className="flex items-center gap-2 border border-input rounded-lg px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <input
                type="datetime-local"
                value={returnDt}
                onChange={(e) => setReturnDt(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Members</label>
            <div className="flex items-center gap-2 border border-input rounded-lg px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring">
              <Users className="h-4 w-4 text-primary shrink-0" />
              <input
                type="number"
                min="1"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="Count"
                className="w-full bg-transparent outline-none text-sm font-semibold placeholder:font-normal"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Vehicle</label>
            <div className="flex items-center gap-2 border border-input rounded-lg px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring">
              <Car className="h-4 w-4 text-primary shrink-0" />
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold truncate"
              >
                <option value="">Any</option>
                {fleet.map(f => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-2 xl:mt-5 flex flex-wrap sm:flex-nowrap gap-2">
            <button
              onClick={onExplore}
              className="flex-1 xl:flex-auto rounded-lg bg-gradient-primary px-4 py-3 text-sm font-extrabold text-primary-foreground shadow-elegant hover:opacity-95 transition whitespace-nowrap"
            >
              EXPLORE
            </button>
            <button
              onClick={onEnquire}
              className="flex-1 xl:flex-auto rounded-lg border-2 border-primary text-primary bg-white px-4 py-3 text-sm font-extrabold shadow-sm hover:bg-primary/5 transition whitespace-nowrap"
            >
              ENQUIRE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
