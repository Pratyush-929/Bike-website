import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed for Terra Cycles MTB...");

  // 1. Seed Company Settings
  console.log("⚙️  Seeding company settings...");
  await prisma.companySetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      brandName: "TERRA CYCLES",
      tagline: "Built for the Trails. Ready for Anything.",
      logoUrl: "/brand-logo.svg",
      companyDescription:
        "Engineered for extreme descents, technical climbs, and rugged alpine trails. Terra Cycles is an authentic mountain bike brand and professional workshop dedicated to uncompromising trail performance.",
      aboutMission:
        "To craft world-class mountain bikes and components that empower riders to conquer the wildest terrain with uncompromising confidence and performance.",
      aboutVision:
        "Pioneering progressive geometry, sustainable manufacturing, and elite trail engineering across the global mountain biking community.",
      aboutPhilosophy:
        "Tested on brutal alpine rock gardens, refined in precision wind tunnels and workshop bays. Every weld, linkage bearing, and suspension tune is dialed for peak trail performance.",
      contactEmail: "trailside@terracycles.com",
      contactPhone: "+1 (541) 555-8724",
      whatsappNumber: "+15415558724",
      physicalAddress: "442 Ridgeback Trail Road, Hood River, OR 97031",
      businessHours:
        "Mon - Fri: 8:30 AM - 6:00 PM | Sat: 9:00 AM - 5:00 PM | Sun: Closed (Out Riding)",
      currencyCode: "USD",
      currencySymbol: "$",
      heroHeadline: "Built for the Trails. Ready for Anything.",
      heroSubheadline:
        "Precision-engineered enduro, trail, and downhill mountain bikes tested on the world's most unforgiving backcountry singletrack.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2000&q=80",
      lowStockThresholdDefault: 3,
      emailNotificationsEnabled: false,
      notificationRecipientEmail: "inquiries@terracycles.com",
    },
  });

  // 2. Seed Admin Users
  console.log("👤 Seeding admin users...");
  const adminPasswordHash = await bcrypt.hash(
    process.env.INITIAL_ADMIN_PASSWORD || "AdminPassword2026!",
    12
  );
  const managerPasswordHash = await bcrypt.hash("ManagerPassword2026!", 12);

  await prisma.user.upsert({
    where: { email: process.env.INITIAL_ADMIN_EMAIL || "admin@terracycles.com" },
    update: {},
    create: {
      name: process.env.INITIAL_ADMIN_NAME || "Chief Trail Officer",
      email: process.env.INITIAL_ADMIN_EMAIL || "admin@terracycles.com",
      passwordHash: adminPasswordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  await prisma.user.upsert({
    where: { email: "manager@terracycles.com" },
    update: {},
    create: {
      name: "Marcus Vance",
      email: "manager@terracycles.com",
      passwordHash: managerPasswordHash,
      role: "MANAGER",
      status: "ACTIVE",
    },
  });

  // 3. Seed Categories
  console.log("📁 Seeding categories...");
  const categoriesData = [
    // BIKES
    {
      name: "Enduro Mountain Bikes",
      slug: "enduro-bikes",
      type: "BIKE",
      description: "Aggressive geometry with 160-180mm travel engineered for steep descents and enduro stages.",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      displayOrder: 1,
    },
    {
      name: "Trail & All-Mountain",
      slug: "trail-bikes",
      type: "BIKE",
      description: "Versatile 130-150mm trail machines dialed for epic all-day backcountry singletrack.",
      imageUrl: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80",
      displayOrder: 2,
    },
    {
      name: "Downhill & Freeride",
      slug: "downhill-bikes",
      type: "BIKE",
      description: "Maximum 200mm dual-crown suspension built for bike parks and World Cup DH tracks.",
      imageUrl: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80",
      displayOrder: 3,
    },
    {
      name: "Hardtail Mountain Bikes",
      slug: "hardtail-bikes",
      type: "BIKE",
      description: "Pure, responsive hardtails engineered for flow trails, bikepacking, and trail riding.",
      imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
      displayOrder: 4,
    },
    {
      name: "Cross-Country (XC)",
      slug: "xc-bikes",
      type: "BIKE",
      description: "Ultralight carbon race rigs for blistering hill climbs and high-speed XC circuits.",
      imageUrl: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=800&q=80",
      displayOrder: 5,
    },
    // SPARE PARTS
    {
      name: "Tires & Tubes",
      slug: "tires-tubes",
      type: "SPARE_PART",
      description: "High-grip tubeless trail, enduro, and downhill casings.",
      imageUrl: "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=800&q=80",
      displayOrder: 6,
    },
    {
      name: "Suspension & Shocks",
      slug: "suspension-shocks",
      type: "SPARE_PART",
      description: "Factory air forks, coil rear shocks, and linkage bearing rebuild kits.",
      imageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
      displayOrder: 7,
    },
    {
      name: "Brakes & Rotors",
      slug: "brakes-rotors",
      type: "SPARE_PART",
      description: "4-piston hydraulic disc brakes, metallic pads, and 203mm/220mm floating rotors.",
      imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
      displayOrder: 8,
    },
    {
      name: "Drivetrains & Pedals",
      slug: "drivetrains-pedals",
      type: "SPARE_PART",
      description: "12-speed cassettes, clutch derailleurs, chains, and CNC alloy flat pedals.",
      imageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80",
      displayOrder: 9,
    },
    {
      name: "Wheels & Hubs",
      slug: "wheels-hubs",
      type: "SPARE_PART",
      description: "Impact-tested carbon and alloy 29\" and 27.5\" enduro wheelsets.",
      imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
      displayOrder: 10,
    },
    // ACCESSORIES
    {
      name: "Helmets & Eyewear",
      slug: "helmets-eyewear",
      type: "ACCESSORY",
      description: "Full-face DH certified helmets, half-shell MIPS helmets, and trail goggles.",
      imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      displayOrder: 11,
    },
    {
      name: "Riding Gear & Gloves",
      slug: "riding-gear-gloves",
      type: "ACCESSORY",
      description: "D3O impact gloves, breathable trail jerseys, and waterproof enduro pants.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      displayOrder: 12,
    },
    {
      name: "Protection & Pads",
      slug: "protection-pads",
      type: "ACCESSORY",
      description: "Ergonomic knee pads, elbow guards, and spine protectors for rowdy terrain.",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
      displayOrder: 13,
    },
    {
      name: "Tools & Hydration",
      slug: "tools-hydration",
      type: "ACCESSORY",
      description: "Trailside multi-tools, high-pressure shock pumps, and hydration packs.",
      imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80",
      displayOrder: 14,
    },
  ];

  const categoryMap = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
  }

  // 4. Seed Bikes
  console.log("🚲 Seeding mountain bikes...");
  const bikes = [
    {
      sku: "TERRA-RDG-CF29",
      name: "Terra Ridgeback Carbon 29",
      slug: "terra-ridgeback-carbon-29",
      brand: "Terra Cycles",
      type: "BIKE",
      categoryId: categoryMap["enduro-bikes"],
      priceInCents: 549900, // $5,499.00
      compareAtPriceInCents: 589900,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      ]),
      shortDescription: "Our flagship 170mm enduro carbon race bike dialed for steep, technical descents and EWS stages.",
      description: "The Terra Ridgeback Carbon 29 is engineered from the ground up for elite enduro racing. Featuring our proprietary High-Pivot linkage with idler pulley, the rear wheel tracks rearward over square-edge hits for maximum momentum. Equipped with Fox 38 Factory Grip2 suspension and SRAM GX Eagle AXS wireless transmission.",
      specifications: JSON.stringify({
        "Frame Material": "Toray T800 High-Modulus Carbon Fiber",
        "Suspension Type": "Full Suspension (High-Pivot Linkage)",
        "Front Travel": "170mm (Fox 38 Factory Float Grip2)",
        "Rear Travel": "165mm (Fox Float X2 Factory)",
        "Wheel Size": "29-inch Front & Rear (Mullet Ready)",
        "Available Sizes": "S (155-168cm), M (168-180cm), L (178-190cm), XL (188-200cm)",
        "Drivetrain": "SRAM GX Eagle Transmission AXS 12-Speed",
        "Brakes": "SRAM Code RSC 4-Piston Hydraulic (200mm Rotors)",
        "Weight": "14.8 kg (Size M without pedals)",
        "Warranty": "Lifetime Frame Warranty, 2 Years Bearings",
      }),
      stock: 8,
      reorderThreshold: 2,
    },
    {
      sku: "TERRA-ALTD-EVO",
      name: "Terra Apex Altitude Trail EVO",
      slug: "terra-apex-altitude-trail-evo",
      brand: "Terra Cycles",
      type: "BIKE",
      categoryId: categoryMap["trail-bikes"],
      priceInCents: 429900, // $4,299.00
      compareAtPriceInCents: null,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
      ]),
      shortDescription: "The definitive 140mm all-mountain trail machine. Climbs with efficiency, descends like a beast.",
      description: "Built for all-day alpine epics, the Apex Altitude combines responsive pedaling kinematics with a progressive 64.5-degree head angle. Whether tackling high alpine passes or ripping down local flow trails, the Altitude responds instantly to every input.",
      specifications: JSON.stringify({
        "Frame Material": "6061-T6 Hydroformed Triple-Butted Aluminum",
        "Suspension Type": "Full Suspension (Horst-Link)",
        "Front Travel": "150mm (RockShox Lyrik Select+)",
        "Rear Travel": "140mm (RockShox Super Deluxe Select+)",
        "Wheel Size": "29-inch",
        "Available Sizes": "S, M, L, XL",
        "Drivetrain": "Shimano XT M8100 1x12-Speed",
        "Brakes": "Shimano XT 4-Piston Hydraulic",
        "Weight": "14.2 kg",
        "Warranty": "5-Year Frame Warranty",
      }),
      stock: 12,
      reorderThreshold: 3,
    },
    {
      sku: "TERRA-GRAV-DH",
      name: "Terra Gravity Sender World Cup DH",
      slug: "terra-gravity-sender-world-cup-dh",
      brand: "Terra Cycles",
      type: "BIKE",
      categoryId: categoryMap["downhill-bikes"],
      priceInCents: 679900, // $6,799.00
      compareAtPriceInCents: 719900,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "LOW_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      ]),
      shortDescription: "World-Cup level 200mm downhill race rig with dual-crown Fox 40 Factory suspension.",
      description: "Designed strictly for speed between the tapes. The Gravity Sender DH delivers 200mm of plush coil-sprung rear travel with an ultra-stiff front triangle to hold lines across rock gardens at 60 km/h.",
      specifications: JSON.stringify({
        "Frame Material": "Carbon UD Main Triangle & CNC Alloy Linkage",
        "Suspension Type": "Full Suspension (DH Virtual Pivot)",
        "Front Travel": "203mm (Fox 40 Factory Float Grip2)",
        "Rear Travel": "200mm (Fox DHX2 Factory Coil)",
        "Wheel Size": "Mullet (29\" Front / 27.5\" Rear)",
        "Available Sizes": "M, L, XL",
        "Drivetrain": "SRAM X01 DH 7-Speed",
        "Brakes": "Magura MT7 Pro 4-Piston (220mm Front / 203mm Rear)",
        "Weight": "16.1 kg",
        "Warranty": "3-Year Race Frame Warranty",
      }),
      stock: 2,
      reorderThreshold: 2,
    },
    {
      sku: "TERRA-NMAD-HT",
      name: "Terra Nomad Trail Hardtail",
      slug: "terra-nomad-trail-hardtail",
      brand: "Terra Cycles",
      type: "BIKE",
      categoryId: categoryMap["hardtail-bikes"],
      priceInCents: 219900, // $2,199.00
      compareAtPriceInCents: null,
      isFeatured: false,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([
        "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1200&q=80",
      ]),
      shortDescription: "Aggressive slack geometry hardtail with 140mm fork. Low maintenance, pure trail fun.",
      description: "For riders who value trail feedback, simplicity, and raw bike handling skills. With a 64-degree head tube angle, short chainstays, and generous tire clearance up to 2.6\", the Nomad makes everyday trails thrilling.",
      specifications: JSON.stringify({
        "Frame Material": "Custom Chromoly 4130 Steel",
        "Suspension Type": "Hardtail",
        "Front Travel": "140mm (Marzocchi Bomber Z2)",
        "Rear Travel": "Rigid",
        "Wheel Size": "29-inch",
        "Available Sizes": "S, M, L, XL",
        "Drivetrain": "Shimano Deore M6100 12-Speed",
        "Brakes": "Shimano Deore 4-Piston Hydraulic",
        "Weight": "13.6 kg",
        "Warranty": "Lifetime Steel Frame Warranty",
      }),
      stock: 15,
      reorderThreshold: 4,
    },
    {
      sku: "TERRA-PODM-XC",
      name: "Terra Podium Carbon XC 100",
      slug: "terra-podium-carbon-xc-100",
      brand: "Terra Cycles",
      type: "BIKE",
      categoryId: categoryMap["xc-bikes"],
      priceInCents: 479900, // $4,799.00
      compareAtPriceInCents: null,
      isFeatured: false,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "Featherweight 100mm carbon cross-country racer designed for explosive climbs and fast circuits.",
      description: "Sub-10kg race weapon built for marathon stages and XC Olympic formats. Dual remote lockout lets you sprint up climbs with zero energy loss.",
      specifications: JSON.stringify({
        "Frame Material": "Ultra-lightweight Hi-Mod Carbon",
        "Suspension Type": "Full Suspension (Flex-Stay XC)",
        "Front Travel": "100mm (RockShox SID SL Ultimate Remote)",
        "Rear Travel": "100mm (RockShox SIDLuxe Ultimate Remote)",
        "Wheel Size": "29-inch",
        "Available Sizes": "S, M, L",
        "Drivetrain": "SRAM GX Eagle Transmission",
        "Brakes": "SRAM Level Silver Stealth 2-Piston",
        "Weight": "9.9 kg",
        "Warranty": "5-Year Frame Warranty",
      }),
      stock: 5,
      reorderThreshold: 2,
    },
  ];

  for (const b of bikes) {
    const { stock, reorderThreshold, ...bikeData } = b;
    const product = await prisma.product.upsert({
      where: { sku: bikeData.sku },
      update: bikeData,
      create: bikeData,
    });

    await prisma.inventoryItem.upsert({
      where: { productId: product.id },
      update: { currentStock: stock, reorderThreshold },
      create: {
        productId: product.id,
        currentStock: stock,
        reorderThreshold,
        supplier: "Terra Factory Assembly Hood River",
        location: "Warehouse Bay A-1",
      },
    });

    await prisma.inventoryMovement.create({
      data: {
        productId: product.id,
        quantityChange: stock,
        resultingStock: stock,
        changeType: "INITIAL",
        reason: "Initial baseline stock configuration",
      },
    });
  }

  // 5. Seed Spare Parts
  console.log("⚙️  Seeding spare parts...");
  const parts = [
    {
      sku: "PRT-MAXX-ASG29",
      name: "Maxxis Assegai 29x2.50 WT 3C MaxxGrip EXO+",
      slug: "maxxis-assegai-29-250-wt",
      brand: "Maxxis",
      type: "SPARE_PART",
      categoryId: categoryMap["tires-tubes"],
      priceInCents: 8900, // $89.00
      compareAtPriceInCents: 9800,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "The benchmark front tire for downhill and aggressive enduro riding in loose-over-hard and loam.",
      description: "Signature tire developed with downhill legend Greg Minnaar. Tall knobs punch through dust and loam to find traction on hardpack and wet roots.",
      specifications: JSON.stringify({
        "Size": "29 x 2.50 WT",
        "Compound": "3C MaxxGrip (Ultimate Trail Traction)",
        "Casing": "EXO+ Puncture Protection",
        "Bead": "Foldable Tubeless Ready",
        "Weight": "1,125g",
        "Compatibility": "30-35mm Internal Rim Widths",
      }),
      stock: 45,
      reorderThreshold: 10,
    },
    {
      sku: "PRT-FOX38-GRIP2",
      name: "Fox 38 Factory Float 29 Grip2 Fork 170mm",
      slug: "fox-38-factory-float-29-grip2-170",
      brand: "Fox Racing Shox",
      type: "SPARE_PART",
      categoryId: categoryMap["suspension-shocks"],
      priceInCents: 124900, // $1,249.00
      compareAtPriceInCents: null,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "The undisputed king of long-travel enduro forks with Genuine Kashima Coat and Grip2 damper.",
      description: "High and low-speed compression, high and low-speed rebound adjusters, floating axle system, and lower leg bleeders. Built specifically for brutal enduro tracks.",
      specifications: JSON.stringify({
        "Travel": "170mm",
        "Wheel Size": "29-inch",
        "Offset": "44mm",
        "Axle": "15x110mm Boost Kabolt-X",
        "Upper Tubes": "38mm Genuine Kashima Coat",
        "Damper": "GRIP2 with VVC (Variable Valve Control)",
      }),
      stock: 6,
      reorderThreshold: 2,
    },
    {
      sku: "PRT-SHIM-XT-PADS",
      name: "Shimano N04C Metal Fin Brake Pads (4-Piston)",
      slug: "shimano-n04c-metal-fin-pads",
      brand: "Shimano",
      type: "SPARE_PART",
      categoryId: categoryMap["brakes-rotors"],
      priceInCents: 3800, // $38.00
      compareAtPriceInCents: null,
      isFeatured: false,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "Sintered metallic brake pads with radiator cooling fins for Shimano 4-piston calipers.",
      description: "Ice-Technologies radiator cooling fins disperse heat rapidly to prevent brake fade on steep 2,000-foot alpine descents.",
      specifications: JSON.stringify({
        "Compound": "Metallic / Sintered",
        "Backing Plate": "Alloy with Radiator Cooling Fins",
        "Compatibility": "Shimano XTR M9120, XT M8120, SLX M7120 4-Piston Calipers",
      }),
      stock: 32,
      reorderThreshold: 8,
    },
    {
      sku: "PRT-SRAM-GX-CHN",
      name: "SRAM GX Eagle Transmission Flattop Chain 126L",
      slug: "sram-gx-eagle-transmission-chain",
      brand: "SRAM",
      type: "SPARE_PART",
      categoryId: categoryMap["drivetrains-pedals"],
      priceInCents: 5200, // $52.00
      compareAtPriceInCents: null,
      isFeatured: false,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "Robust flattop chain engineered specifically for T-Type Eagle transmissions under full motor/rider load.",
      description: "Unique flat top profile maximizes shifting performance and strength across 12-speed Eagle Transmission cassettes.",
      specifications: JSON.stringify({
        "Links": "126 Links with PowerLock T-Type Connector",
        "Finish": "Chrome Hardened Solid Pin",
        "Compatibility": "SRAM Eagle Transmission T-Type Drivetrains Only",
      }),
      stock: 18,
      reorderThreshold: 5,
    },
    {
      sku: "PRT-DT-EX1700-29",
      name: "DT Swiss EX 1700 Spline 30 Enduro Wheelset 29\"",
      slug: "dt-swiss-ex-1700-spline-wheelset",
      brand: "DT Swiss",
      type: "SPARE_PART",
      categoryId: categoryMap["wheels-hubs"],
      priceInCents: 89900, // $899.00
      compareAtPriceInCents: 96900,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "The gold standard in aluminum enduro wheel durability with legendary DT 350 ratchet hubs.",
      description: "Welded aluminum rim profile tested to withstand direct square-edge rim impacts, paired with the Ratchet 36 SL hub system.",
      specifications: JSON.stringify({
        "Internal Width": "30mm",
        "Hub": "DT Swiss 350 Ratchet System 36 SL",
        "Spokes": "DT Competition Straightpull (28 hole)",
        "Brake Mount": "6-Bolt Disc",
        "Freehub Body": "SRAM XD / Shimano Micro Spline",
        "Weight": "1,980g pair",
      }),
      stock: 5,
      reorderThreshold: 2,
    },
  ];

  for (const p of parts) {
    const { stock, reorderThreshold, ...partData } = p;
    const product = await prisma.product.upsert({
      where: { sku: partData.sku },
      update: partData,
      create: partData,
    });

    await prisma.inventoryItem.upsert({
      where: { productId: product.id },
      update: { currentStock: stock, reorderThreshold },
      create: {
        productId: product.id,
        currentStock: stock,
        reorderThreshold,
        supplier: "Pacific Northwest Distributor",
        location: "Parts Aisle B-3",
      },
    });

    await prisma.inventoryMovement.create({
      data: {
        productId: product.id,
        quantityChange: stock,
        resultingStock: stock,
        changeType: "INITIAL",
        reason: "Initial parts stock entry",
      },
    });
  }

  // 6. Seed Accessories
  console.log("🎒 Seeding accessories...");
  const accessories = [
    {
      sku: "ACC-POC-TECTAL",
      name: "POC Tectal Race MIPS Trail Helmet",
      slug: "poc-tectal-race-mips-helmet",
      brand: "POC",
      type: "ACCESSORY",
      categoryId: categoryMap["helmets-eyewear"],
      priceInCents: 23000, // $230.00
      compareAtPriceInCents: 26000,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "Extended coverage trail helmet with integrated MIPS rotational protection and aramid bridge reinforcement.",
      description: "Engineered specifically for aggressive mountain biking. Features exceptional ventilation channels, an integrated goggle clip, and RECCO reflector.",
      specifications: JSON.stringify({
        "Safety Technology": "MIPS Evolve + Aramid Bridge Reinforcement",
        "Certification": "EN 1078, CPSC 12.03, AS/NZS 2063",
        "Weight": "385g (Size M/L)",
        "Available Sizes": "XS/S (51-54cm), M/L (55-58cm), XL/XXL (59-62cm)",
        "Colors": "Uranium Black Matte, Forest Green, Granite Grey",
      }),
      stock: 22,
      reorderThreshold: 5,
    },
    {
      sku: "ACC-FOX-DEFEND-GLV",
      name: "Fox Racing Defend Pro D3O Mountain Bike Gloves",
      slug: "fox-defend-pro-d3o-gloves",
      brand: "Fox Racing",
      type: "ACCESSORY",
      categoryId: categoryMap["riding-gear-gloves"],
      priceInCents: 6500, // $65.00
      compareAtPriceInCents: null,
      isFeatured: false,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "Pro-level gloves with armored D3O knuckle protection and single-layer Clarino palm.",
      description: "Combines flexible Kevlar fabric with D3O impact-absorbing knuckle armor to shield hands from trailside branches and crashes.",
      specifications: JSON.stringify({
        "Knuckle Protection": "D3O Impact Hardening Foam",
        "Palm": "Single-Layer Clarino with Conductive Touchscreen Thread",
        "Cuff": "Compression Molded Neoprene with Hook-and-Loop Closure",
        "Sizes": "S, M, L, XL, XXL",
      }),
      stock: 30,
      reorderThreshold: 6,
    },
    {
      sku: "ACC-EVOC-STAGE12",
      name: "EVOC Stage 12L Technical Trail Backpack with Bladder",
      slug: "evoc-stage-12l-trail-backpack",
      brand: "EVOC",
      type: "ACCESSORY",
      categoryId: categoryMap["tools-hydration"],
      priceInCents: 17500, // $175.00
      compareAtPriceInCents: null,
      isFeatured: true,
      isPublished: true,
      availabilityStatus: "IN_STOCK",
      primaryImageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80",
      additionalImages: JSON.stringify([]),
      shortDescription: "Compact 12-liter enduro day pack with Brace Link shoulder adjustment and 2L HydraPak reservoir.",
      description: "Equipped with Air Flow Contact System for cool back ventilation, quick-access tool compartment, helmet carrier flaps, and emergency whistle.",
      specifications: JSON.stringify({
        "Volume": "12 Liters",
        "Hydration": "Includes 2.0L HydraPak Elite Reservoir with Magnetic Hose Clip",
        "Weight": "850g",
        "Special Features": "Separate Tool Organizer Compartment, XC/Full-Face Helmet Flap",
      }),
      stock: 14,
      reorderThreshold: 4,
    },
  ];

  for (const a of accessories) {
    const { stock, reorderThreshold, ...accData } = a;
    const product = await prisma.product.upsert({
      where: { sku: accData.sku },
      update: accData,
      create: accData,
    });

    await prisma.inventoryItem.upsert({
      where: { productId: product.id },
      update: { currentStock: stock, reorderThreshold },
      create: {
        productId: product.id,
        currentStock: stock,
        reorderThreshold,
        supplier: "Global Outdoor Gear Co.",
        location: "Accessory Shelves C-2",
      },
    });

    await prisma.inventoryMovement.create({
      data: {
        productId: product.id,
        quantityChange: stock,
        resultingStock: stock,
        changeType: "INITIAL",
        reason: "Initial accessory stock",
      },
    });
  }

  // 7. Seed Workshop Services
  console.log("🛠️  Seeding workshop services...");
  const services = [
    {
      name: "Full Suspension Overhaul (Fork & Shock)",
      slug: "full-suspension-overhaul",
      shortDescription: "Complete 200-hour factory rebuild of front suspension fork and rear air or coil damper.",
      description: "Full teardown, ultrasonic cleaning, replacement of all dynamic oil and dust wiper seals, vacuum bleed with genuine Fox/RockShox factory fluids, and nitrogen charge.",
      priceInCents: 28500, // $285.00
      estimatedDuration: "2.5 - 3.5 Hours",
      imageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
      isEnabled: true,
      displayOrder: 1,
    },
    {
      name: "Pro Race Tune & Safety Overhaul",
      slug: "pro-race-tune-safety-overhaul",
      shortDescription: "Comprehensive safety inspection, hydraulic brake bleed, drivetrain ultrasonic clean, and wheel true.",
      description: "The complete pre-race checklist: torque check all linkage bolts, precision 12-speed electronic/mechanical derailleur alignment, hydraulic brake lever bleed, lateral wheel truing, and tire sealant refresh.",
      priceInCents: 16500, // $165.00
      estimatedDuration: "2 Hours",
      imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
      isEnabled: true,
      displayOrder: 2,
    },
    {
      name: "Custom Dream Bike Build & Frame Wrapping",
      slug: "custom-dream-bike-build",
      shortDescription: "Bare-frame custom component assembly, internal cable routing, and RideWrap tailored paint protection.",
      description: "From bare frame to dialed trail weapon. We cut steerer tubes with micro-precision, face brake mounts, bleed hoses through internal channels, and apply precision pre-cut protective polyurethane film.",
      priceInCents: 39500, // $395.00
      estimatedDuration: "1 Full Day",
      imageUrl: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
      isEnabled: true,
      displayOrder: 3,
    },
    {
      name: "Tubeless Setup & Precision Wheel Truing",
      slug: "tubeless-setup-wheel-true",
      shortDescription: "High-pressure rim tape install, tubeless valves, fresh sealant, and spoke tension balancing.",
      description: "Eliminate pinch flats and maximize trail traction. Includes tape inspection, high-flow valve stems, premium synthetic sealant, and radial/lateral tension gauge truing.",
      priceInCents: 7500, // $75.00
      estimatedDuration: "45 Minutes",
      imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
      isEnabled: true,
      displayOrder: 4,
    },
  ];

  const serviceRecords = [];
  for (const s of services) {
    const rec = await prisma.serviceItem.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    serviceRecords.push(rec);
  }

  // 8. Seed Sample Inquiries
  console.log("📬 Seeding sample inquiries...");
  await prisma.inquiry.upsert({
    where: { inquiryCode: "INQ-2026-104" },
    update: {},
    create: {
      inquiryCode: "INQ-2026-104",
      fullName: "Danielle Martinez",
      email: "danielle.mtz@example.com",
      phone: "+1 (503) 555-0192",
      subject: "Question about Terra Ridgeback sizing for 178cm rider",
      message: "Hello! I am looking to purchase the Ridgeback Carbon 29 for the upcoming Pacific Northwest enduro race season. I am 178cm tall with a 32-inch inseam. Would you recommend the Medium or Large frame?",
      inquiryType: "BIKE_PURCHASE",
      status: "NEW",
      emailNotificationSent: false,
      emailNotificationStatus: "NOT_CONFIGURED",
    },
  });

  await prisma.inquiry.upsert({
    where: { inquiryCode: "INQ-2026-102" },
    update: {},
    create: {
      inquiryCode: "INQ-2026-102",
      fullName: "Greg Thorne",
      email: "greg.thorne@example.com",
      phone: "+1 (206) 555-7832",
      subject: "Custom wheelset build inquiry",
      message: "Can you build a custom wheelset with DT Swiss 240 hubs and EX511 rims with brass nipples?",
      inquiryType: "PARTS_ADVICE",
      status: "IN_PROGRESS",
      emailNotificationSent: false,
      emailNotificationStatus: "NOT_CONFIGURED",
      internalNotes: "Quoted $1,150. Waiting for customer rim preference confirmation.",
    },
  });

  // 9. Seed Sample Service Booking
  console.log("📅 Seeding sample service booking...");
  if (serviceRecords.length > 0) {
    await prisma.serviceBooking.upsert({
      where: { bookingCode: "SRV-2026-201" },
      update: {},
      create: {
        bookingCode: "SRV-2026-201",
        serviceId: serviceRecords[0].id,
        customerName: "Alex Rivera",
        customerEmail: "alex.rivera@example.com",
        customerPhone: "+1 (541) 555-3921",
        bikeModel: "2024 Santa Cruz Megatower (Fox 38 & Float X2)",
        requestedDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
        requestedTimeSlot: "10:00 AM - 12:00 PM",
        notes: "Rear shock squelches on rebound, feels like air entered damper oil. Please inspect damper shaft.",
        status: "CONFIRMED",
        internalNotes: "Assigned to Lead Tech Dave. Seal kit SKU PRT-FOX-X2 in stock.",
      },
    });
  }

  console.log("✅ Seed completed successfully! Database is ready.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
