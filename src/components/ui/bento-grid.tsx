import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 22rem)',
                gap: '1rem',
                width: '100%',
            }}
            className={cn(className)}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    gridStyle,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
    href: string;
    cta: string;
    gridStyle?: React.CSSProperties;
}) => (
    <div
        key={name}
        className={cn("bento-card", className)}
        style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            overflow: 'hidden',
            borderRadius: '12px',
            background: 'white',
            boxShadow: '0 0 0 1px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.05), 0 12px 24px rgba(0,0,0,.05)',
            ...gridStyle,
        }}
    >
        {/* Background image area */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {background}
        </div>

        {/* Text content — slides up on hover */}
        <div
            className="bento-content"
            style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '24px',
                transition: 'transform 0.3s ease',
            }}
        >
            <Icon style={{ width: '3rem', height: '3rem', color: '#404040', transition: 'transform 0.3s ease' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#404040', margin: '8px 0 4px' }}>
                {name}
            </h3>
            <p style={{ color: '#a3a3a3', fontSize: '0.95rem', maxWidth: '400px' }}>{description}</p>
        </div>

        {/* CTA — slides up on hover */}
        <div
            className="bento-cta"
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                padding: '16px',
                transform: 'translateY(40px)',
                opacity: 0,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                zIndex: 10,
            }}
        >
            <a
                href={href}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#404040',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                }}
            >
                {cta}
                <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
            </a>
        </div>

        {/* Hover overlay */}
        <div
            className="bento-overlay"
            style={{
                position: 'absolute',
                inset: 0,
                background: 'transparent',
                transition: 'background 0.3s ease',
                zIndex: 5,
                pointerEvents: 'none',
            }}
        />
    </div>
);

export { BentoCard, BentoGrid };
