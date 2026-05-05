# 🏟️ GameGrid — Sports Venue Booking Platform

## ⚡ Quick Start (3 Steps)

### STEP 1 — Set Your MongoDB Password
Open `backend/.env` and replace `<db_password>` with your real Atlas password:
```
MONGO_URI="mongodb+srv://divydesai07_db_user:YOUR_REAL_PASSWORD@cluster0..."
```

Also go to: **MongoDB Atlas → Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)**

---

### STEP 2 — Run Backend
```bash
cd backend
npm install
npm run seed      # Seeds 10 venues + 2 accounts into YOUR database
npm start         # Starts API on http://localhost:5000
```

---

### STEP 3 — Run Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev       # Opens at http://localhost:5173
```

---

## 🔑 Login Accounts (after seed)
| Role   | Email                  | Password  |
|--------|------------------------|-----------|
| Owner  | owner@gamegrid.com     | owner123  |
| Player | player@gamegrid.com    | player123 |

---

## 📁 Project Structure
```
gamegrid/
├── backend/
│   ├── .env                    ← ⚠️ Set your password here
│   ├── server.js
│   ├── seed.js
│   ├── models/
│   │   ├── Venue.js
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Slot.js
│   │   ├── Event.js
│   │   ├── DayOff.js
│   │   └── Team.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── venues.js
│   │   ├── bookings.js
│   │   ├── payments.js
│   │   ├── events.js
│   │   └── owner.js
│   └── middleware/
│       ├── auth.js
│       └── upload.js
└── frontend/
    ├── vite.config.js          ← Proxies /api → localhost:5000
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css           ← Neumorphic design system
        ├── context/
        │   └── AuthContext.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── VenueCard.jsx
        │   ├── EventCard.jsx
        │   └── Loader.jsx
        └── pages/
            ├── Landing.jsx     ← 3-layer parallax hero
            ├── Login.jsx
            ├── Register.jsx
            ├── Explore.jsx
            ├── VenueDetail.jsx
            ├── Booking.jsx
            ├── MyBookings.jsx
            ├── Events.jsx
            ├── EventDetail.jsx
            └── owner/
                ├── Dashboard.jsx
                ├── Venues.jsx
                ├── VenueForm.jsx
                ├── Bookings.jsx
                ├── Slots.jsx
                ├── Events.jsx
                └── EventForm.jsx
```

---

## 🛠️ Troubleshooting
| Error | Fix |
|-------|-----|
| `<db_password>` error on start | Replace it in `backend/.env` |
| `connection timed out` | Atlas → Network Access → Add your IP |
| `Authentication failed` | Reset password on Atlas → Database Access |
| API calls going to wrong server | `frontend/vite.config.js` target must be `http://localhost:5000` |
| Port 5000 in use | Change `PORT=5001` in `.env` and update `vite.config.js` |

---

## ✅ MongoDB URI — What Was Fixed
| Issue | Before | After |
|-------|--------|-------|
| No DB name | `.../? ` → went to `test` DB | `.../gamegrid?` → your own DB |
| Password | `<db_password>` placeholder | You replace with real password |
| Options | Missing | `retryWrites=true&w=majority` added |

**The database is created automatically** by MongoDB when you first run `seed.js`. You do NOT need to create it manually on the Atlas website.
