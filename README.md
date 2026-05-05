<div align="center">

# GameGrid — Sports Venue Booking Platform

**Discover, book, and play at premium sports venues across Ahmedabad.**  
A full-stack MERN application with real-time slot booking, tournament management, and a dedicated owner dashboard.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://gamegrid-sports-booking-platform.vercel.app/)
[![Backend](https://img.shields.io/badge/⚙️%20Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://cloud.mongodb.com)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Mongoose-8.x-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?style=flat-square&logo=razorpay)

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [UI Design System](#-ui-design-system)
- [Author](#-author)

---

## Overview

GameGrid is a full-stack sports venue booking platform built for the Ahmedabad sports community. Players can browse venues, book hourly slots, and register for tournaments — all in one place. Venue owners get a complete business dashboard to manage their venues, control availability, track bookings, and run events.

> 🔗 **Live:** [gamegrid-sports-booking-platform.vercel.app](https://gamegrid-sports-booking-platform.vercel.app/)

---

## Features

### For Players
| Feature | Description |
|---------|-------------|
| 🔐 **Auth** | JWT-based register & login with role selection (Player / Owner) |
| 🔍 **Explore Venues** | Browse & filter by sport, city, price range, or search by name |
| 📅 **Slot Booking** | Real-time hourly slot picker with live availability |
| 💳 **Payments** | Razorpay (online/card), UPI manual, and Cash booking flows |
| 📋 **My Bookings** | Full booking history with status tracking and cancellation |
| 🏆 **Tournaments** | Browse open events, register teams, pay entry fees |

### For Venue Owners
| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Revenue overview, booking stats, recent activity |
| 🏢 **Venue Management** | Add/edit venues with sport, pricing, hours & image upload |
| 🗓️ **Slot Control** | Block/unblock time slots, set peak hours, manage day-offs |
| 📒 **Booking Manager** | View all bookings, add walk-in (offline) bookings manually |
| 🎯 **Events** | Create and manage tournaments with registration & prize info |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev/) | 18.2 | UI framework |
| [Vite](https://vitejs.dev/) | 5.2 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 6.22 | Client-side routing |
| [Axios](https://axios-http.com/) | 1.6 | HTTP client |
| [Lucide React](https://lucide.dev/) | 0.376 | Icon library |
| [React Hot Toast](https://react-hot-toast.com/) | 2.4 | Notifications |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | 4.18 | REST API server |
| [Mongoose](https://mongoosejs.com/) | 8.3 | MongoDB ODM |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | — | Cloud database |
| [JWT](https://jwt.io/) | 9.0 | Authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 2.4 | Password hashing |
| [Razorpay](https://razorpay.com/) | 2.9 | Payment gateway |
| [Multer](https://github.com/expressjs/multer) | 1.4 | Image upload handling |

### Design System
| Concept | Value |
|---------|-------|
| Theme | **Neumorphism (Soft UI) — Light** |
| Primary BG | `#e0e5ec` |
| Raised Shadow | `9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)` |
| Pressed Shadow | `inset 6px 6px 12px #b8bec7, inset -6px -6px 12px #ffffff` |
| Fonts | `Nunito` (body) · `Syne` (brand headings) |
| Border Radius | `20px` (cards) · `12px` (inputs) · `50px` (buttons) |

---

## 📁 Project Structure

```
gamegrid/
│
├── 📂 backend/
│   ├── server.js                  # Express app entry point
│   ├── seed.js                    # DB seeder — 10 Ahmedabad venues + demo accounts
│   ├── .env                       # Environment variables (not committed)
│   │
│   ├── 📂 models/
│   │   ├── User.js                # Player / Owner schema + bcrypt hooks
│   │   ├── Venue.js               # Venue schema with pricing Map & imageUrl
│   │   ├── Booking.js             # Booking with slot references & payment info
│   │   ├── Slot.js                # Per-hour slot: booked/blocked state
│   │   ├── Event.js               # Tournament schema
│   │   ├── Team.js                # Tournament team registrations
│   │   └── DayOff.js              # Venue closure overrides by date
│   │
│   ├── 📂 routes/
│   │   ├── auth.js                # POST /register, POST /login, GET /profile
│   │   ├── venues.js              # GET venues, slots, image proxy
│   │   ├── bookings.js            # Create & manage bookings
│   │   ├── payments.js            # Razorpay order creation & verification
│   │   ├── events.js              # Tournament CRUD & team registration
│   │   └── owner.js               # Owner-only: dashboard stats, slot control
│   │
│   └── 📂 middleware/
│       ├── auth.js                # JWT verify → authMiddleware / ownerMiddleware
│       └── upload.js              # Multer config for venue image uploads
│
└── 📂 frontend/
    ├── vite.config.js             # Dev proxy: /api → localhost:5000
    ├── index.html                 # Root HTML with Google Fonts preload
    │
    └── 📂 src/
        ├── main.jsx               # React root mount
        ├── App.jsx                # Routes + protected route guards
        ├── index.css              # Global Neumorphic design system
        │
        ├── 📂 context/
        │   └── AuthContext.jsx    # Global auth state, login/logout/register
        │
        ├── 📂 components/
        │   ├── Navbar.jsx         # Responsive nav with role-aware links
        │   ├── VenueCard.jsx      # Venue listing card with imageUrl support
        │   ├── EventCard.jsx      # Tournament card with progress bar
        │   └── Loader.jsx         # Neumorphic spinner
        │
        └── 📂 pages/
            ├── Landing.jsx        # 3-layer parallax hero + sports showcase
            ├── Login.jsx          # Auth form
            ├── Register.jsx       # Auth form with role toggle
            ├── Explore.jsx        # Venue browse + filter
            ├── VenueDetail.jsx    # Venue info + slot picker
            ├── Booking.jsx        # Checkout + payment method selection
            ├── MyBookings.jsx     # Player booking history
            ├── Events.jsx         # Tournament listing
            ├── EventDetail.jsx    # Tournament + team registration
            └── 📂 owner/
                ├── Dashboard.jsx  # Stats overview + revenue chart
                ├── Venues.jsx     # Venue list management
                ├── VenueForm.jsx  # Add / edit venue form
                ├── Bookings.jsx   # All bookings + offline add
                ├── Slots.jsx      # Slot calendar + day-off manager
                ├── Events.jsx     # Tournament management
                └── EventForm.jsx  # Create / edit tournament
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A free [Razorpay Test](https://razorpay.com/) account

### 1. Clone the repository

```bash
git clone https://github.com/divydesai/gamegrid.git
cd gamegrid
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env` (see [Environment Variables](#-environment-variables) below), then:

```bash
npm run seed    # Populates DB with 10 venues + 2 demo accounts
npm start       # API → http://localhost:5000
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev     # App → http://localhost:5173
```

### 4. Verify

Visit `http://localhost:5000/api/health` — you should see:

```json
{ "status": "ok", "db": "connected", "dbName": "gamegrid" }
```

---

## Environment Variables

Create `backend/.env` with the following:

```env
# Server
PORT=5000

# MongoDB Atlas — replace <db_password> with your real password
# The "gamegrid" database is created automatically on first run
MONGO_URI="mongodb+srv://<username>:<db_password>@cluster0.xxxxx.mongodb.net/gamegrid?retryWrites=true&w=majority&appName=Cluster0"

# JWT — use a long random string
JWT_SECRET="your_jwt_secret_here"

# Razorpay (test keys from dashboard.razorpay.com)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxx"
```

>  **Never commit `.env` to Git.** It's already in `.gitignore`.

### MongoDB Atlas — One-time setup checklist

- [ ] Go to **Database Access** → set/reset password for your DB user
- [ ] Go to **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere)
- [ ] No need to manually create the `gamegrid` database — `seed.js` does it

### Demo Accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
|  Owner | `owner@gamegrid.com` | `owner123` |
|  Player | `player@gamegrid.com` | `player123` |

---

##  API Reference

All routes are prefixed with `/api`.

### Auth  `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Create player or owner account |
| `POST` | `/login` | Public | Returns JWT token |
| `GET` | `/profile` | 🔒 JWT | Get current user info |

### Venues  `/api/venues`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | 🔒 JWT | List venues (filter: sport, city, search, price) |
| `GET` | `/:id` | 🔒 JWT | Single venue detail |
| `GET` | `/:id/image` | Public | Serve venue image (CDN redirect or base64) |
| `GET` | `/:id/slots?date=&sport=` | 🔒 JWT | Get/generate hourly slots for date+sport |

### Bookings  `/api/bookings`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | 🔒 JWT | Create booking (UPI / Cash) |
| `GET` | `/my` | 🔒 JWT | Player's own bookings |
| `DELETE` | `/:id` | 🔒 JWT | Cancel booking |

### Payments  `/api/payments`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/create-order` | 🔒 JWT | Create Razorpay order for venue slot |
| `POST` | `/verify` | 🔒 JWT | Verify payment signature & confirm booking |
| `POST` | `/event-order` | 🔒 JWT | Create Razorpay order for event entry |
| `POST` | `/event-verify` | 🔒 JWT | Verify event payment & register team |

### Events  `/api/events`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | 🔒 JWT | List open tournaments |
| `GET` | `/:id` | 🔒 JWT | Event detail + registered teams |
| `POST` | `/:id/teams` | 🔒 JWT | Register a team (cash / offline) |

### Owner  `/api/owner`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/stats` |  Owner | Dashboard summary stats |
| `GET` | `/venues` |  Owner | Owner's own venues |
| `POST` | `/venues` |  Owner | Create new venue |
| `PUT` | `/venues/:id` |  Owner | Update venue |
| `DELETE` | `/venues/:id` |  Owner | Delete venue |
| `GET` | `/bookings` |  Owner | All bookings across owner's venues |
| `POST` | `/bookings/offline` |  Owner | Add walk-in/offline booking |
| `POST` | `/slots/block` |  Owner | Block a specific slot |
| `POST` | `/slots/unblock` |  Owner | Unblock a slot |
| `POST` | `/dayoff` |  Owner | Mark a date as closed for a sport |
| `DELETE` | `/dayoff/:id` |  Owner | Remove a day-off |
| `GET` | `/events` |  Owner | Owner's tournaments |
| `POST` | `/events` |  Owner | Create tournament |
| `PUT` | `/events/:id` |  Owner | Update tournament |
| `DELETE` | `/events/:id` |  Owner | Delete tournament |
| `POST` | `/events/:id/teams/offline` |  Owner | Register walk-in team |

---

##  Database Schema

```
MongoDB Atlas — Database: gamegrid
│
├── users
│   ├── name, email (unique), password (bcrypt), phone
│   └── role: "player" | "owner"
│
├── venues
│   ├── ownerId (→ users), name, address, city, locality
│   ├── sports[], amenities[], peakHours[]
│   ├── pricing: Map<sport, { base, peak }>
│   ├── activeHoursStart, activeHoursEnd, slotDuration
│   ├── imageUrl (CDN/Unsplash), imageData + imageContentType (base64 upload)
│   └── rating, totalReviews, isActive
│
├── slots
│   ├── venueId (→ venues), sport, date, startTime, endTime
│   ├── price, isPeak, duration
│   └── isBooked, isBlocked, bookedBy (→ users), bookingId (→ bookings)
│
├── bookings
│   ├── userId (→ users), venueId (→ venues), sport, date
│   ├── slots[] (→ slots), slotDetails[], totalAmount, totalDuration
│   ├── playerName, playerPhone, playerCount
│   ├── paymentMethod: "online" | "upi" | "cash"
│   ├── paymentStatus: "Paid" | "Pending" | "Refunded"
│   ├── razorpayOrderId, razorpayPaymentId
│   └── status: "Confirmed" | "Cancelled" | "Completed"
│
├── events
│   ├── venueId (→ venues), ownerId (→ users)
│   ├── name, description, prizePool, entryFee
│   ├── maxTeams, registeredTeamsCount
│   ├── startDate, endDate, eventTime, lastRegistrationDate
│   └── status: "Open" | "Closed" | "Full" | "Active" | "Cancelled"
│
├── teams
│   ├── eventId (→ events), teamName, teamNameLower (for case-insensitive unique index)
│   ├── createdBy (→ users), playerName, playerPhone, numberOfPlayers, members[]
│   ├── paymentMethod, paymentStatus
│   └── razorpayOrderId, razorpayPaymentId
│
└── dayoffs
    ├── venueId (→ venues), sport, date
    └── reason
```

---

##  Deployment

### Frontend → Vercel

1. Push your project to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
5. Click **Deploy**

> Update `vite.config.js` proxy target to your Render URL for production, or use `axios.defaults.baseURL = import.meta.env.VITE_API_URL` in `main.jsx`.

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo, set **Root Directory** to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `.env` in the **Environment** tab
6. Click **Create Web Service**

> Free Render tier spins down after inactivity — first request may take ~30s to wake up.

### MongoDB → Atlas (Free Tier)

1. Create cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Database Access** → Create user with username + password
3. **Network Access** → Add `0.0.0.0/0`
4. Get connection string and paste into `MONGO_URI` in Render env vars

---

##  UI Design System

GameGrid uses a **Neumorphic (Soft UI)** design system throughout every component.

### Core Tokens

```css
:root {
  --nm-bg:          #e0e5ec;
  --nm-raised:      9px 9px 16px rgba(163,177,198,0.6),
                    -9px -9px 16px rgba(255,255,255,0.5);
  --nm-pressed:     inset 6px 6px 12px #b8bec7,
                    inset -6px -6px 12px #ffffff;
  --accent-primary: #4a7cf7;   /* royal blue  */
  --accent-green:   #34c77b;   /* emerald     */
  --radius:         20px;
  --font:           'Nunito', sans-serif;
  --font-brand:     'Syne', sans-serif;
}
```

### Component States

| State | Shadow |
|-------|--------|
| Default / Raised | `var(--nm-raised)` |
| Hovered | `var(--nm-raised-hover)` + `translateY(-2px)` |
| Active / Pressed | `var(--nm-pressed)` — inset |
| Focused input | `var(--nm-pressed)` + `0 0 0 3px rgba(74,124,247,0.2)` |

### Hero Parallax

The landing page uses a 3-layer `requestAnimationFrame` parallax:

| Layer | Content | Scroll Speed |
|-------|---------|-------------|
| 1 — Background | SVG sports field patterns + colour blobs | `0.3×` |
| 2 — Middle | Floating sports emoji (⚽🏸🎾🏏🏀🏓) | `0.6×` |
| 3 — Foreground | Headline, CTA buttons, stats ribbon | `1.0×` |

---

##  Security Notes

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- Auth protected via **JWT** (7-day expiry) in `Authorization: Bearer` header
- Owner routes double-protected by `ownerMiddleware` — role check after JWT verify
- Razorpay payments verified server-side with **HMAC SHA256** signature check
- `.env` is in `.gitignore` — never committed

---

##  License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

<div align="center">

**Divy Desai**

[![GitHub](https://img.shields.io/badge/GitHub-divydesai-181717?style=for-the-badge&logo=github)](https://github.com/KingDivy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Divy%20Desai-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/divy-desai/)

*Built with ❤️ for the Ahmedabad sports community*

---

⭐ **If you found this useful, give it a star on GitHub!** ⭐

</div>