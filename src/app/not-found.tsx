export default function NotFound() {
  return (
    <html>
      <head>
        <title>Page Not Found</title>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            color: '#1f2937',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>
              Page Not Found
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              The page you're looking for doesn't exist.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#374151',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
