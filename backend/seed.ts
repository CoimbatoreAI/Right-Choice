import mongoose from "mongoose";
import dotenv from "dotenv";
import { Vehicle } from "./models/Vehicle";
import { Package } from "./models/Package";
import { connectDB } from "./config/db";

const PACKAGES = [
  {
    "name": "Ooty",
    "days": "4 Days",
    "price": "Rs. 34,800",
    "img": "/assets/places/ooty.png"
  },
  {
    "name": "Mahabalipuram",
    "days": "1 Day",
    "price": "Rs. 6,500",
    "img": "/assets/places/mahabalipuram.png"
  },
  {
    "name": "Kodaikanal",
    "days": "4 Days",
    "price": "Rs. 33,800",
    "img": "/assets/places/kodaikanal.png"
  },
  {
    "name": "Tirupati",
    "days": "1 Day",
    "price": "Rs. 13,500",
    "img": "/assets/places/tirupati.png"
  },
  {
    "name": "Tirupati",
    "days": "2 Days",
    "price": "Rs. 17,000",
    "img": "/assets/places/tirupati.png"
  },
  {
    "name": "Valparai",
    "days": "4 Days",
    "price": "Rs. 36,000",
    "img": "/assets/places/valparai.png"
  },
  {
    "name": "Munnar",
    "days": "4 Days",
    "price": "Rs. 35,500",
    "img": "/assets/places/munnar.png"
  }
];

const FLEET = [
  {
    "name": "Maruti Swift Dzire",
    "category": "Cars",
    "subcategory": "Sedan",
    "img": "/assets/msd.jpg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 1300",
      "10 Hour and 100 Kms": "Rs. 2600",
      "Extra Hours": "Rs. 260",
      "Extra kms": "Rs. 14"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Toyota Etios",
    "category": "Cars",
    "subcategory": "Sedan",
    "img": "/assets/te.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 1400",
      "10 Hour and 100 Kms": "Rs. 2800",
      "Extra Hours": "Rs. 280",
      "Extra kms": "Rs. 15"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Hyundai Accent",
    "category": "Cars",
    "subcategory": "Sedan",
    "img": "/assets/ha.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Honda Amaze",
    "category": "Cars",
    "subcategory": "Sedan",
    "img": "/assets/ham.jpeg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Toyota Innova",
    "category": "Cars",
    "subcategory": "SUV",
    "img": "/assets/ti.jpeg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 1,900",
      "10 Hour and 100 Kms": "Rs. 3,800",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. 18/km",
      "batta": "Rs. 600/day"
    }
  },
  {
    "name": "Toyota Innova Crysta",
    "category": "Cars",
    "subcategory": "SUV",
    "img": "/assets/tic.jpeg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 1,900",
      "10 Hour and 100 Kms": "Rs. 3,800",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. 18/km",
      "batta": "Rs. 600/day"
    }
  },
  {
    "name": "Kia Carens",
    "category": "Cars",
    "subcategory": "SUV",
    "img": "/assets/kc.jpg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Maruti Ertiga",
    "category": "Cars",
    "subcategory": "SUV",
    "img": "/assets/me.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Toyota Hycross",
    "category": "Cars",
    "subcategory": "SUV",
    "img": "/assets/th.jpeg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Mahindra Xylo",
    "category": "Cars",
    "subcategory": "SUV",
    "img": "/assets/mx.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "BMW 5 series",
    "category": "Luxury Cars",
    "img": "/assets/bmw5.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "AUDI A6",
    "category": "Luxury Cars",
    "img": "/assets/audia6.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "AUDI A3",
    "category": "Luxury Cars",
    "img": "/assets/audia3.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "JAGUAR - XJ",
    "category": "Luxury Cars",
    "img": "/assets/jxj.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "JAGUAR - XF",
    "category": "Luxury Cars",
    "img": "/assets/jxf.webp",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "MERCEDES BENZ E 250",
    "category": "Luxury Cars",
    "img": "/assets/benz250.jpg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "MERCEDES BENZ S350",
    "category": "Luxury Cars",
    "img": "/assets/benz350.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "KIA CARNIVAL",
    "category": "Luxury Cars",
    "img": "/assets/kc.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "TOYOTA COMMUTER",
    "category": "Luxury Cars",
    "img": "/assets/tc.webp",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "TOYOTA FORTUNER",
    "category": "Luxury Cars",
    "img": "/assets/tf.avif",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Tempo Traveller (12 & 14 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Tempo Traveller",
    "img": "/assets/vehicles/tempo-small.jpg",
    "gallery": [
      "/assets/Tempo Traveller (12 & 14 Seater).mp4",
      "/assets/tt (1).jpeg",
      "/assets/tt (2).jpeg",
      "/assets/tt (3).jpeg",
      "/assets/tt (4).jpeg"
    ],
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 3,000",
      "10 Hour and 100 Kms": "Rs. 6,000",
      "15 Hour and 150 Kms": "Rs. 9,000",
      "Extra Hours": "Rs. 750",
      "Extra kms": "Rs. 22"
    },
    "outstationTariff": {
      "ac": "Rs. 22/km",
      "batta": "Rs. 700/day",
      "minKms": "Min. 250KM / 300KM"
    }
  },
  {
    "name": "Tempo Traveller (18 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Tempo Traveller",
    "img": "/assets/vehicles/tempo-large.jpg",
    "gallery": [
      "/assets/tempo18.mp4",
      "/assets/Tempo 18 (1).jpeg",
      "/assets/Tempo 18 (2).jpeg",
      "/assets/Tempo 18 (3).jpeg",
      "/assets/Tempo 18 (4).jpeg"
    ],
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 4,000",
      "10 Hour and 100 Kms": "Rs. 8,000",
      "15 Hour and 150 Kms": "Rs. 12,000",
      "Extra Hours": "Rs. 850",
      "Extra kms": "Rs. 30"
    },
    "outstationTariff": {
      "ac": "Rs. 26/km",
      "batta": "Rs. 800/day",
      "minKms": "Min. 250KM / 300KM"
    }
  },
  {
    "name": "Luxury Tempo Traveller (10 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Luxury Tempo Traveller",
    "img": "/assets/vehicles/tempo-small.jpg",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Minibus (21 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Minibus",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Minibus (25 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Minibus",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Eicher (19 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Economy (Non A/C)",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Marcopolo (19 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Economy (Non A/C)",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Mahindra Tourister (15 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Economy (Non A/C)",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 2,000",
      "10 Hour and 100 Kms": "Rs. 4,000",
      "Extra Hours": "Rs. 500",
      "Extra kms": "Rs. 20"
    },
    "outstationTariff": {
      "nonAc": "Rs. 20/km",
      "batta": "Rs. 500/day"
    }
  },
  {
    "name": "Minibus Executive (22 Seater) - 6 Wheels at back",
    "category": "Van Maxicab",
    "subcategory": "Minibus Executive Large",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Minibus Executive (25 Seater) - 6 Wheels at back",
    "category": "Van Maxicab",
    "subcategory": "Minibus Executive Large",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Premium Urbania (10 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Luxury",
    "img": "/assets/vehicles/urbania.jpg",
    "gallery": [
      "/assets/Urbania14&16  (1).mp4",
      "/assets/Urbania14&16  (1).jpeg",
      "/assets/Urbania14&16  (2).jpeg",
      "/assets/Urbania14&16  (3).jpeg",
      "/assets/Urbania14&16  (4).jpeg",
      "/assets/Urbania14&16  (5).jpeg"
    ],
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. XX/km",
      "batta": "Rs. XX/day"
    }
  },
  {
    "name": "Urbania (14 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Luxury",
    "img": "/assets/vehicles/urbania.jpg",
    "gallery": [
      "/assets/Urbania14&16  (1).mp4",
      "/assets/Urbania14&16  (1).jpeg",
      "/assets/Urbania14&16  (2).jpeg",
      "/assets/Urbania14&16  (3).jpeg",
      "/assets/Urbania14&16  (4).jpeg",
      "/assets/Urbania14&16  (5).jpeg"
    ],
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 4,000",
      "10 Hour and 100 Kms": "Rs. 8,000",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. 36/km",
      "batta": "Rs. 900/day"
    }
  },
  {
    "name": "Urbania (16 Seater)",
    "category": "Van Maxicab",
    "subcategory": "Luxury",
    "img": "/assets/vehicles/urbania.jpg",
    "gallery": [
      "/assets/Urbania14&16  (1).mp4",
      "/assets/Urbania14&16  (1).jpeg",
      "/assets/Urbania14&16  (2).jpeg",
      "/assets/Urbania14&16  (3).jpeg",
      "/assets/Urbania14&16  (4).jpeg",
      "/assets/Urbania14&16  (5).jpeg"
    ],
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. 4,000",
      "10 Hour and 100 Kms": "Rs. 8,000",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "ac": "Rs. 36/km",
      "batta": "Rs. 900/day"
    }
  },
  {
    "name": "SML HIROI ISUZU (32 + 1 Seater)",
    "category": "Bus",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "FORCE MONOBUS (33 + 1 Seater)",
    "category": "Bus",
    "img": "/assets/vehicles/minibus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "BHARAT BENZ (35 + 1 Seater)",
    "category": "Bus",
    "img": "/assets/vehicles/bus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "ASHOK LEYLAND (36 + 1 Seater)",
    "category": "Bus",
    "img": "/assets/vehicles/bus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "ASHOK LEYLAND (40 + 1 Seater)",
    "category": "Bus",
    "img": "/assets/vehicles/bus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "ASHOK LEYLAND (50 + 1 Seater)",
    "category": "Bus",
    "img": "/assets/vehicles/bus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "ASHOK LEYLAND (54 + 1 Seater)",
    "category": "Bus",
    "img": "/assets/vehicles/bus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "VOLVO 9400 [B 11 R] (45 + 1 Seater) EXECUTIVE MODEL",
    "category": "Bus",
    "img": "/assets/vehicles/bus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  },
  {
    "name": "VOLVO 9600 [MULTI AXLE] (45 + 1 Seater) LUXURY MODEL",
    "category": "Bus",
    "img": "/assets/vehicles/bus.png",
    "localTariff": {
      "5 Hour and 50 Kms": "Rs. XX",
      "10 Hour and 100 Kms": "Rs. XX",
      "Extra Hours": "Rs. XX",
      "Extra kms": "Rs. XX"
    },
    "outstationTariff": {
      "minKms": "300 Kms",
      "perDayRental": "Rs. XX/-",
      "nonAc": "Rs. XX/km",
      "batta": "Rs. XX/-"
    }
  }
];

dotenv.config();

const seed = async () => {
  await connectDB();
  
  await Vehicle.deleteMany({});
  await Package.deleteMany({});
  
  await Vehicle.insertMany(FLEET);
  await Package.insertMany(PACKAGES);
  
  console.log("Database seeded successfully with " + FLEET.length + " vehicles!");
  process.exit(0);
};

seed();
