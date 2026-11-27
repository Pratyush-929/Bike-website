# TERRA CYCLES — Complete MTB Brand Website & Management System

> **Built for the Trails. Ready for Anything.**  
> A professional, production-oriented mountain biking brand website backed by a secure, real-time administrative management system.

---

## 🏔️ System Overview

TERRA CYCLES is an authentic, full-featured web application engineered specifically for a high-performance mountain bike manufacturer and technical workshop.

The project connects two complete systems through a shared single source of truth database:

1. **Public-Facing Brand Website**: An immersive, rugged, high-contrast digital flagship showcasing mountain bikes, spare parts, riding accessories, and factory workshop services.
2. **Secure Admin Management Console (`/admin`)**: A role-protected, real-time operations dashboard for managing the catalog, live inventory, integer-precision pricing, customer inquiries, workshop bay bookings, company settings, and team access.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 14 App Router (React 18, TypeScript)
* **Styling & Design System**: Tailwind CSS with custom alpine topography texture and color tokens (Charcoal `#0b0d10`, Forest Green `#1d4c3c` / `#36886c`, Trail Blaze Orange `#f97316`)
* **Typography**: Outfit (Bold headings) & Inter (Crisp technical readouts) via Google Fonts
* **Database**: SQLite (Zero-config, self-contained local database, fully production switchable to PostgreSQL via Prisma)
* **ORM**: Prisma ORM with relational modeling, foreign-key constraints, cascading actions, and database transactions
* **Authentication**: Stateless, tamper-proof JSON Web Tokens (`jose` HS256) stored in secure `httpOnly` cookies with bcrypt password hashing
* **Icons**: Lucide React
* **Media & Imagery**: Curated authentic mountain bike photography (enduro, full-suspension, high-pivot kinematics, Fox/RockShox suspension, alpine singletrack)

---

## 🚀 Quick Start Guide

### 1. Prerequisites

* Node.js v18.18+ or v20+ or v22+
* npm or pnpm or yarn

### 2. Installation

Clone or open the project folder in your terminal:

```bash
cd "/Users/purnika/Desktop/BIKE WEBSITE"
npm install
```

### 3. Environment Variables Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default configuration in `.env`:
```env
# Database connection (SQLite local file)
DATABASE_URL="file:./dev.db"

# JWT Secret for Session Cookies
JWT_SECRET="apex_mtb_ultra_secure_jwt_token_2026_super_secret_key_trail_ready"

# Base Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Initial Super Admin Setup (Used during initial seeding)
INITIAL_ADMIN_EMAIL="admin@terracycles.com"
INITIAL_ADMIN_PASSWORD="AdminPassword2026!"
INITIAL_ADMIN_NAME="Chief Trail Officer"
```

### 4. Database Setup & Seeding

Sync database schema and run the seed script:

```bash
npx prisma db push
node scripts/seed.mjs
```

This populates:
* Company settings & brand identity
* Super Admin and Manager accounts
* 14 distinct categories across Bikes, Parts, Accessories, and Services
* Flagship mountain bikes (Terra Ridgeback Carbon 29 Enduro, Apex Altitude EVO, World Cup DH, Nomad Hardtail, Podium XC) with realistic specs
* Enduro tires, Fox 38 forks, brake pads, Eagle chains, and wheelsets
* POC helmets, Fox gloves, EVOC hydration packs
* Factory workshop services (Suspension overhaul, race tunes, custom builds)
* Sample customer inquiries and workshop appointments

### 5. Running the Application

```bash
npm run dev
```

Visit the website at: **[http://localhost:3000](http://localhost:3000)**  
Visit the admin console at: **[http://localhost:3000/admin](http://localhost:3000/admin)**

---

## 🔐 Administrative Access & Credentials

The admin dashboard is protected by server-side JWT verification and role-based permissions:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@terracycles.com` | `AdminPassword2026!` | Full system control, website settings, team governance, archiving |
| **Manager** | `manager@terracycles.com` | `ManagerPassword2026!` | Products, stock adjustments, pricing, inquiries, service bookings |

---

## 📦 System Architecture & Features

### Public Website
* **Home Page (`/`)**: High-res trail hero with headline *"Built for the Trails. Ready for Anything."*, live featured bikes and components from DB, brand selling points (high-pivot kinematics, carbon layup), and workshop service highlights.
* **About Us (`/about`)**: Company background in Pacific Northwest trail engineering, mission, vision, philosophy, and alpine photo gallery.
* **Bikes Catalog (`/bikes`)**: Filterable by category, availability, and search keywords.
* **Bike Product Detail (`/bikes/[slug]`)**: Interactive multi-image gallery, full specifications table, pricing, stock count, and direct WhatsApp click-to-chat.
* **Spare Parts Catalog (`/parts` & `/parts/[slug]`)**: Tires, suspension forks, brake pads, drivetrains with SKU, brand, and compatibility specs.
* **Accessories Catalog (`/accessories` & `/accessories/[slug]`)**: Helmets, gloves, hydration packs, tools.
* **Workshop & Services (`/services`)**: Rebuild bay menus with duration, pricing, and an interactive **Service Booking Form**.
* **Contact Us (`/contact`)**: Form with DB persistence, unique inquiry ID generation, OpenStreetMap embed, and WhatsApp prefill.
* **Global Search (`/search`)**: Real-time debounced search across all catalog products and workshop services.

### Admin Dashboard Modules (`/admin`)
1. **Overview**: Real-time live metrics (total bikes, active items, low stock alerts, unread inquiries, bay requests).
2. **Product Management (`/admin/products`)**: Create, edit, and archive products with specification builder, image preview, and quick stock adjustment.
3. **Inventory Management (`/admin/inventory`)**: On-hand stock tracking, low-stock reorder thresholds, and immutable movement audit logs.
4. **Pricing Management (`/admin/pricing`)**: Non-negative validated pricing, promotional discounts, and minor-unit storage.
5. **Category Management (`/admin/categories`)**: Add, edit, reorder, and safely delete categories with orphaned product protection.
6. **Inquiry Inbox (`/admin/inquiries`)**: View messages, filter status, update follow-up dates, record internal notes, and export to CSV.
7. **Service Bookings (`/admin/bookings`)**: Manage appointments, assign bay times, update status (Pending, Confirmed, Completed, Cancelled).
8. **Settings (`/admin/settings`)**: Live updates to brand name, description, address, hours, currency, and hero banners.
9. **Team & Audit (`/admin/users`)**: User creation, role assignments, and system audit trail.

---

## 💬 WhatsApp & Email Integration Notes

* **WhatsApp Click-to-Chat**: Fully functional click-to-chat integration using `https://wa.me/{number}` with pre-filled message text including inquiry ID, customer name, and bike SKU.
* **Email Notifications**: Inquiries are stored with `emailNotificationStatus: "NOT_CONFIGURED"` unless SMTP credentials (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) are configured. Failed or missing configurations never block customer submissions.

---

## 🧪 Production Build Verification

```bash
npm run build
```

The application has been verified to produce zero TypeScript, lint, or runtime compile errors.
