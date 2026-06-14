import React from 'react';
import { cn } from '@/lib/utils';

interface FECardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'premium' | 'flat';
}

export function FECard({
  children,
  className,
  variant = 'default',
  ...props
}: FECardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl p-8 transition-all duration-300 relative overflow-hidden',
        // Default card style
        variant === 'default' && [
          'bg-white border-2 border-brand-dark/10 shadow-[4px_4px_0_0_rgba(45,27,46,1)]',
          'hover:shadow-[8px_8px_0_0_rgba(45,27,46,1)] hover:-translate-x-1 hover:-translate-y-1',
        ],
        // Premium brand-accent card style
        variant === 'premium' && [
          'bg-brand-crema border-2 border-brand-primary shadow-[4px_4px_0_0_rgba(255,138,61,1)]',
          'hover:shadow-[8px_8px_0_0_rgba(255,138,61,1)] hover:-translate-x-1 hover:-translate-y-1',
        ],
        // Flat styling
        variant === 'flat' && 'bg-white border border-brand-dark/5 shadow-sm',
        className
      )}
      {...props}
    >
      {/* Decorative top-right circle accent on premium card */}
      {variant === 'premium' && (
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-brand-primary/10 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
