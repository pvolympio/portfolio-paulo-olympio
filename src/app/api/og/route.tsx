import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#07070f',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(105, 89, 205, 0.15) 2px, transparent 0)',
          backgroundSize: '50px 50px',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#6959cd',
            }}
          />
          <span
            style={{
              color: '#8b7cf5',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '2px',
            }}
          >
            PORTFÓLIO
          </span>
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 16px 0',
            lineHeight: 1.1,
          }}
        >
          Paulo Victor Olympio
        </h1>

        <p
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            margin: '0 0 40px 0',
            fontWeight: 500,
          }}
        >
          Desenvolvedor Backend & Fullstack
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          {['Java', 'Node.js', 'TypeScript', 'Python', 'Docker', 'APIs REST'].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: 'rgba(105, 89, 205, 0.15)',
                border: '1px solid rgba(139, 124, 245, 0.3)',
                color: '#8b7cf5',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
