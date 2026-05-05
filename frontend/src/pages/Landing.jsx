import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

/* ─── Sports Data ─────────────────────────────────────────────── */
const SPORTS = [
  { icon: '🏏', name: 'Box Cricket',  desc: 'Indoor arena with astro turf' },
  { icon: '🏸', name: 'Badminton',    desc: 'Pro-grade maple courts' },
  { icon: '🎾', name: 'Tennis',       desc: 'Clay & hard court sessions' },
  { icon: '⚽', name: 'Football',     desc: '5-a-side & 7-a-side turf' },
  { icon: '🏀', name: 'Basketball',   desc: 'Full & half-court games' },
  { icon: '🏓', name: 'Table Tennis', desc: 'Competitive & casual play' },
];

const STATS = [
  { num: '500+', label: 'Venues' },
  { num: '50K+', label: 'Players' },
  { num: '1K+',  label: 'Events' },
  { num: '4.9★', label: 'Rating' },
];

/* ─── Parallax Hook ───────────────────────────────────────────── */
function useParallax(layerRefs) {
  useEffect(() => {
    let rafId;
    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 0.5) {
        lastY = y;
        // Layer 1: slow background (speed 0.3)
        if (layerRefs.layer1.current)
          layerRefs.layer1.current.style.transform = `translateY(${y * 0.3}px)`;
        // Layer 2: middle floating icons (speed 0.6)
        if (layerRefs.layer2.current)
          layerRefs.layer2.current.style.transform = `translateY(${y * 0.6}px)`;
        // Layer 3: foreground content (speed 1.0 — natural scroll)
        if (layerRefs.layer3.current)
          layerRefs.layer3.current.style.transform = `translateY(${y * 1.0}px)`;
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);
}

/* ─── Floating Sports Icons (Layer 2) ────────────────────────── */
const FLOATERS = [
  { icon: '⚽', size: 56, top: '12%',  left: '8%',  delay: '0s',   dur: '6s'  },
  { icon: '🏸', size: 44, top: '65%',  left: '6%',  delay: '1.2s', dur: '7s'  },
  { icon: '🎾', size: 50, top: '20%',  right: '7%', delay: '0.5s', dur: '5.5s'},
  { icon: '🏏', size: 48, top: '70%',  right: '9%', delay: '2s',   dur: '6.5s'},
  { icon: '🏀', size: 42, top: '40%',  left: '4%',  delay: '0.8s', dur: '8s'  },
  { icon: '🏓', size: 38, top: '55%',  right: '5%', delay: '1.5s', dur: '7.5s'},
  { icon: '🏐', size: 46, top: '85%',  left: '20%', delay: '0.3s', dur: '6s'  },
  { icon: '🥊', size: 40, top: '10%',  right: '22%',delay: '1.8s', dur: '7s'  },
];

/* ─── Field Pattern SVG (Layer 1 Background) ─────────────────── */
function FieldPattern() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, opacity: 0.12 }}
    >
      <defs>
        <pattern id="field-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Grass grid lines */}
          <line x1="0" y1="0" x2="80" y2="0"   stroke="#5b8a3c" strokeWidth="1.5"/>
          <line x1="0" y1="0" x2="0"  y2="80"  stroke="#5b8a3c" strokeWidth="1.5"/>
          {/* Diagonal accent */}
          <line x1="0" y1="80" x2="80" y2="0"  stroke="#4a7a30" strokeWidth="0.5" strokeDasharray="4 6"/>
        </pattern>
        <pattern id="court-lines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Center circle */}
          <circle cx="100" cy="100" r="40" fill="none" stroke="#4080d0" strokeWidth="2" strokeDasharray="6 4"/>
          {/* Court boundary */}
          <rect x="20" y="20" width="160" height="160" fill="none" stroke="#4080d0" strokeWidth="1.5" strokeDasharray="8 4"/>
          {/* Half-court line */}
          <line x1="20" y1="100" x2="180" y2="100" stroke="#4080d0" strokeWidth="1" strokeDasharray="4 4"/>
          {/* Three-point arc (basketball style) */}
          <path d="M 50 170 Q 100 60 150 170" fill="none" stroke="#d04040" strokeWidth="1.5" strokeDasharray="5 3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#field-grid)"/>
      <rect width="100%" height="100%" fill="url(#court-lines)" opacity="0.5"/>
      {/* Large center circle overlay */}
      <circle cx="50%" cy="50%" r="280" fill="none" stroke="#5b8a3c" strokeWidth="2" strokeDasharray="10 6" opacity="0.5"/>
      <circle cx="50%" cy="50%" r="180" fill="none" stroke="#4080d0" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.4"/>
    </svg>
  );
}

/* ─── Landing Component ───────────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();

  const layer1 = useRef(null);
  const layer2 = useRef(null);
  const layer3 = useRef(null);
  useParallax({ layer1, layer2, layer3 });

  return (
    <div className="landing-root">

      {/* ══════════════════════════════════════════════════════════
          HERO  —  3-Layer Parallax
      ══════════════════════════════════════════════════════════ */}
      <section className="parallax-hero" aria-label="Hero section">

        {/* LAYER 1 — Background: Slow sports-field pattern (speed 0.3) */}
        <div className="parallax-layer parallax-layer-1" ref={layer1} aria-hidden="true">
          <FieldPattern />
          {/* Soft colour blobs */}
          <div className="hero-blob hero-blob-tl" />
          <div className="hero-blob hero-blob-br" />
          <div className="hero-blob hero-blob-center" />
        </div>

        {/* LAYER 2 — Middle: Floating sports equipment (speed 0.6) */}
        <div className="parallax-layer parallax-layer-2" ref={layer2} aria-hidden="true">
          {FLOATERS.map((f, i) => (
            <span
              key={i}
              className="hero-floater"
              style={{
                fontSize:    f.size,
                top:         f.top,
                left:        f.left  || 'auto',
                right:       f.right || 'auto',
                animationDelay:    f.delay,
                animationDuration: f.dur,
              }}
            >
              {f.icon}
            </span>
          ))}
        </div>

        {/* LAYER 3 — Foreground: Headline + CTA (speed 1.0) */}
        <div className="parallax-layer parallax-layer-3" ref={layer3}>
          <div className="hero-content-inner">

            <div className="hero-badge nm-raised animate-fade">
              <span>⚡</span> India's Premier Sports Booking Platform
            </div>

            <h1 className="hero-headline animate-slide">
              <span className="hero-brand-line">GameGrid</span>
              <span className="hero-sub-line">Play <em>Anywhere</em></span>
            </h1>

            <p className="hero-desc animate-fade" style={{ animationDelay: '0.15s' }}>
              Find & book top Ahmedabad sports venues in seconds. Join tournaments,
              challenge rival teams, and experience sport at its finest.
            </p>

            <div className="hero-cta animate-fade" style={{ animationDelay: '0.28s' }}>
              <button
                className="btn-nm btn-nm-primary btn-nm-lg"
                onClick={() => navigate('/explore')}
              >
                🏟️ Explore Venues
              </button>
              <button
                className="btn-nm btn-nm-ghost btn-nm-lg"
                onClick={() => navigate('/register')}
              >
                🚀 Get Started Free
              </button>
            </div>

            {/* Stats ribbon */}
            <div className="stats-ribbon animate-fade" style={{ animationDelay: '0.4s' }}>
              {STATS.map(s => (
                <div key={s.label} className="stat-chip nm-raised">
                  <div className="stat-chip-num">{s.num}</div>
                  <div className="stat-chip-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SPORTS WE COVER
      ══════════════════════════════════════════════════════════ */}
      <section className="landing-section">
        <div className="container">
          <div className="section-head">
            <h2>Sports We <span className="accent-text">Cover</span></h2>
            <p>Book premium venues for your favourite sport</p>
          </div>
          <div className="sports-grid">
            {SPORTS.map((s, i) => (
              <div
                key={s.name}
                className="sport-card nm-raised animate-fade"
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={() => navigate('/register')}
                role="button"
                tabIndex={0}
              >
                <div className="sport-icon-wrap nm-pressed">
                  <span className="sport-icon">{s.icon}</span>
                </div>
                <h3 className="sport-name">{s.name}</h3>
                <p className="sport-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VENUE OWNER CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="landing-section cta-section">
        <div className="container">
          <div className="cta-card nm-raised">
            <div className="cta-icon-wrap nm-pressed" aria-hidden="true">🏟️</div>
            <div className="cta-body">
              <h2>Are you a <span className="accent-text">Venue Owner?</span></h2>
              <p>
                List your venue, manage bookings, run tournaments and grow your
                sports business with GameGrid — completely free to start.
              </p>
              <button
                className="btn-nm btn-nm-primary"
                onClick={() => navigate('/register')}
              >
                Register Your Venue →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="landing-footer nm-pressed">
        <div className="container footer-inner">
          <span className="footer-brand">GAMEGRID</span>
          <span className="footer-copy">© 2026 GameGrid. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
