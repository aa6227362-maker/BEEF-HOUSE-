import React, { useState } from 'react';
import { BRAND_TOKENS } from '../config/siteConfig';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Preserves the exact original BEEF HOUSE logo supplied by the user
 * (/images/brand/beef-house-logo.png & /assets/aistudio/...).
 * Never redraws, distorts, stretches, or recolors the logo.
 * Uses uniform proportional scaling inside an overflow-hidden frame to trim only
 * the excess outer #000000 margin of the 2000x2000 canvas while keeping 1:1 geometry.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = false,
  onClick,
  className = '',
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = [BRAND_TOKENS.logoPath, BRAND_TOKENS.originalUploadedLogoPath];

  const dimensions = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div
        className={`relative ${dimensions} overflow-hidden rounded-lg bg-black shrink-0 flex items-center justify-center`}
      >
        <img
          src={sources[srcIndex]}
          alt="BEEF HOUSE | بيف هاوس — الشعار الأصلي"
          referrerPolicy="no-referrer"
          onError={() => {
            if (srcIndex < sources.length - 1) {
              setSrcIndex(srcIndex + 1);
            }
          }}
          className="w-full h-full object-contain scale-[2.12] transform-gpu pointer-events-none"
        />
      </div>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg md:text-xl font-bold tracking-wider text-[#E0D5CD] whitespace-nowrap">
            BEEF HOUSE
          </span>
          <span className="text-xs md:text-sm font-bold text-[#A20000] mt-1 whitespace-nowrap">
            بيف هاوس
          </span>
        </div>
      )}
    </div>
  );
};
