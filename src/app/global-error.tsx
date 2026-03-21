'use client';

export default function GlobalError() {
  return (
    <html>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1>Something went wrong</h1>
        </div>
      </body>
    </html>
  );
}
