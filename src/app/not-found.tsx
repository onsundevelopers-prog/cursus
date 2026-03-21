import Link from 'next/link';

export default function NotFound() {
    return (
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
            fontFamily: 'var(--font-sans)',
        }}>
            <div
                style={{
                    maxWidth: '520px',
                    width: '100%',
                    position: 'relative'
                }}
            >
                {/* Quirky Ghost Illustration (Motion for Delight) */}
                <div
                    style={{
                        marginBottom: '2rem',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        padding: '3rem',
                        borderRadius: '50%',
                        position: 'relative',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                        fontSize: '4rem'
                    }}>
                        👻
                        <div
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: '#3b82f6',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%'
                            }}
                        />
                    </div>
                </div>

                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.06em',
                    lineHeight: 1
                }}>
                    Whoops! <span style={{ color: '#3b82f6' }}>404</span>
                </h1>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#1e293b' }}>
                    Lost in the Career Cloud?
                </h2>

                <p style={{
                    color: '#64748b',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    marginBottom: '2.5rem',
                    maxWidth: '400px',
                    margin: '0 auto 2.5rem'
                }}>
                    This page must have taken a vacation. Even our AI couldn't find it! Let's get you back on track.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link
                        href="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.85rem 1.75rem',
                            background: '#0f172a',
                            color: 'white',
                            borderRadius: '14px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.3)'
                        }}
                    >
                        ← Back to Home
                    </Link>

                    <Link
                        href="/dashboard"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.85rem 1.75rem',
                            background: '#f1f5f9',
                            color: '#0f172a',
                            borderRadius: '14px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        🔍 Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
