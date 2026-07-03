import { ImageResponse } from 'next/og';

export const alt = 'Portal Administrasi Pembelajaran IPA — I Kadek Sukarsa, S.Pd';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
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
          backgroundColor: '#05060f',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.25), transparent), radial-gradient(ellipse 60% 50% at 85% 110%, rgba(168,85,247,0.28), transparent)',
          color: '#fff',
          fontFamily: 'sans-serif',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '10px 28px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.18)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            fontSize: 26,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: '#22d3ee',
              display: 'flex',
            }}
          />
          Guru IPA · SMP Negeri 3 Singaraja
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 44,
            fontSize: 88,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.05,
          }}
        >
          Portal Administrasi
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            backgroundImage: 'linear-gradient(90deg, #67e8f9, #818cf8, #c084fc)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Pembelajaran IPA
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 30,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          I Kadek Sukarsa, S.Pd — semua berkas mengajar dalam satu tempat
        </div>
      </div>
    ),
    { ...size },
  );
}
