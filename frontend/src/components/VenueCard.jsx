import { useNavigate } from 'react-router-dom';

const SPORT_ICONS = {
  'Box Cricket': '🏏', 'Badminton': '🏸', 'Tennis': '🎾',
  'Football': '⚽', 'Basketball': '🏀', 'Table Tennis': '🏓',
};

export default function VenueCard({ venue }) {
  const navigate = useNavigate();
  const minPrice = venue.pricing
    ? Math.min(...Object.values(venue.pricing).map(p => p.base || 999))
    : 0;

  // Use resolvedImageUrl virtual (set by Mongoose) or imageUrl directly, fallback to API route
  const imgSrc = venue.resolvedImageUrl || venue.imageUrl || `/api/venues/${venue._id}/image`;

  return (
    <div className="venue-card animate-fade" onClick={() => navigate(`/venue/${venue._id}`)}>
      <div className="venue-img" style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
        <img
          src={imgSrc}
          alt={venue.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="venue-placeholder" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '3rem', position: 'absolute', inset: 0 }}>
          🏟️
        </div>
      </div>
      <div className="venue-card-body">
        <div className="venue-name">{venue.name}</div>
        <div className="venue-location">📍 {venue.locality ? `${venue.locality}, ` : ''}{venue.city}</div>
        <div className="venue-sports">
          {(venue.sports || []).map(s => (
            <span key={s} className="badge badge-blue">{SPORT_ICONS[s] || '🏅'} {s}</span>
          ))}
        </div>
        <div className="venue-price">From <strong>₹{minPrice}</strong>/hr</div>
      </div>
    </div>
  );
}
