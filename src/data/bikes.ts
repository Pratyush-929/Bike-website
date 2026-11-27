export interface BikeCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  bikeCount: number;
}

export interface BikeModel {
  id: string;
  slug: string;
  name: string;
  brand: string;
  manufacturer: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  intendedRidingStyle: string;
  frameMaterial: string;
  wheelSize: string;
  suspensionTravel: string;
  suspensionType: string;
  keyFeatures: string[];
  officialWebsite: string;
  image: string;
  images: string[];
  gallery: string[];
  imageSource: string;
  imageVerified: boolean;
  featured?: boolean;
}

export const BIKE_FALLBACK_IMAGE = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/bike-fallback.svg`;

export const CATEGORIES: BikeCategory[] = [
  {
    id: "cat-1",
    slug: "all-mountain",
    name: "All-Mountain Bikes",
    shortName: "All-Mountain",
    description:
      "Versatile mountain bikes designed for climbing, technical trails, and aggressive downhill riding.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80",
    bikeCount: 5,
  },
  {
    id: "cat-2",
    slug: "enduro",
    name: "Enduro Mountain Bikes",
    shortName: "Enduro",
    description:
      "Aggressive mountain bikes designed for steep descents, technical terrain, jumps, and enduro racing.",
    image:
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1400&q=80",
    bikeCount: 5,
  },
  {
    id: "cat-3",
    slug: "trail",
    name: "Trail & All-Mountain Bikes",
    shortName: "Trail & All-Mountain",
    description:
      "Versatile bikes designed for everyday trail riding, mountain adventures, and technical singletracks.",
    image:
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1400&q=80",
    bikeCount: 5,
  },
  {
    id: "cat-4",
    slug: "downhill",
    name: "Downhill & Freeride Bikes",
    shortName: "Downhill & Freeride",
    description:
      "Powerful bikes built for downhill racing, bike parks, steep tracks, big jumps, and freeride adventures.",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Giant-Glory-Advanced-cockpit-and-Shimano-Saint-brakes-617008f.jpg?w=1200",
    bikeCount: 5,
  },
  {
    id: "cat-5",
    slug: "hardtail",
    name: "Hardtail Mountain Bikes",
    shortName: "Hardtail",
    description:
      "Lightweight and efficient mountain bikes featuring front suspension and a rigid rear frame.",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1400&q=80",
    bikeCount: 5,
  },
  {
    id: "cat-6",
    slug: "cross-country",
    name: "Cross-Country (XC) Mountain Bikes",
    shortName: "Cross-Country (XC)",
    description:
      "Efficient mountain bikes designed for speed, endurance, climbing, long-distance riding, and XC racing.",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2023/12/Trek-Supercaliber-SLR-9.9-vs-Specialized-S-Works-Epic-World-Cup-03-05ccc92.jpg?w=1200",
    bikeCount: 5,
  },
];

export const BIKES: BikeModel[] = [
  // ============================================================================
  // CATEGORY 1: ALL-MOUNTAIN BIKES
  // ============================================================================
  {
    id: "am-1",
    slug: "santa-cruz-hightower",
    name: "Santa Cruz Hightower",
    brand: "Santa Cruz",
    manufacturer: "Santa Cruz Bicycles",
    categorySlug: "all-mountain",
    categoryName: "All-Mountain Bikes",
    shortDescription:
      "A benchmark 29-inch all-mountain bike balancing climbing efficiency with confident steep-terrain composure.",
    description:
      "The Santa Cruz Hightower is engineered as a do-everything all-mountain platform utilizing Santa Cruz's Virtual Pivot Point (VPP) suspension architecture. Built around 29-inch wheels and balanced geometry, it climbs steep fire roads efficiently while maintaining high-speed composure on rough backcountry descents.",
    intendedRidingStyle: "All-Mountain / Aggressive Trail",
    frameMaterial: "Carbon (C or CC options)",
    wheelSize: '29"',
    suspensionTravel: "150 mm Rear / 160 mm Front",
    suspensionType: "Full Suspension (VPP Linkage)",
    keyFeatures: [
      "VPP lower-link mounted shock design",
      "Flip-chip geometry adjustment",
      "Glovebox internal frame storage",
      "29-inch wheel platform across frame sizes",
    ],
    officialWebsite: "https://www.santacruzbicycles.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2024/09/Santa-Cruz-Hightower-Gen4-Hightower.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2024/09/Santa-Cruz-Hightower-Gen4-Hightower.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2024/09/Santa-Cruz-Hightower-Gen4-Hightower-ride-1.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2024/09/Santa-Cruz-Hightower-Gen4-Hightower.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2024/09/Santa-Cruz-Hightower-Gen4-Hightower-ride-1.jpg?w=1200",
    ],
    imageSource: "BikeRadar (2025 Santa Cruz Hightower Gen 4)",
    imageVerified: true,
    featured: true,
  },
  {
    id: "am-2",
    slug: "pivot-switchblade",
    name: "Pivot Switchblade",
    brand: "Pivot",
    manufacturer: "Pivot Cycles",
    categorySlug: "all-mountain",
    categoryName: "All-Mountain Bikes",
    shortDescription:
      "Agile dw-link all-mountain platform supporting full 29-inch or mixed mullet wheel configurations.",
    description:
      "The Pivot Switchblade combines Pivot's lightweight carbon frame engineering with the dw-link suspension system. Designed for technical all-mountain trails, it delivers strong pedaling traction on steep climbs and progressive support through rough rock gardens and drops.",
    intendedRidingStyle: "All-Mountain / Technical Trail",
    frameMaterial: "Carbon Fiber",
    wheelSize: '29" or Mixed (Mullet) / 27.5"+ compatible',
    suspensionTravel: "142 mm Rear / 160 mm Front",
    suspensionType: "Full Suspension (dw-link)",
    keyFeatures: [
      "dw-link anti-squat suspension kinematics",
      "Flip-chip compatibility for 29-inch or mixed wheels",
      "Vertical trunnion shock layout",
      "Internal cable routing with tool-mount integration",
    ],
    officialWebsite: "https://www.pivotcycles.com",
    image:
      "https://res.cloudinary.com/dh826anba/image/upload/w_1200,h_630,c_fill,g_auto,f_jpg,q_auto/b55d26a355ee3e7edc76c7486d3321fbab1946a2-2",
    images: [
      "https://res.cloudinary.com/dh826anba/image/upload/w_1200,h_630,c_fill,g_auto,f_jpg,q_auto/b55d26a355ee3e7edc76c7486d3321fbab1946a2-2",
    ],
    gallery: [
      "https://res.cloudinary.com/dh826anba/image/upload/w_1200,h_630,c_fill,g_auto,f_jpg,q_auto/b55d26a355ee3e7edc76c7486d3321fbab1946a2-2",
    ],
    imageSource: "Pivot Cycles Official CDN",
    imageVerified: true,
  },
  {
    id: "am-3",
    slug: "specialized-stumpjumper-15",
    name: "Specialized Stumpjumper 15",
    brand: "Specialized",
    manufacturer: "Specialized",
    categorySlug: "all-mountain",
    categoryName: "All-Mountain Bikes",
    shortDescription:
      "Modern trail and all-mountain benchmark featuring GENIE air-spring shock technology for plush control.",
    description:
      "The Specialized Stumpjumper 15 pairs trail agility with big-hit capability through Specialized's GENIE shock technology. Offered in both FACT carbon and M5 alloy chassis options with size-specific wheel configurations and adjustable geometry, it adapts smoothly across varied mountain terrain.",
    intendedRidingStyle: "All-Mountain / Trail",
    frameMaterial: "Carbon or Alloy",
    wheelSize: 'Mixed (S1–S2) / 29" (S3–S6) — configurable',
    suspensionTravel: "145 mm Rear / 150 mm Front (S1: 140 mm / 140 mm)",
    suspensionType: "Full Suspension (GENIE FSR)",
    keyFeatures: [
      "GENIE dual-chamber air spring shock technology",
      "Adjustable head angle and bottom bracket height",
      "SWAT downtube internal storage",
      "Configurable 29-inch or mixed-wheel rear shock link",
    ],
    officialWebsite: "https://www.specialized.com",
    image:
      "https://resources.specialized.com/image/93326-01_SJ-15-SW-DI2-SLDMET-REDSKY-BRSHCP_HERO-SQUARE?bg=f1f1f1&w=1400&h=1280&q=75&fm=webp",
    images: [
      "https://resources.specialized.com/image/93326-01_SJ-15-SW-DI2-SLDMET-REDSKY-BRSHCP_HERO-SQUARE?bg=f1f1f1&w=1400&h=1280&q=75&fm=webp",
    ],
    gallery: [
      "https://resources.specialized.com/image/93326-01_SJ-15-SW-DI2-SLDMET-REDSKY-BRSHCP_HERO-SQUARE?bg=f1f1f1&w=1400&h=1280&q=75&fm=webp",
    ],
    imageSource: "Specialized Official Product CDN",
    imageVerified: true,
  },
  {
    id: "am-4",
    slug: "orbea-occam-lt",
    name: "Orbea Occam LT",
    brand: "Orbea",
    manufacturer: "Orbea",
    categorySlug: "all-mountain",
    categoryName: "All-Mountain Bikes",
    shortDescription:
      "Longer-travel Occam platform built with steep-descent geometry and asymmetric frame stiffness.",
    description:
      "The Orbea Occam LT extends the Occam trail platform into aggressive all-mountain territory. Featuring 160 mm front and 150 mm rear travel with 29-inch wheels, an asymmetric frame brace, and Quick Flip geometry adjustment, it is built for demanding mountain loops and rough descents.",
    intendedRidingStyle: "All-Mountain / Aggressive Trail",
    frameMaterial: "Carbon (OMR) or Alloy (Hydro)",
    wheelSize: '29"',
    suspensionTravel: "150 mm Rear / 160 mm Front",
    suspensionType: "Full Suspension (Concentric Boost)",
    keyFeatures: [
      "Asymmetric frame structural brace",
      "Quick Flip geometry adjustment",
      "LOCKR downtube storage compartment",
      "Available in OMR carbon or hydroformed alloy",
    ],
    officialWebsite: "https://www.orbea.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Orbea--Jeremie-Reuiller-5095-Large-2a3c948.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Orbea--Jeremie-Reuiller-5095-Large-2a3c948.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Orbea--Jeremie-Reuiller-5095-Large-2a3c948.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Orbea Occam LT Review)",
    imageVerified: true,
  },
  {
    id: "am-5",
    slug: "rocky-mountain-instinct",
    name: "Rocky Mountain Instinct",
    brand: "Rocky Mountain",
    manufacturer: "Rocky Mountain",
    categorySlug: "all-mountain",
    categoryName: "All-Mountain Bikes",
    shortDescription:
      "Highly tunable RIDE-9 all-mountain trail bike crafted for long singletrack epics and technical descents.",
    description:
      "The Rocky Mountain Instinct is a versatile all-mountain machine featuring adjustable geometry and suspension-rate tuning. With SmoothWall Carbon or FORM Alloy frames and size-specific wheel sizing, it balances uphill traction with planted descending manners.",
    intendedRidingStyle: "All-Mountain / Trail",
    frameMaterial: "Carbon (SmoothWall) or Alloy (FORM)",
    wheelSize: '27.5" (XS–S) / 29" (M–XL)',
    suspensionTravel: "145 mm Rear / 160 mm Front",
    suspensionType: "Full Suspension (Smoothlink)",
    keyFeatures: [
      "Adjustable geometry and leverage chip",
      "Size-optimized wheel sizing",
      "PenaltyBox downtube storage on carbon models",
      "2-position rear axle chainstay adjustment",
    ],
    officialWebsite: "https://www.bikes.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2024/03/Rocky-Mountain-Instinct-with-mountain-background.png?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2024/03/Rocky-Mountain-Instinct-with-mountain-background.png?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2024/03/Rocky-Mountain-Instinct-with-mountain-background.png?w=1200",
    ],
    imageSource: "BikeRadar (Rocky Mountain Instinct Release)",
    imageVerified: true,
  },

  // ============================================================================
  // CATEGORY 2: ENDURO MOUNTAIN BIKES
  // ============================================================================
  {
    id: "en-1",
    slug: "yt-capra",
    name: "YT Capra",
    brand: "YT Industries",
    manufacturer: "YT Industries",
    categorySlug: "enduro",
    categoryName: "Enduro Mountain Bikes",
    shortDescription:
      "Hard-charging enduro and bike-park machine offered in 29-inch and MX mixed-wheel configurations.",
    description:
      "The YT Capra is built for steep enduro stages, big hits, and rugged mountain descents. Utilizing YT's V4L (Virtual 4 Link) suspension kinematics in both Carbon (CF) and Aluminum (AL) frames, the Capra delivers deep-stroke support and playful handling.",
    intendedRidingStyle: "Enduro / Bike Park",
    frameMaterial: "Carbon (CF) or Aluminum (AL)",
    wheelSize: '29" or MX / Mullet (29" Front / 27.5" Rear)',
    suspensionTravel: "165 mm–170 mm Rear / 170 mm Front",
    suspensionType: "Full Suspension (V4L 4-Bar)",
    keyFeatures: [
      "V4L progressive four-bar suspension kinematics",
      "Available in full 29-inch or MX mixed-wheel builds",
      "Flip-chip geometry adjustment",
      "High-clearance frame silhouette with tool mounts",
    ],
    officialWebsite: "https://www.yt-industries.com",
    image:
      "https://www.yt-industries.com/media/d3/82/21/1792755235/BF_Models_ComCarousel_CAPRA.jpg",
    images: [
      "https://www.yt-industries.com/media/d3/82/21/1792755235/BF_Models_ComCarousel_CAPRA.jpg",
      "https://www.yt-industries.com/thumbnail/2c/6d/04/1740650915/133_CAPRA_CORE_LINE_1x1_ComCarousel_800x800.jpg?ts=1740651003",
    ],
    gallery: [
      "https://www.yt-industries.com/media/d3/82/21/1792755235/BF_Models_ComCarousel_CAPRA.jpg",
      "https://www.yt-industries.com/thumbnail/2c/6d/04/1740650915/133_CAPRA_CORE_LINE_1x1_ComCarousel_800x800.jpg?ts=1740651003",
    ],
    imageSource: "YT Industries Official Media",
    imageVerified: true,
  },
  {
    id: "en-2",
    slug: "canyon-strive-cfr",
    name: "Canyon Strive CFR",
    brand: "Canyon",
    manufacturer: "Canyon",
    categorySlug: "enduro",
    categoryName: "Enduro Mountain Bikes",
    shortDescription:
      "Enduro World Series race weapon featuring on-the-fly Shapeshifter geometry and travel switching.",
    description:
      "The Canyon Strive CFR is engineered strictly for enduro racing speed. Built with Canyon Factory Racing (CFR) carbon fiber and 29-inch wheels, its handlebar-actuated Shapeshifter system lets riders switch between Shred mode (160 mm) and Pedal mode (140 mm) while riding.",
    intendedRidingStyle: "Enduro Racing",
    frameMaterial: "Carbon (CFR)",
    wheelSize: '29"',
    suspensionTravel: "160 mm Rear (140 mm Pedal Mode) / 170 mm Front",
    suspensionType: "Full Suspension (Shapeshifter 4-Bar)",
    keyFeatures: [
      "Handlebar-actuated Shapeshifter geometry and travel toggle",
      "Canyon Factory Racing (CFR) carbon chassis",
      "Long, slack enduro race geometry",
      "29-inch front and rear race wheelset",
    ],
    officialWebsite: "https://www.canyon.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2022/10/Canyon-Strive-33329ce.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2022/10/Canyon-Strive-33329ce.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2022/10/Canyon-Strive-33329ce.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Canyon Strive CFR Review)",
    imageVerified: true,
  },
  {
    id: "en-3",
    slug: "trek-slash",
    name: "Trek Slash",
    brand: "Trek",
    manufacturer: "Trek",
    categorySlug: "enduro",
    categoryName: "Enduro Mountain Bikes",
    shortDescription:
      "High-pivot 170 mm enduro platform engineered for square-edge bumps and maximum downhill momentum.",
    description:
      "The Gen 6 Trek Slash adopts a high-pivot suspension layout with an upper idler pulley to achieve a rearward axle path over rough, square-edge terrain. Built with 170 mm front and rear travel and stock MX mullet wheels on most sizes, it thrives on the steepest enduro tracks.",
    intendedRidingStyle: "Enduro / Steep Technical Descent",
    frameMaterial: "Alpha Platinum Aluminum or OCLV Mountain Carbon",
    wheelSize: 'MX / Mullet (29" Front / 27.5" Rear; 27.5" on S; convertible to 29")',
    suspensionTravel: "170 mm Rear / 170 mm Front",
    suspensionType: "Full Suspension (High-Pivot ABP)",
    keyFeatures: [
      "High-pivot suspension with upper and lower idler pulleys",
      "Active Braking Pivot (ABP)",
      "Internal downtube frame storage",
      "Adjustable headset angle cups and progression flip-chip",
    ],
    officialWebsite: "https://www.trekbikes.com",
    image:
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/Slash99-26-52939-B-Primary",
    images: [
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/Slash99-26-52939-B-Primary",
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/Slash98-26-52582-B-Primary",
    ],
    gallery: [
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/Slash99-26-52939-B-Primary",
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/Slash98-26-52582-B-Primary",
    ],
    imageSource: "Trek Bikes Official Media",
    imageVerified: true,
  },
  {
    id: "en-4",
    slug: "yeti-sb160",
    name: "Yeti SB160",
    brand: "Yeti",
    manufacturer: "Yeti Cycles",
    categorySlug: "enduro",
    categoryName: "Enduro Mountain Bikes",
    shortDescription:
      "Race-proven Switch Infinity enduro machine with 170 mm fork and crisp pedaling efficiency.",
    description:
      "The Yeti SB160 is Yeti Cycles' flagship enduro race bike, pairing 160 mm of Switch Infinity rear travel with a 170 mm fork and 29-inch wheels. Designed for demanding enduro stages, it balances supple mid-stroke support with decisive cornering precision.",
    intendedRidingStyle: "Enduro Racing / Aggressive Mountain",
    frameMaterial: "Carbon (TURQ or C/Series)",
    wheelSize: '29"',
    suspensionTravel: "160 mm Rear / 170 mm Front",
    suspensionType: "Full Suspension (Switch Infinity)",
    keyFeatures: [
      "Switch Infinity translating pivot suspension",
      "Threaded bottom bracket with ISCG-05 tabs",
      "High-clearance downtube with dual-density protector",
      "Size-specific chainstay lengths and seat tube angles",
    ],
    officialWebsite: "https://www.yeticycles.com",
    image:
      "https://yeticycles-prod.zaneray.com/cms/images/aGW5Bnfc4bHWi-1I_YetiSB160AnniM.jpg?auto=format,compress",
    images: [
      "https://yeticycles-prod.zaneray.com/cms/images/aGW5Bnfc4bHWi-1I_YetiSB160AnniM.jpg?auto=format,compress",
      "https://yeticycles-prod.zaneray.com/cms/images/7be2ab73-9088-4cf0-aa29-e9c9a58bcc9b_2023+SB160+Truq+Dark.jpg?auto=compress,format&rect=0,13,1920,1008&w=1200&h=630",
    ],
    gallery: [
      "https://yeticycles-prod.zaneray.com/cms/images/aGW5Bnfc4bHWi-1I_YetiSB160AnniM.jpg?auto=format,compress",
      "https://yeticycles-prod.zaneray.com/cms/images/7be2ab73-9088-4cf0-aa29-e9c9a58bcc9b_2023+SB160+Truq+Dark.jpg?auto=compress,format&rect=0,13,1920,1008&w=1200&h=630",
    ],
    imageSource: "Yeti Cycles Official CDN",
    imageVerified: true,
    featured: true,
  },
  {
    id: "en-5",
    slug: "commencal-meta-sx",
    name: "Commencal Meta SX",
    brand: "Commencal",
    manufacturer: "Commencal",
    categorySlug: "enduro",
    categoryName: "Enduro Mountain Bikes",
    shortDescription:
      "Triple-butted alloy MX mullet enduro bike tuned for bike-park laps, jumps, and steep chutes.",
    description:
      "The Commencal Meta SX pairs a rugged triple-butted 6066 aluminum frame with a mixed 29-inch front / 27.5-inch rear wheel setup. Engineered with 170 mm front and 160 mm rear travel, it delivers agile cornering and confidence at high speed.",
    intendedRidingStyle: "Enduro / Freeride / Bike Park",
    frameMaterial: "Aluminum (AL 6066 Triple-Butted)",
    wheelSize: 'MX / Mullet (29" Front / 27.5" Rear)',
    suspensionTravel: "160 mm Rear / 170 mm Front",
    suspensionType: "Full Suspension (Virtual Contact System)",
    keyFeatures: [
      "Triple-butted 6066 alloy chassis",
      "Dedicated MX mixed-wheel geometry",
      "Flip-chip chainstay/BB height adjustment",
      "Built for steep technical terrain and jumps",
    ],
    officialWebsite: "https://www.commencal.com",
    image:
      "https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dwad5e63eb/images/BT6MSXV5SGEU1.jpg",
    images: [
      "https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dwad5e63eb/images/BT6MSXV5SGEU1.jpg",
      "https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dwc9ff9c2d/images/BT6MSXV5SGEU1_01.jpg",
    ],
    gallery: [
      "https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dwad5e63eb/images/BT6MSXV5SGEU1.jpg",
      "https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dwc9ff9c2d/images/BT6MSXV5SGEU1_01.jpg",
    ],
    imageSource: "Commencal Official Product CDN",
    imageVerified: true,
  },

  // ============================================================================
  // CATEGORY 3: TRAIL & ALL-MOUNTAIN BIKES
  // ============================================================================
  {
    id: "tr-1",
    slug: "santa-cruz-tallboy",
    name: "Santa Cruz Tallboy",
    brand: "Santa Cruz",
    manufacturer: "Santa Cruz Bicycles",
    categorySlug: "trail",
    categoryName: "Trail & All-Mountain Bikes",
    shortDescription:
      "Short-travel 29er trail bike that punches far above its travel numbers on technical singletrack.",
    description:
      "The Santa Cruz Tallboy blends snappy XC-like acceleration with trail-ready geometry and active rear suspension. Whether riding fast local singletrack or full-day alpine loops, its responsive chassis rewards active riders.",
    intendedRidingStyle: "Trail / Downcountry",
    frameMaterial: "Carbon (Carbon C or Carbon CC)",
    wheelSize: '29"',
    suspensionTravel: "120 mm–130 mm Rear / 130 mm–140 mm Front",
    suspensionType: "Full Suspension",
    keyFeatures: [
      "Responsive short-travel suspension kinematics",
      "Glovebox internal downtube storage",
      "Flip-chip geometry adjustment",
      "29-inch fast-rolling trail platform",
    ],
    officialWebsite: "https://www.santacruzbicycles.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2026/05/Santa-Cruz-Tallboy-in-the-forest.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2026/05/Santa-Cruz-Tallboy-in-the-forest.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2026/05/Santa-Cruz-Tallboy-four-bar.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2026/05/Santa-Cruz-Tallboy-in-the-forest.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2026/05/Santa-Cruz-Tallboy-four-bar.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Santa Cruz Tallboy)",
    imageVerified: true,
  },
  {
    id: "tr-2",
    slug: "ibis-ripmo",
    name: "Ibis Ripmo",
    brand: "Ibis",
    manufacturer: "Ibis Cycles",
    categorySlug: "trail",
    categoryName: "Trail & All-Mountain Bikes",
    shortDescription:
      "Beloved dw-link trail and all-mountain favorite with adaptable wheel sizing and internal storage.",
    description:
      "The Ibis Ripmo pairs dw-link climbing efficiency with 150 mm rear and 160 mm front travel. Available in carbon or the Ripmo AF aluminum variant, it features a flip-chip supporting both 29-inch and mixed-wheel setups across frame sizes.",
    intendedRidingStyle: "Trail / All-Mountain",
    frameMaterial: "Carbon or Aluminum (Ripmo AF)",
    wheelSize: '29" (XM–XL) / Mixed Mullet (SM–MD, adjustable via flip-chip)',
    suspensionTravel: "150 mm Rear / 160 mm Front",
    suspensionType: "Full Suspension (dw-link)",
    keyFeatures: [
      "dw-link suspension kinematics",
      "Adjustable wheel size via flip-chip",
      "Internal downtube storage on latest carbon generation",
      "Threaded bottom bracket and generous tire clearance",
    ],
    officialWebsite: "https://www.ibiscycles.com",
    image:
      "https://ibiscycles.imgix.net/images/Bikes/Ripmo-V3/Builder-MY26/ripmo-v3-my26-olive-xtdi2.jpg?fit=max&q=100&w=2400&s=6db2fa41298ba2e446941b3b335ea285",
    images: [
      "https://ibiscycles.imgix.net/images/Bikes/Ripmo-V3/Builder-MY26/ripmo-v3-my26-olive-xtdi2.jpg?fit=max&q=100&w=2400&s=6db2fa41298ba2e446941b3b335ea285",
    ],
    gallery: [
      "https://ibiscycles.imgix.net/images/Bikes/Ripmo-V3/Builder-MY26/ripmo-v3-my26-olive-xtdi2.jpg?fit=max&q=100&w=2400&s=6db2fa41298ba2e446941b3b335ea285",
    ],
    imageSource: "Ibis Cycles Official Imgix CDN",
    imageVerified: true,
    featured: true,
  },
  {
    id: "tr-3",
    slug: "giant-trance-x",
    name: "Giant Trance X",
    brand: "Giant",
    manufacturer: "Giant Bicycles",
    categorySlug: "trail",
    categoryName: "Trail & All-Mountain Bikes",
    shortDescription:
      "Maestro-equipped trail bike with multi-position flip-chip geometry and mixed-wheel compatibility.",
    description:
      "The Giant Trance X delivers balanced trail performance via Giant's Maestro floating-pivot suspension. Available in Advanced-grade Composite carbon or ALUXX SL aluminum, its flip-chip system adjusts geometry and allows conversion between 29-inch and mullet wheel setups.",
    intendedRidingStyle: "Trail / All-Mountain",
    frameMaterial: "Advanced-Grade Composite (Carbon) or ALUXX SL Aluminum",
    wheelSize: '29" (convertible to Mixed Mullet 27.5" rear via flip-chip)',
    suspensionTravel: "140 mm Rear / 150 mm Front",
    suspensionType: "Full Suspension (Maestro)",
    keyFeatures: [
      "Maestro dual-link rear suspension",
      "Three-position flip-chip geometry adjustment",
      "Headset angle adjustability on current generation",
      "Carbon and ALUXX SL aluminum frame options",
    ],
    officialWebsite: "https://www.giant-bicycles.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2021/12/2022-Giant-Trance-X-58bfe3a.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2021/12/2022-Giant-Trance-X-58bfe3a.jpg?w=1200",
      "https://static.giant-bicycles.com/Images/PageBuilder/PageElements/trancex_thumb_1712277063.jpg",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2021/12/2022-Giant-Trance-X-58bfe3a.jpg?w=1200",
      "https://static.giant-bicycles.com/Images/PageBuilder/PageElements/trancex_thumb_1712277063.jpg",
    ],
    imageSource: "BikeRadar & Giant Bicycles Official Media",
    imageVerified: true,
  },
  {
    id: "tr-4",
    slug: "trek-fuel-ex",
    name: "Trek Fuel EX",
    brand: "Trek",
    manufacturer: "Trek",
    categorySlug: "trail",
    categoryName: "Trail & All-Mountain Bikes",
    shortDescription:
      "Adaptable singletrack trail bike with Active Braking Pivot and deep geometry customization.",
    description:
      "The Trek Fuel EX is built as a true all-round trail bike with 140 mm rear and 150 mm front travel. Offering both Alpha Platinum Aluminum and OCLV Mountain Carbon frames, it features angle-adjust headset cups, Mino Link geometry adjustment, and internal frame storage.",
    intendedRidingStyle: "Trail / All-Mountain",
    frameMaterial: "Alpha Platinum Aluminum or Carbon",
    wheelSize: '29" (27.5" on XS/S; modular Mixed Mullet compatible)',
    suspensionTravel: "140 mm Rear / 150 mm Front",
    suspensionType: "Full Suspension (ABP)",
    keyFeatures: [
      "Active Braking Pivot (ABP) rear suspension",
      "Mino Link geometry & leverage rate adjustment",
      "Internal downtube frame storage",
      "Modular compatibility for mixed-wheel setups",
    ],
    officialWebsite: "https://www.trekbikes.com",
    image:
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/FuelEX99X0AXS-27-79595-C-Primary",
    images: [
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/FuelEX99X0AXS-27-79595-C-Primary",
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/FuelEX98XTDI2-27-79594-B-Primary",
    ],
    gallery: [
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/FuelEX99X0AXS-27-79595-C-Primary",
      "https://media.trekbikes.com/image/upload/c_pad,w_1360,h_1020,f_jpg,fl_progressive:semi,q_auto,fl_strip_profile/FuelEX98XTDI2-27-79594-B-Primary",
    ],
    imageSource: "Trek Bikes Official Media",
    imageVerified: true,
  },
  {
    id: "tr-5",
    slug: "canyon-spectral",
    name: "Canyon Spectral",
    brand: "Canyon",
    manufacturer: "Canyon",
    categorySlug: "trail",
    categoryName: "Trail & All-Mountain Bikes",
    shortDescription:
      "Playful, high-value trail bike offered in carbon or alloy with versatile wheel configurations.",
    description:
      "The Canyon Spectral is designed for riders who want confident descending capability alongside nimble everyday trail manners. Available in Carbon (CF) and Aluminum (AL) builds with full 29-inch, 27.5-inch, or mixed-wheel configurations depending on model tier.",
    intendedRidingStyle: "Trail / All-Mountain",
    frameMaterial: "Carbon (CF) or Aluminum (AL)",
    wheelSize: '29", 27.5", or Mixed (Mullet) depending on configuration',
    suspensionTravel: "140 mm–150 mm Rear / 150 mm–160 mm Front",
    suspensionType: "Full Suspension (Triple Phase 4-Bar)",
    keyFeatures: [
      "Triple Phase suspension kinematics",
      "Keep It Stable (K.I.S.) steering stabilizer on select models",
      "Internal frame storage compartment on CF models",
      "Multiple wheel and frame material configurations",
    ],
    officialWebsite: "https://www.canyon.com",
    image:
      "https://dma.canyon.com/image/upload/w_1199,c_fill/f_auto/q_auto/2026_Launch_Product_Spectral_Web_Family_01_3840x1660_ALL_ghefj0",
    images: [
      "https://dma.canyon.com/image/upload/w_1199,c_fill/f_auto/q_auto/2026_Launch_Product_Spectral_Web_Family_01_3840x1660_ALL_ghefj0",
      "https://dma.canyon.com/image/upload/w_854,h_854,c_fill/f_auto/q_auto/2026_Launch_Product_Spectral_Web_Family_02_2400x2400_ALL_kd7zkj",
    ],
    gallery: [
      "https://dma.canyon.com/image/upload/w_1199,c_fill/f_auto/q_auto/2026_Launch_Product_Spectral_Web_Family_01_3840x1660_ALL_ghefj0",
      "https://dma.canyon.com/image/upload/w_854,h_854,c_fill/f_auto/q_auto/2026_Launch_Product_Spectral_Web_Family_02_2400x2400_ALL_kd7zkj",
    ],
    imageSource: "Canyon Official Media CDN",
    imageVerified: true,
  },

  // ============================================================================
  // CATEGORY 4: DOWNHILL & FREERIDE BIKES
  // ============================================================================
  {
    id: "dh-1",
    slug: "santa-cruz-v10",
    name: "Santa Cruz V10",
    brand: "Santa Cruz",
    manufacturer: "Santa Cruz Bicycles",
    categorySlug: "downhill",
    categoryName: "Downhill & Freeride Bikes",
    shortDescription:
      "World Cup downhill icon with 208 mm of VPP rear travel and multi-point geometry tuning.",
    description:
      "The Santa Cruz V10 is one of the most decorated downhill race bikes in mountain biking history. Built with a Carbon CC frame, 208 mm of VPP rear suspension, and dual-crown fork compatibility, it is engineered for World Cup tracks and steep bike-park terrain.",
    intendedRidingStyle: "Downhill Racing / Bike Park",
    frameMaterial: "Carbon CC (Carbon Fiber)",
    wheelSize: 'MX (29" Front / 27.5" Rear) or Full 29" depending on size',
    suspensionTravel: "208 mm Rear / 200 mm–203 mm Front",
    suspensionType: "Full Suspension (VPP Downhill)",
    keyFeatures: [
      "208 mm VPP downhill suspension platform",
      "Carbon CC lightweight and high-strength chassis",
      "Adjustable rear axle and reach/head-angle cups",
      "Three-position lower-link flip chip",
    ],
    officialWebsite: "https://www.santacruzbicycles.com",
    image:
      "https://www.santacruzbicycles.com/cdn/shop/files/MY27_V10_blue_angled_6f87353d-c75f-4f7f-9dd1-35da7560ecf4.png?v=1773856975&width=2380",
    images: [
      "https://www.santacruzbicycles.com/cdn/shop/files/MY27_V10_blue_angled_6f87353d-c75f-4f7f-9dd1-35da7560ecf4.png?v=1773856975&width=2380",
      "https://www.santacruzbicycles.com/cdn/shop/files/MY27_V10_kelp_angled.png?v=1771445131&width=2380",
    ],
    gallery: [
      "https://www.santacruzbicycles.com/cdn/shop/files/MY27_V10_blue_angled_6f87353d-c75f-4f7f-9dd1-35da7560ecf4.png?v=1773856975&width=2380",
      "https://www.santacruzbicycles.com/cdn/shop/files/MY27_V10_kelp_angled.png?v=1771445131&width=2380",
    ],
    imageSource: "Santa Cruz Bicycles Official CDN",
    imageVerified: true,
    featured: true,
  },
  {
    id: "dh-2",
    slug: "trek-session",
    name: "Trek Session",
    brand: "Trek",
    manufacturer: "Trek",
    categorySlug: "downhill",
    categoryName: "Downhill & Freeride Bikes",
    shortDescription:
      "High-pivot aluminum downhill race rig engineered for speed, traction, and bike-park durability.",
    description:
      "The Trek Session utilizes a high-pivot suspension layout with an idler pulley and 200 mm of travel front and rear. Built from Alpha Platinum Aluminum with adjustable Mino Link geometry and wheel-size versatility, it excels across brutal rock gardens and high-speed berms.",
    intendedRidingStyle: "Downhill Racing / Freeride",
    frameMaterial: "Alpha Platinum Aluminum",
    wheelSize: '29" stock (compatible with Mixed Mullet or 27.5")',
    suspensionTravel: "200 mm Rear / 200 mm Front",
    suspensionType: "Full Suspension (High-Pivot ABP)",
    keyFeatures: [
      "High-pivot suspension with upper idler pulley",
      "Mino Link progression and geometry adjustment",
      "Alpha Platinum Aluminum race-tuned chassis",
      "Compatible with 29-inch, mixed, or 27.5-inch wheel setups",
    ],
    officialWebsite: "https://www.trekbikes.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2019/03/trek-session8-01-1531843104839-kvsmzdpf2hct-a58c6c7.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2019/03/trek-session8-01-1531843104839-kvsmzdpf2hct-a58c6c7.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2019/03/trek-session8-02-1531843104839-13mmqnxwbedxp-ec76f33.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2019/03/trek-session8-01-1531843104839-kvsmzdpf2hct-a58c6c7.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2019/03/trek-session8-02-1531843104839-13mmqnxwbedxp-ec76f33.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Trek Session Review)",
    imageVerified: true,
  },
  {
    id: "dh-3",
    slug: "giant-glory-advanced",
    name: "Giant Glory Advanced",
    brand: "Giant",
    manufacturer: "Giant Bicycles",
    categorySlug: "downhill",
    categoryName: "Downhill & Freeride Bikes",
    shortDescription:
      "Full-carbon Maestro downhill bike featuring 200 mm rear travel and three flip-chip adjustments.",
    description:
      "The Giant Glory Advanced pairs a full Advanced-grade Composite carbon frame with 200 mm of Maestro rear suspension and a 203 mm dual-crown fork. Built with stock mullet wheels convertible to full 29-inch, it lets riders dial head angle, wheelbase, and bottom-bracket height.",
    intendedRidingStyle: "Downhill Racing / Gravity",
    frameMaterial: "Advanced-Grade Composite (Full Carbon)",
    wheelSize: 'Mixed Mullet (29" Front / 27.5" Rear; convertible to 29")',
    suspensionTravel: "200 mm Rear / 203 mm Front",
    suspensionType: "Full Suspension (Maestro)",
    keyFeatures: [
      "Full-carbon front and rear triangle",
      "Maestro 200 mm coil/air-compatible rear suspension",
      "Three flip-chip adjustment points (headset, Maestro, dropout)",
      "Convertible between mullet and full 29-inch rear wheel",
    ],
    officialWebsite: "https://www.giant-bicycles.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Giant-Glory-Advanced-84034d4.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Giant-Glory-Advanced-84034d4.jpg?w=1200",
      "https://static.giant-bicycles.com/Images/PageBuilder/PageElements/lp_glory_adv_thumb_1685568445.jpg",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Giant-Glory-Advanced-84034d4.jpg?w=1200",
      "https://static.giant-bicycles.com/Images/PageBuilder/PageElements/lp_glory_adv_thumb_1685568445.jpg",
    ],
    imageSource: "BikeRadar & Giant Bicycles Official Media",
    imageVerified: true,
  },
  {
    id: "dh-4",
    slug: "canyon-sender",
    name: "Canyon Sender",
    brand: "Canyon",
    manufacturer: "Canyon",
    categorySlug: "downhill",
    categoryName: "Downhill & Freeride Bikes",
    shortDescription:
      "CFR carbon downhill race machine built for steep tracks, big drops, and World Cup speed.",
    description:
      "The Canyon Sender CFR brings 200 mm of rear and front suspension travel to a high-strength CFR carbon frame. Engineered for World Cup downhill racing and aggressive bike-park riding, it offers sharp control and stability at terminal velocity.",
    intendedRidingStyle: "Downhill Racing / Freeride",
    frameMaterial: "CFR Carbon",
    wheelSize: 'Mixed Mullet (29" Front / 27.5" Rear) or 29" options',
    suspensionTravel: "200 mm Rear / 200 mm Front",
    suspensionType: "Full Suspension (Triple Phase DH)",
    keyFeatures: [
      "CFR carbon downhill chassis",
      "Adjustable reach and chainstay length",
      "200 mm dual-crown front and rear travel",
      "Low center of gravity shock placement",
    ],
    officialWebsite: "https://www.canyon.com",
    image:
      "https://dma.canyon.com/image/upload/w_1199/f_auto/q_auto/2025_Launch_Product_Sender_Web_Family_01_3840x1660_ALL_hhquc9",
    images: [
      "https://dma.canyon.com/image/upload/w_1199/f_auto/q_auto/2025_Launch_Product_Sender_Web_Family_01_3840x1660_ALL_hhquc9",
      "https://dma.canyon.com/image/upload/h_350,c_fit/f_auto/q_auto/2025_Launch_Product_Sender_Web_Nav_01_1165x700_ALL_lmfn94",
    ],
    gallery: [
      "https://dma.canyon.com/image/upload/w_1199/f_auto/q_auto/2025_Launch_Product_Sender_Web_Family_01_3840x1660_ALL_hhquc9",
      "https://dma.canyon.com/image/upload/h_350,c_fit/f_auto/q_auto/2025_Launch_Product_Sender_Web_Nav_01_1165x700_ALL_lmfn94",
    ],
    imageSource: "Canyon Official Media CDN",
    imageVerified: true,
  },
  {
    id: "dh-5",
    slug: "commencal-supreme-dh",
    name: "Commencal Supreme DH",
    brand: "Commencal",
    manufacturer: "Commencal",
    categorySlug: "downhill",
    categoryName: "Downhill & Freeride Bikes",
    shortDescription:
      "220 mm high-pivot aluminum downhill powerhouse proven at the highest level of World Cup racing.",
    description:
      "The Commencal Supreme DH V5 utilizes an aluminum 6066-T4/T6 frame with a 6-bar High Virtual Pivot suspension system delivering 220 mm of rear travel. Built on a mixed mullet wheel platform, it is purpose-built for maximum traction and composure on the roughest downhill tracks.",
    intendedRidingStyle: "Downhill Racing",
    frameMaterial: "Aluminum (AL 6066-T4, T6 Triple-Butted)",
    wheelSize: 'Mixed Mullet (29" Front / 27.5" Rear)',
    suspensionTravel: "220 mm Rear / 200 mm–203 mm Front",
    suspensionType: "Full Suspension (High Virtual Pivot 6-Bar)",
    keyFeatures: [
      "High Virtual Pivot 6-bar suspension architecture",
      "220 mm rear wheel travel",
      "Interchangeable bridge inserts for frame stiffness tuning",
      "Triple-butted 6066 alloy construction",
    ],
    officialWebsite: "https://www.commencal.com",
    image:
      "https://www.commencal.com/on/demandware.static/-/Sites-commencal-master/default/dwaef80eda/images/BT5SUPV5SGEU1.jpg",
    images: [
      "https://www.commencal.com/on/demandware.static/-/Sites-commencal-master/default/dwaef80eda/images/BT5SUPV5SGEU1.jpg",
    ],
    gallery: [
      "https://www.commencal.com/on/demandware.static/-/Sites-commencal-master/default/dwaef80eda/images/BT5SUPV5SGEU1.jpg",
    ],
    imageSource: "Commencal Official Product CDN",
    imageVerified: true,
  },

  // ============================================================================
  // CATEGORY 5: HARDTAIL MOUNTAIN BIKES
  // ============================================================================
  {
    id: "ht-1",
    slug: "specialized-chisel",
    name: "Specialized Chisel",
    brand: "Specialized",
    manufacturer: "Specialized",
    categorySlug: "hardtail",
    categoryName: "Hardtail Mountain Bikes",
    shortDescription:
      "Ultralight D'Aluisio Smartweld M5 alloy hardtail built for snappy climbing and fast trail speed.",
    description:
      "The Specialized Chisel Hardtail uses Specialized's D'Aluisio Smartweld M5 aluminum welding technology to minimize frame weight while preserving torsional stiffness. Paired with a 100 mm suspension fork (80 mm on XS) and 29-inch wheels, it offers crisp efficiency for XC and fast trail riding.",
    intendedRidingStyle: "Cross-Country / Fast Trail",
    frameMaterial: "Aluminum (D'Aluisio Smartweld M5 Alloy)",
    wheelSize: '29"',
    suspensionTravel: "100 mm Front (80 mm on XS)",
    suspensionType: "Hardtail (Front Suspension)",
    keyFeatures: [
      "D'Aluisio Smartweld M5 hydroformed alloy frame",
      "Dropper seatpost compatibility (30.9 mm)",
      "Threaded bottom bracket and internal routing",
      "29-inch race-oriented geometry",
    ],
    officialWebsite: "https://www.specialized.com",
    image:
      "https://resources.specialized.com/image/91725-52_CHISEL-HT-GLOSS-MAROON---WHITE_HERO-SQUARE?bg=f1f1f1&w=1400&h=1280&q=75&fm=webp",
    images: [
      "https://resources.specialized.com/image/91725-52_CHISEL-HT-GLOSS-MAROON---WHITE_HERO-SQUARE?bg=f1f1f1&w=1400&h=1280&q=75&fm=webp",
      "https://resources.specialized.com/images/b451zfdu/production/347433d504c977bcf3da6e7b4af3ef3f03f95375-1080x1080.webp?q=75&w=800&fit=fill&crop=focalpoint",
    ],
    gallery: [
      "https://resources.specialized.com/image/91725-52_CHISEL-HT-GLOSS-MAROON---WHITE_HERO-SQUARE?bg=f1f1f1&w=1400&h=1280&q=75&fm=webp",
      "https://resources.specialized.com/images/b451zfdu/production/347433d504c977bcf3da6e7b4af3ef3f03f95375-1080x1080.webp?q=75&w=800&fit=fill&crop=focalpoint",
    ],
    imageSource: "Specialized Official Product CDN",
    imageVerified: true,
  },
  {
    id: "ht-2",
    slug: "trek-roscoe",
    name: "Trek Roscoe",
    brand: "Trek",
    manufacturer: "Trek",
    categorySlug: "hardtail",
    categoryName: "Hardtail Mountain Bikes",
    shortDescription:
      "Playful, trail-ready hardtail with slack geometry, 140 mm–150 mm fork, and wide trail tires.",
    description:
      "The Trek Roscoe is built for riders who want a capable, low-maintenance trail hardtail. Featuring an Alpha Platinum Aluminum frame, slack head angle, long-travel fork (140 mm–150 mm depending on model year), and high-volume tires, it handles roots, jumps, and technical singletrack with ease.",
    intendedRidingStyle: "Aggressive Trail Hardtail",
    frameMaterial: "Alpha Platinum Aluminum",
    wheelSize: '29" (27.5" on XS size)',
    suspensionTravel: "140 mm–150 mm Front",
    suspensionType: "Hardtail (Front Suspension)",
    keyFeatures: [
      "Progressive slack trail hardtail geometry",
      "High-volume 2.6-inch tire clearance",
      "Dropper seatpost equipped across builds",
      "Boost 148 rear axle spacing",
    ],
    officialWebsite: "https://www.trekbikes.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2021/11/Trek-Roscoe-7-01-be3d970.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2021/11/Trek-Roscoe-7-01-be3d970.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2021/11/Trek-Roscoe-7-12-200e882.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2021/11/Trek-Roscoe-7-01-be3d970.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2021/11/Trek-Roscoe-7-12-200e882.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Trek Roscoe Review)",
    imageVerified: true,
  },
  {
    id: "ht-3",
    slug: "giant-fathom",
    name: "Giant Fathom",
    brand: "Giant",
    manufacturer: "Giant Bicycles",
    categorySlug: "hardtail",
    categoryName: "Hardtail Mountain Bikes",
    shortDescription:
      "Responsive ALUXX SL aluminum trail hardtail built around a 130 mm fork and balanced geometry.",
    description:
      "The Giant Fathom pairs a lightweight ALUXX SL-Grade aluminum hardtail chassis with a 130 mm suspension fork and dropper seatpost. Offered in 29-inch or 27.5-inch wheel options, it delivers crisp power transfer on climbs and steady handling on flowing singletrack.",
    intendedRidingStyle: "Trail / All-Day Singletrack",
    frameMaterial: "Aluminum (ALUXX SL-Grade)",
    wheelSize: '29" or 27.5" (model dependent)',
    suspensionTravel: "130 mm Front",
    suspensionType: "Hardtail (Front Suspension)",
    keyFeatures: [
      "ALUXX SL-Grade lightweight aluminum frame",
      "130 mm trail suspension fork",
      "Tubeless-ready wide rim wheelset",
      "Internal cable routing with dropper post",
    ],
    officialWebsite: "https://www.giant-bicycles.com",
    image:
      "https://cdn.media.amplience.net/i/giantgroup/MY25-Fathom-29_Color-A-Asphalt-Green?qlt=80&fmt=auto&sm=c&scaleFit=poi&w=1404&poi=0.5%2C0.5%2C0%2C0",
    images: [
      "https://cdn.media.amplience.net/i/giantgroup/MY25-Fathom-29_Color-A-Asphalt-Green?qlt=80&fmt=auto&sm=c&scaleFit=poi&w=1404&poi=0.5%2C0.5%2C0%2C0",
    ],
    gallery: [
      "https://cdn.media.amplience.net/i/giantgroup/MY25-Fathom-29_Color-A-Asphalt-Green?qlt=80&fmt=auto&sm=c&scaleFit=poi&w=1404&poi=0.5%2C0.5%2C0%2C0",
    ],
    imageSource: "Giant Bicycles Official Amplience CDN",
    imageVerified: true,
  },
  {
    id: "ht-4",
    slug: "orbea-laufey",
    name: "Orbea Laufey",
    brand: "Orbea",
    manufacturer: "Orbea",
    categorySlug: "hardtail",
    categoryName: "Hardtail Mountain Bikes",
    shortDescription:
      "Fun-first 140 mm trail hardtail crafted from triple-butted alloy with LOCKR frame storage.",
    description:
      "The Orbea Laufey is designed around pure trail fun, combining a triple-butted AL6061 aluminum frame with a 140 mm fork and 29-inch wheels. Its slack head angle, steep seat angle, and integrated LOCKR downtube storage make it a standout modern trail hardtail.",
    intendedRidingStyle: "Trail / All-Mountain Hardtail",
    frameMaterial: "Aluminum (Triple-Butted AL6061)",
    wheelSize: '29"',
    suspensionTravel: "140 mm Front",
    suspensionType: "Hardtail (Front Suspension)",
    keyFeatures: [
      "Triple-butted hydroformed AL6061 alloy frame",
      "LOCKR integrated downtube storage",
      "140 mm fork paired with slack trail geometry",
      "Clearance for wide 2.6-inch trail tires",
    ],
    officialWebsite: "https://www.orbea.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Orbea-laufey-2024-Large1-628b10a.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Orbea-laufey-2024-Large1-628b10a.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/10/Orbea-laufey-2024-Large1-628b10a.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Orbea Laufey)",
    imageVerified: true,
    featured: true,
  },
  {
    id: "ht-5",
    slug: "santa-cruz-chameleon",
    name: "Santa Cruz Chameleon",
    brand: "Santa Cruz",
    manufacturer: "Santa Cruz Bicycles",
    categorySlug: "hardtail",
    categoryName: "Hardtail Mountain Bikes",
    shortDescription:
      "Adaptable alloy hardtail with interchangeable dropouts supporting 29-inch, mullet, or singlespeed setups.",
    description:
      "True to its name, the Santa Cruz Chameleon adapts from backcountry bikepacking rigs to aggressive trail and jump setups. Its aluminum frame uses interchangeable dropouts to support 29-inch or mixed mullet wheels, geared or singlespeed drivetrains, and a 130 mm fork.",
    intendedRidingStyle: "Trail / Bikepacking / Pump & Jumps",
    frameMaterial: "Aluminum",
    wheelSize: '29" or Mixed Mullet (29" Front / 27.5" Rear) via dropouts',
    suspensionTravel: "130 mm Front",
    suspensionType: "Hardtail (Front Suspension)",
    keyFeatures: [
      "Interchangeable dropouts for 29-inch or MX mullet wheels",
      "Geared or singlespeed compatible",
      "Triple-bolt cargo cage mount under downtube",
      "Threaded bottom bracket and low standover",
    ],
    officialWebsite: "https://www.santacruzbicycles.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2022/04/Santa-Cruz-Chameleon-02-eaf093a.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2022/04/Santa-Cruz-Chameleon-02-eaf093a.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2022/04/Santa-Cruz-Chameleon-01-1f1161e.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2022/04/Santa-Cruz-Chameleon-02-eaf093a.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2022/04/Santa-Cruz-Chameleon-01-1f1161e.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Santa Cruz Chameleon Review)",
    imageVerified: true,
  },

  // ============================================================================
  // CATEGORY 6: CROSS-COUNTRY (XC) MOUNTAIN BIKES
  // ============================================================================
  {
    id: "xc-1",
    slug: "specialized-epic-8",
    name: "Specialized Epic 8",
    brand: "Specialized",
    manufacturer: "Specialized",
    categorySlug: "cross-country",
    categoryName: "Cross-Country (XC) Mountain Bikes",
    shortDescription:
      "120 mm modern XC race bike balancing ultralight FACT carbon efficiency with technical capability.",
    description:
      "The Specialized Epic 8 elevates cross-country racing with 120 mm of front and rear travel on a FACT 11m or FACT 12m carbon chassis. Engineered to tackle modern technical World Cup XC courses, it pairs rapid climbing stiffness with confident descending poise.",
    intendedRidingStyle: "Cross-Country (XC) Racing / Marathon",
    frameMaterial: "Carbon (FACT 11m or FACT 12m)",
    wheelSize: '29"',
    suspensionTravel: "120 mm Rear / 120 mm Front",
    suspensionType: "Full Suspension (XC Flex-Stay)",
    keyFeatures: [
      "120 mm modern XC race suspension",
      "FACT 11m / 12m high-modulus carbon frame",
      "SWAT 4.0 downtube storage integration",
      "Flip-chip head angle and BB height adjustment",
    ],
    officialWebsite: "https://www.specialized.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2024/07/Specialized-Epic-8-Pro-pack.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2024/07/Specialized-Epic-8-Pro-pack.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2024/07/Specialized-Epic-8-Pro-pack.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Specialized Epic 8 Pro Review)",
    imageVerified: true,
    featured: true,
  },
  {
    id: "xc-2",
    slug: "cannondale-scalpel",
    name: "Cannondale Scalpel",
    brand: "Cannondale",
    manufacturer: "Cannondale",
    categorySlug: "cross-country",
    categoryName: "Cross-Country (XC) Mountain Bikes",
    shortDescription:
      "FlexPivot 120 mm XC race bike engineered for razor-sharp handling and sustained speed.",
    description:
      "The Cannondale Scalpel utilizes Cannondale's patented FlexPivot carbon chainstay design to achieve 120 mm of active four-bar suspension performance without heavy rear pivot bearings. Built on a 29-inch carbon chassis, it excels in both XC sprints and endurance marathon racing.",
    intendedRidingStyle: "Cross-Country (XC) Racing / Endurance",
    frameMaterial: "Carbon (Series 1 / Hi-MOD Carbon)",
    wheelSize: '29"',
    suspensionTravel: "120 mm Rear / 120 mm Front",
    suspensionType: "Full Suspension (FlexPivot)",
    keyFeatures: [
      "Patented FlexPivot carbon flex-zone suspension",
      "Proportional Response size-specific kinematics",
      "120 mm travel tuned for technical XC courses",
      "29-inch lightweight carbon chassis",
    ],
    officialWebsite: "https://www.cannondale.com",
    image:
      "https://d1mo5ln9tjltxq.cloudfront.net/-/media/images/my25/bikes/mountain/cross-country/scalpel-updates/collection/cy25_scalpel_d3_2.ashx?mh=2560&mw=1920&hash=DD92C6BFDC87901704BF72568584F30B",
    images: [
      "https://d1mo5ln9tjltxq.cloudfront.net/-/media/images/my25/bikes/mountain/cross-country/scalpel-updates/collection/cy25_scalpel_d3_2.ashx?mh=2560&mw=1920&hash=DD92C6BFDC87901704BF72568584F30B",
      "https://d1mo5ln9tjltxq.cloudfront.net/-/media/images/my25/bikes/mountain/cross-country/scalpel-updates/collection/cy25_scalpel_d3_1.ashx?mh=2560&mw=1920&hash=264EFF1B68B7EB3276536C9CAC37D7EC",
    ],
    gallery: [
      "https://d1mo5ln9tjltxq.cloudfront.net/-/media/images/my25/bikes/mountain/cross-country/scalpel-updates/collection/cy25_scalpel_d3_2.ashx?mh=2560&mw=1920&hash=DD92C6BFDC87901704BF72568584F30B",
      "https://d1mo5ln9tjltxq.cloudfront.net/-/media/images/my25/bikes/mountain/cross-country/scalpel-updates/collection/cy25_scalpel_d3_1.ashx?mh=2560&mw=1920&hash=264EFF1B68B7EB3276536C9CAC37D7EC",
    ],
    imageSource: "Cannondale Official CDN",
    imageVerified: true,
  },
  {
    id: "xc-3",
    slug: "scott-spark-rc",
    name: "Scott Spark RC",
    brand: "Scott",
    manufacturer: "Scott Sports",
    categorySlug: "cross-country",
    categoryName: "Cross-Country (XC) Mountain Bikes",
    shortDescription:
      "World-champion XC race machine featuring an integrated internal rear shock and TwinLoc control.",
    description:
      "The Scott Spark RC conceals its rear shock inside the carbon frame for low center-of-gravity stiffness and clean aerodynamics. Paired with 120 mm front and rear travel and Scott's TwinLoc suspension remote, riders can shift instantly between Climb, Traction Control, and Descend modes.",
    intendedRidingStyle: "Cross-Country (XC) Racing",
    frameMaterial: "Carbon (HMX-SL, HMX, or HMF)",
    wheelSize: '29"',
    suspensionTravel: "120 mm Rear / 120 mm Front",
    suspensionType: "Full Suspension (Integrated Shock)",
    keyFeatures: [
      "Patented Integrated Suspension Technology (internal shock)",
      "TwinLoc 3-mode handlebar suspension remote",
      "Adjustable head angle cups",
      "Available in HMF, HMX, and ultralight HMX-SL carbon",
    ],
    officialWebsite: "https://www.scott-sports.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2026/06/Scott-Spark-descending-1.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2026/06/Scott-Spark-descending-1.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2026/06/Scott-Spark-descending-1.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Scott Spark RC Review)",
    imageVerified: true,
  },
  {
    id: "xc-4",
    slug: "trek-supercaliber",
    name: "Trek Supercaliber",
    brand: "Trek",
    manufacturer: "Trek",
    categorySlug: "cross-country",
    categoryName: "Cross-Country (XC) Mountain Bikes",
    shortDescription:
      "Ultralight IsoStrut XC race bike bridging hardtail pedaling snap with 80 mm rear compliance.",
    description:
      "The Gen 2 Trek Supercaliber pairs an OCLV Mountain Carbon frame with Trek's structural IsoStrut rear shock delivering 80 mm of rear travel alongside a 110 mm fork. It gives XC racers hardtail-like sprinting efficiency while smoothing chatter on rough climbs and descents.",
    intendedRidingStyle: "Cross-Country (XC) Racing",
    frameMaterial: "Carbon (OCLV Mountain Carbon SL or SLR)",
    wheelSize: '29"',
    suspensionTravel: "80 mm Rear (IsoStrut) / 110 mm Front",
    suspensionType: "Full Suspension (IsoStrut)",
    keyFeatures: [
      "Integrated structural IsoStrut rear shock",
      "Pivotless seatstays for reduced frame weight",
      "SL and ultralight SLR OCLV carbon options",
      "29-inch race geometry",
    ],
    officialWebsite: "https://www.trekbikes.com",
    image:
      "https://c02.purpledshub.com/uploads/sites/39/2023/12/Trek-Supercaliber-SLR-9.9-Supercaliber-57b352a.jpg?w=1200",
    images: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/12/Trek-Supercaliber-SLR-9.9-Supercaliber-57b352a.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2023/12/Trek-Supercaliber-SLR-9.9-Main-pivot-41e3d78.jpg?w=1200",
    ],
    gallery: [
      "https://c02.purpledshub.com/uploads/sites/39/2023/12/Trek-Supercaliber-SLR-9.9-Supercaliber-57b352a.jpg?w=1200",
      "https://c02.purpledshub.com/uploads/sites/39/2023/12/Trek-Supercaliber-SLR-9.9-Main-pivot-41e3d78.jpg?w=1200",
    ],
    imageSource: "BikeRadar (Trek Supercaliber Gen 2 Review)",
    imageVerified: true,
  },
  {
    id: "xc-5",
    slug: "yeti-asr",
    name: "Yeti ASR",
    brand: "Yeti",
    manufacturer: "Yeti Cycles",
    categorySlug: "cross-country",
    categoryName: "Cross-Country (XC) Mountain Bikes",
    shortDescription:
      "Featherweight TURQ carbon XC race weapon with 115 mm rear flex-stay suspension.",
    description:
      "The Yeti ASR marks Yeti Cycles' return to pure cross-country racing with a TURQ Series high-modulus carbon frame, 115 mm rear travel via flex-stay kinematics, and a 120 mm fork. Built around 29-inch wheels, it prioritizes low weight, pedaling speed, and confident descent tracking.",
    intendedRidingStyle: "Cross-Country (XC) Racing / Endurance",
    frameMaterial: "Carbon (TURQ Series)",
    wheelSize: '29"',
    suspensionTravel: "115 mm Rear / 120 mm Front",
    suspensionType: "Full Suspension (Flex-Stay XC)",
    keyFeatures: [
      "TURQ Series ultralight carbon construction",
      "115 mm flex-stay rear suspension",
      "Dual bottle cage clearance inside front triangle",
      "29-inch XC race geometry",
    ],
    officialWebsite: "https://www.yeticycles.com",
    image:
      "https://yeticycles-prod.zaneray.com/cms/images/aOZ6wp5xUNkB1v6Q_ASRPurpleHazeBikePageHeroDesktop.jpg?auto=format%2Ccompress&rect=0%2C45%2C1920%2C1008&w=1200&h=630",
    images: [
      "https://yeticycles-prod.zaneray.com/cms/images/aOZ6wp5xUNkB1v6Q_ASRPurpleHazeBikePageHeroDesktop.jpg?auto=format%2Ccompress&rect=0%2C45%2C1920%2C1008&w=1200&h=630",
      "https://yeticycles-prod.zaneray.com/cms/images/06265f9c-4e50-411a-86f0-9bf41ed010c3_Turq+ASR+Action.jpg?auto=format&q=80&lossless=1&rect=0,0,1920,1080&w=1920&h=1080",
    ],
    gallery: [
      "https://yeticycles-prod.zaneray.com/cms/images/aOZ6wp5xUNkB1v6Q_ASRPurpleHazeBikePageHeroDesktop.jpg?auto=format%2Ccompress&rect=0%2C45%2C1920%2C1008&w=1200&h=630",
      "https://yeticycles-prod.zaneray.com/cms/images/06265f9c-4e50-411a-86f0-9bf41ed010c3_Turq+ASR+Action.jpg?auto=format&q=80&lossless=1&rect=0,0,1920,1080&w=1920&h=1080",
    ],
    imageSource: "Yeti Cycles Official CDN",
    imageVerified: true,
  },
];

export function getBikesByCategory(categorySlug: string): BikeModel[] {
  return BIKES.filter((b) => b.categorySlug === categorySlug);
}

export function getBikeBySlug(slug: string): BikeModel | undefined {
  return BIKES.find((b) => b.slug === slug);
}

export function getFeaturedBikes(): BikeModel[] {
  return BIKES.filter((b) => b.featured);
}
