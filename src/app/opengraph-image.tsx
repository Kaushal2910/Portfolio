import { ImageResponse } from 'next/og';

export const alt = 'Kaushal Sonawane | DevOps & Cloud Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            border: '3px solid rgba(251,191,36,0.5)',
            background: 'rgba(251,191,36,0.1)',
            fontSize: 44,
            fontWeight: 700,
            color: '#fcd34d',
            marginBottom: 40,
          }}
        >
          KS
        </div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Kaushal Sonawane
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 30,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          DevOps &amp; Cloud Engineer
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 20,
            color: 'rgba(251,191,36,0.7)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Cloud · DevOps · AI/ML · Full Stack
        </div>
      </div>
    ),
    { ...size }
  );
}
