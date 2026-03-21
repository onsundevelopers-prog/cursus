'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: '#0f172a',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
            Something went wrong!
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
            We encountered an unexpected error.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.85rem 1.75rem',
              background: '#0f172a',
              color: 'white',
              borderRadius: '14px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
