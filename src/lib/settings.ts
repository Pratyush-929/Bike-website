import prisma from "./prisma";

export async function getCompanySettings() {
  try {
    let settings = await prisma.companySetting.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.companySetting.create({
        data: { id: "default" },
      });
    }

    return settings;
  } catch (error) {
    console.error("Error fetching company settings:", error);
    return {
      id: "default",
      brandName: "PRATYUSH WORLD",
      tagline: "RIDE BEYOND LIMITS. EXPLORE WITHOUT BOUNDARIES.",
      logoUrl: "/brand-logo.svg",
      faviconUrl: null,
      companyDescription: "PRATYUSH WORLD is dedicated to exploring the world of mountain biking.",
      aboutMission: "To help cycling enthusiasts discover mountain bike categories and leading models.",
      aboutVision: "RIDE BEYOND LIMITS. EXPLORE WITHOUT BOUNDARIES.",
      aboutPhilosophy: "Mountain biking, innovation, performance, and exploration.",
      contactEmail: "contact@pratyushworld.com",
      contactPhone: "+977 9864004444",
      whatsappNumber: "+9779864004444",
      physicalAddress: "442 Ridgeback Trail Road, Hood River, OR 97031",
      businessHours: "Mon - Fri: 8:30 AM - 6:00 PM | Sat: 9:00 AM - 5:00 PM",
      currencyCode: "USD",
      currencySymbol: "$",
      heroHeadline: "Built for the Trails. Ready for Anything.",
      heroSubheadline: "Precision-engineered enduro, trail, and downhill mountain bikes tested on the world's most unforgiving backcountry singletrack.",
      heroImageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2000&q=80",
      lowStockThresholdDefault: 3,
      emailNotificationsEnabled: false,
      notificationRecipientEmail: "inquiries@terracycles.com",
      smtpHost: null,
      smtpPort: null,
      smtpUser: null,
      updatedAt: new Date(),
    };
  }
}
