import urbania from "@/assets/vehicles/urbania.jpg";
import innova from "@/assets/vehicles/innova.jpg";
import tempoSmall from "@/assets/vehicles/tempo-small.jpg";
import tempoLarge from "@/assets/vehicles/tempo-large.jpg";
import ooty from "@/assets/places/ooty.png";
import mahabalipuram from "@/assets/places/mahabalipuram.png";
import kodaikanal from "@/assets/places/kodaikanal.png";
import tirupati from "@/assets/places/tirupati.png";
import valparai from "@/assets/places/valparai.png";
import munnar from "@/assets/places/munnar.png";

export const SITE = {
  name: "Right Choice",
  founder: "V. Venkatesh Kumar",
  ceo: "Arjun",
  years: 26,
  phone: "+91 97101 23454",
  phoneRaw: "919710123454",
  whatsapp: "https://wa.me/919710123454",
  tel: "tel:+919710123454",
  addresses: {
    coimbatore: "Site No-51, Sri Nagar Phase-1, Pannimadai, Coimbatore, Tamil Nadu - 641017 (Near TAAC School)",
    chennai: "2nd shop, hotel MASA(Regal building), Opp. hotel regent, 16, kennet lane, egmore, chennai - 600008",
  },
  emails: {
    chennai: "Chennaitravels4u@gmail.com",
    coimbatore: "Coimbatoretravels4u@gmail.com",
  },
};

export const VEHICLE_IMG = { urbania, innova, tempoSmall, tempoLarge };

import sedan from "@/assets/vehicles/sedan.png";
import msd from "@/assets/msd.jpg";
import te from "@/assets/te.avif";
import ha from "@/assets/ha.avif";
import ham from "@/assets/ham.jpeg";
import tic from "@/assets/tic.jpeg";
import kc from "@/assets/kc.jpg";
import me from "@/assets/me.avif";
import th from "@/assets/th.jpeg";
import mx from "@/assets/mx.avif";
import ti from "@/assets/ti.jpeg";
import suv from "@/assets/vehicles/suv.png";
import minibus from "@/assets/vehicles/minibus.png";
import bus from "@/assets/vehicles/bus.png";
import tt1 from "@/assets/tt (1).jpeg";
import tt2 from "@/assets/tt (2).jpeg";
import tt3 from "@/assets/tt (3).jpeg";
import tt4 from "@/assets/tt (4).jpeg";
import audia3 from "@/assets/audia3.avif";
import audia6 from "@/assets/audia6.avif";
import benz250 from "@/assets/benz250.jpg";
import benz350 from "@/assets/benz350.png";
import bmw5 from "@/assets/bmw5.avif";
import jxf from "@/assets/jxf.webp";
import jxj from "@/assets/jxj.avif";
import kcavif from "@/assets/kc.avif";
import tc from "@/assets/tc.webp";
import tf from "@/assets/tf.avif";

import tt1214vid from "@/assets/Tempo Traveller (12 & 14 Seater).mp4";

import tt18vid from "@/assets/tempo18.mp4";
import tt18img1 from "@/assets/Tempo 18 (1).jpeg";
import tt18img2 from "@/assets/Tempo 18 (2).jpeg";
import tt18img3 from "@/assets/Tempo 18 (3).jpeg";
import tt18img4 from "@/assets/Tempo 18 (4).jpeg";

import urb14vid from "@/assets/Urbania14&16  (1).mp4";
import urb14img1 from "@/assets/Urbania14&16  (1).jpeg";
import urb14img2 from "@/assets/Urbania14&16  (2).jpeg";
import urb14img3 from "@/assets/Urbania14&16  (3).jpeg";
import urb14img4 from "@/assets/Urbania14&16  (4).jpeg";
import urb14img5 from "@/assets/Urbania14&16  (5).jpeg";

export type VehicleCategory = "Cars" | "Luxury Cars" | "Van Maxicab" | "Bus";

export interface Vehicle {
  name: string;
  category: VehicleCategory;
  subcategory?: string;
  img: string;
  gallery?: string[];
  localTariff: Record<string, string>;
  outstationTariff: {
    ac?: string;
    nonAc?: string;
    batta: string;
    minKms?: string;
    perDayRental?: string;
  };
}

export const FLEET: Vehicle[] = [
  // --- CARS ---
  // Sedan
  { name: "Maruti Swift Dzire", category: "Cars", subcategory: "Sedan", img: msd, localTariff: { "5 Hour and 50 Kms": "Rs. 1300", "10 Hour and 100 Kms": "Rs. 2600", "Extra Hours": "Rs. 260", "Extra kms": "Rs. 14" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Toyota Etios", category: "Cars", subcategory: "Sedan", img: te, localTariff: { "5 Hour and 50 Kms": "Rs. 1400", "10 Hour and 100 Kms": "Rs. 2800", "Extra Hours": "Rs. 280", "Extra kms": "Rs. 15" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Hyundai Accent", category: "Cars", subcategory: "Sedan", img: ha, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Honda Amaze", category: "Cars", subcategory: "Sedan", img: ham, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  // SUV
  { name: "Toyota Innova", category: "Cars", subcategory: "SUV", img: ti, localTariff: { "5 Hour and 50 Kms": "Rs. 1,900", "10 Hour and 100 Kms": "Rs. 3,800", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. 18/km", batta: "Rs. 600/day" } },
  { name: "Toyota Innova Crysta", category: "Cars", subcategory: "SUV", img: tic, localTariff: { "5 Hour and 50 Kms": "Rs. 1,900", "10 Hour and 100 Kms": "Rs. 3,800", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. 18/km", batta: "Rs. 600/day" } },
  { name: "Kia Carens", category: "Cars", subcategory: "SUV", img: kc, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Maruti Ertiga", category: "Cars", subcategory: "SUV", img: me, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Toyota Hycross", category: "Cars", subcategory: "SUV", img: th, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Mahindra Xylo", category: "Cars", subcategory: "SUV", img: mx, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },

  // --- LUXURY CARS ---
  { name: "BMW 5 series", category: "Luxury Cars", img: bmw5, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "AUDI A6", category: "Luxury Cars", img: audia6, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "AUDI A3", category: "Luxury Cars", img: audia3, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "JAGUAR - XJ", category: "Luxury Cars", img: jxj, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "JAGUAR - XF", category: "Luxury Cars", img: jxf, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "MERCEDES BENZ E 250", category: "Luxury Cars", img: benz250, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "MERCEDES BENZ S350", category: "Luxury Cars", img: benz350, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "KIA CARNIVAL", category: "Luxury Cars", img: kcavif, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "TOYOTA COMMUTER", category: "Luxury Cars", img: tc, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "TOYOTA FORTUNER", category: "Luxury Cars", img: tf, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },

  // --- VAN MAXICAB ---
  // Tempo Traveller
  { name: "Tempo Traveller (12 & 14 Seater)", category: "Van Maxicab", subcategory: "Tempo Traveller", img: tempoSmall, gallery: [tt1214vid, tt1, tt2, tt3, tt4], localTariff: { "5 Hour and 50 Kms": "Rs. 3,000", "10 Hour and 100 Kms": "Rs. 6,000", "15 Hour and 150 Kms": "Rs. 9,000", "Extra Hours": "Rs. 750", "Extra kms": "Rs. 22" }, outstationTariff: { ac: "Rs. 22/km", batta: "Rs. 700/day", minKms: "Min. 250KM / 300KM" } },
  { name: "Tempo Traveller (18 Seater)", category: "Van Maxicab", subcategory: "Tempo Traveller", img: tempoLarge, gallery: [tt18vid, tt18img1, tt18img2, tt18img3, tt18img4], localTariff: { "5 Hour and 50 Kms": "Rs. 4,000", "10 Hour and 100 Kms": "Rs. 8,000", "15 Hour and 150 Kms": "Rs. 12,000", "Extra Hours": "Rs. 850", "Extra kms": "Rs. 30" }, outstationTariff: { ac: "Rs. 26/km", batta: "Rs. 800/day", minKms: "Min. 250KM / 300KM" } },
  // Luxury Tempo
  { name: "Luxury Tempo Traveller (10 Seater)", category: "Van Maxicab", subcategory: "Luxury Tempo Traveller", img: tempoSmall, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  // Minibus
  { name: "Minibus (21 Seater)", category: "Van Maxicab", subcategory: "Minibus", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Minibus (25 Seater)", category: "Van Maxicab", subcategory: "Minibus", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  // Economy Non A/C
  { name: "Eicher (19 Seater)", category: "Van Maxicab", subcategory: "Economy (Non A/C)", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "-", nonAc: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Marcopolo (19 Seater)", category: "Van Maxicab", subcategory: "Economy (Non A/C)", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "-", nonAc: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Mahindra Tourister (15 Seater)", category: "Van Maxicab", subcategory: "Economy (Non A/C)", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. 2,000", "10 Hour and 100 Kms": "Rs. 4,000", "Extra Hours": "Rs. 500", "Extra kms": "Rs. 20" }, outstationTariff: { nonAc: "Rs. 20/km", batta: "Rs. 500/day" } },
  // Minibus Executive
  { name: "Minibus Executive (22 Seater) - 6 Wheels at back", category: "Van Maxicab", subcategory: "Minibus Executive Large", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Minibus Executive (25 Seater) - 6 Wheels at back", category: "Van Maxicab", subcategory: "Minibus Executive Large", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  // Luxury Urbania
  { name: "Premium Urbania (10 Seater)", category: "Van Maxicab", subcategory: "Luxury", img: urbania, gallery: [urb14vid, urb14img1, urb14img2, urb14img3, urb14img4, urb14img5], localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. XX/km", batta: "Rs. XX/day" } },
  { name: "Urbania (14 Seater)", category: "Van Maxicab", subcategory: "Luxury", img: urbania, gallery: [urb14vid, urb14img1, urb14img2, urb14img3, urb14img4, urb14img5], localTariff: { "5 Hour and 50 Kms": "Rs. 4,000", "10 Hour and 100 Kms": "Rs. 8,000", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. 36/km", batta: "Rs. 900/day" } },
  { name: "Urbania (16 Seater)", category: "Van Maxicab", subcategory: "Luxury", img: urbania, gallery: [urb14vid, urb14img1, urb14img2, urb14img3, urb14img4, urb14img5], localTariff: { "5 Hour and 50 Kms": "Rs. 4,000", "10 Hour and 100 Kms": "Rs. 8,000", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { ac: "Rs. 36/km", batta: "Rs. 900/day" } },

  // --- BUS ---
  { name: "SML HIROI ISUZU (32 + 1 Seater)", category: "Bus", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "FORCE MONOBUS (33 + 1 Seater)", category: "Bus", img: minibus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "BHARAT BENZ (35 + 1 Seater)", category: "Bus", img: bus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "ASHOK LEYLAND (36 + 1 Seater)", category: "Bus", img: bus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "ASHOK LEYLAND (40 + 1 Seater)", category: "Bus", img: bus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "ASHOK LEYLAND (50 + 1 Seater)", category: "Bus", img: bus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "ASHOK LEYLAND (54 + 1 Seater)", category: "Bus", img: bus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "VOLVO 9400 [B 11 R] (45 + 1 Seater) EXECUTIVE MODEL", category: "Bus", img: bus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
  { name: "VOLVO 9600 [MULTI AXLE] (45 + 1 Seater) LUXURY MODEL", category: "Bus", img: bus, localTariff: { "5 Hour and 50 Kms": "Rs. XX", "10 Hour and 100 Kms": "Rs. XX", "Extra Hours": "Rs. XX", "Extra kms": "Rs. XX" }, outstationTariff: { minKms: "300 Kms", perDayRental: "Rs. XX/-", nonAc: "Rs. XX/km", batta: "Rs. XX/-" } },
];

export const PACKAGES = [
  { name: "Ooty", days: "4 Days", price: "Rs. 34,800", img: ooty },
  { name: "Mahabalipuram", days: "1 Day", price: "Rs. 6,500", img: mahabalipuram },
  { name: "Kodaikanal", days: "4 Days", price: "Rs. 33,800", img: kodaikanal },
  { name: "Tirupati", days: "1 Day", price: "Rs. 13,500", img: tirupati },
  { name: "Tirupati", days: "2 Days", price: "Rs. 17,000", img: tirupati },
  { name: "Valparai", days: "4 Days", price: "Rs. 36,000", img: valparai },
  { name: "Munnar", days: "4 Days", price: "Rs. 35,500", img: munnar },
];

export const TARIFF_TERMS = [
  { title: "Distance Calculation", desc: "We calculate starting and closing kilometers per hour from our garage to your destination." },
  { title: "Hourly Rates (Local Package)", desc: "We treat more than 7 hours as 10 hours and more than 12 hours as 15 hours for local packages." },
  { title: "Included Costs", desc: "Our rates include only fuel and the driver's service." },
  { title: "Additional Fees", desc: "Besides the tariff mentioned, you will pay tolls, parking fees, and permit charges." },
  { title: "Drive Batta", desc: "We calculate drive batta on a calendar day basis." },
  { title: "Rate Changes", desc: "We may adjust rates in response to fluctuations in diesel or petrol prices. It is your responsibility to confirm the updated price before booking." },
  { title: "Cancellation Policy", desc: "We will charge a cancellation fee if you cancel after the vehicle has left our garage or if you do not show up." },
  { title: "Availability", desc: "The vehicle models and facilities listed are subject to availability." },
  { title: "Advance Payment", desc: "You must pay 50% of the advance when booking the vehicle." },
  { title: "Standing AC", desc: "Standing AC (idle vehicle with AC ON) is limited to 10 minutes; additional usage, upon request, will be charged at ₹500 for Sedans, ₹1,000 for Premium Sedans/Vans, and ₹2,000 for Buses per 30 minutes." },
  { title: "Vehicle Cleanliness & Damage Charges", desc: "Customers are responsible for any stains, odour, spillage, vomiting, urination, alcohol spills, food spills, or damage caused inside the vehicle during the trip. If deep cleaning, water wash, seat cleaning, mat replacement, seat cover replacement, or any material replacement is required, the full cleaning or replacement cost must be paid by the customer." },
];
