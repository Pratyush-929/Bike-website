export function formatPrice(
  cents: number | null | undefined,
  currencyCode = "USD",
  currencySymbol = "$"
): string {
  if (cents === null || cents === undefined || isNaN(cents)) {
    return `${currencySymbol}0.00`;
  }
  const dollars = (cents / 100).toFixed(2);
  // Add thousand separators
  const parts = dollars.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currencySymbol}${parts.join(".")}`;
}

export function parsePriceToCents(val: string | number): number {
  if (typeof val === "number") {
    return Math.round(val * 100);
  }
  const cleaned = val.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  return Math.round(num * 100);
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatAvailabilityStatus(status: string): string {
  switch (status) {
    case "IN_STOCK":
      return "In Stock";
    case "LOW_STOCK":
      return "Low Stock";
    case "OUT_OF_STOCK":
      return "Out of Stock";
    case "COMING_SOON":
      return "Coming Soon";
    case "DISCONTINUED":
      return "Discontinued";
    default:
      return status;
  }
}

export function getAvailabilityBadgeProps(status: string): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (status) {
    case "IN_STOCK":
      return {
        label: "In Stock",
        badgeClass: "bg-forest-900/60 text-forest-300 border-forest-700/50",
        dotClass: "bg-forest-400",
      };
    case "LOW_STOCK":
      return {
        label: "Low Stock",
        badgeClass: "bg-amber-950/60 text-amber-300 border-amber-700/50",
        dotClass: "bg-amber-400 animate-pulse",
      };
    case "OUT_OF_STOCK":
      return {
        label: "Out of Stock",
        badgeClass: "bg-red-950/60 text-red-300 border-red-700/50",
        dotClass: "bg-red-400",
      };
    case "COMING_SOON":
      return {
        label: "Coming Soon",
        badgeClass: "bg-sky-950/60 text-sky-300 border-sky-700/50",
        dotClass: "bg-sky-400",
      };
    case "DISCONTINUED":
      return {
        label: "Discontinued",
        badgeClass: "bg-charcoal-800 text-charcoal-400 border-charcoal-700",
        dotClass: "bg-charcoal-500",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-charcoal-800 text-charcoal-300 border-charcoal-700",
        dotClass: "bg-charcoal-400",
      };
  }
}

export function getLightAvailabilityBadgeProps(status: string): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (status) {
    case "IN_STOCK":
      return {
        label: "In Stock",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dotClass: "bg-emerald-500",
      };
    case "LOW_STOCK":
      return {
        label: "Low Stock",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        dotClass: "bg-amber-500 animate-pulse",
      };
    case "OUT_OF_STOCK":
      return {
        label: "Out of Stock",
        badgeClass: "bg-red-50 text-red-700 border-red-200",
        dotClass: "bg-red-500",
      };
    case "COMING_SOON":
      return {
        label: "Coming Soon",
        badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
        dotClass: "bg-sky-500",
      };
    case "DISCONTINUED":
      return {
        label: "Discontinued",
        badgeClass: "bg-slate-100 text-slate-500 border-slate-200",
        dotClass: "bg-slate-400",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
        dotClass: "bg-slate-400",
      };
  }
}

export function generateCode(prefix: string): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${randomNum}`;
}
