require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');


const app  = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// ─── Validate critical env vars on startup ────────────────────
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET'];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`\n❌  Missing required env var: ${key}`);
    console.error(`    Make sure backend/.env exists and is correct.\n`);
    process.exit(1);
  }
}

if (process.env.MONGO_URI.includes('<db_password>')) {
  console.error('\n❌  MONGO_URI still has the placeholder <db_password>!');
  console.error('    Open backend/.env and replace <db_password> with your real Atlas password.\n');
  process.exit(1);
}

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// ─── MongoDB Connection ───────────────────────────────────────
// Atlas auto-creates the "gamegrid" database on first write.
// You do NOT need to create the database manually on the website.
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('\n✅  MongoDB connected →', mongoose.connection.host);
    console.log('📦  Database         →', mongoose.connection.name);
    console.log('🔗  Full URI host    →', mongoose.connection.host, '\n');
  })
  .catch(err => {
    console.error('\n❌  MongoDB connection failed:', err.message);
    console.error('\n    Common fixes:');
    console.error('    1. Replace <db_password> in backend/.env with your real Atlas password');
    console.error('    2. Go to Atlas → Network Access → Add your IP address (or 0.0.0.0/0)');
    console.error('    3. Check that your cluster is active on cloud.mongodb.com\n');
    process.exit(1);
  });

// ─── Routes ──────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/venues',   require('./routes/venues'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/events',   require('./routes/events'));
app.use('/api/owner',    require('./routes/owner'));

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({
  status:  'ok',
  time:    new Date().toISOString(),
  db:      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  dbName:  mongoose.connection.name,
  dbHost:  mongoose.connection.host,
}));

// ─── 404 ─────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` }));

// ─── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🏟️  GameGrid API → http://localhost:${PORT}`);
  console.log(`    Health check → http://localhost:${PORT}/api/health\n`);
});
