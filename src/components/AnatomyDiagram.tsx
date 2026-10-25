import React from 'react';
import { Language } from '../config/siteConfig';

interface AnatomyDiagramProps {
  activeZone?: 'rib' | 'short-loin' | 'sirloin' | 'chuck' | 'brisket' | 'shank' | 'round' | 'all';
  onSelectZone?: (
    zone: 'rib' | 'short-loin' | 'sirloin' | 'chuck' | 'brisket' | 'shank' | 'round'
  ) => void;
  lang: Language;
}

const ZONES: {
  id: 'chuck' | 'rib' | 'short-loin' | 'sirloin' | 'round' | 'brisket' | 'shank';
  labelAr: string;
  labelEn: string;
  cutExamplesAr: string;
  cutExamplesEn: string;
  path: string;
  labelX: number;
  labelY: number;
}[] = [
  {
    id: 'chuck',
    labelAr: 'الرقبة والكتف (Chuck)',
    labelEn: 'Chuck & Shoulder',
    cutExamplesAr: 'مكعبات الطبخ · المفروم · البرجر',
    cutExamplesEn: 'Braising Cubes · Mince · Burgers',
    path: 'M 145,95 L 235,88 L 235,195 L 145,195 Z',
    labelX: 190,
    labelY: 145,
  },
  {
    id: 'rib',
    labelAr: 'الأضلاع (Rib)',
    labelEn: 'Rib Primal',
    cutExamplesAr: 'ريب آي · توماهوك · شورت ريبس',
    cutExamplesEn: 'Ribeye · Tomahawk · Short Ribs',
    path: 'M 239,88 L 345,88 L 345,195 L 239,195 Z',
    labelX: 292,
    labelY: 145,
  },
  {
    id: 'short-loin',
    labelAr: 'بيت الكلاوي (Short Loin)',
    labelEn: 'Short Loin',
    cutExamplesAr: 'ستريب لوين · تي بون · تندرلوين',
    cutExamplesEn: 'Striploin · T-Bone · Tenderloin',
    path: 'M 349,88 L 445,90 L 445,195 L 349,195 Z',
    labelX: 397,
    labelY: 145,
  },
  {
    id: 'sirloin',
    labelAr: 'السيرلوين والفيليه (Sirloin)',
    labelEn: 'Sirloin & Filet',
    cutExamplesAr: 'فيليه مينيون · توب سيرلوين',
    cutExamplesEn: 'Filet Mignon · Top Sirloin',
    path: 'M 449,90 L 525,94 L 525,195 L 449,195 Z',
    labelX: 487,
    labelY: 145,
  },
  {
    id: 'round',
    labelAr: 'الفخذ الخلفي (Round)',
    labelEn: 'Round Primal',
    cutExamplesAr: 'روستو · شرائح التحمير والطبخ',
    cutExamplesEn: 'Roasts · Lean Braising Cuts',
    path: 'M 529,94 L 615,110 L 605,245 L 529,245 Z',
    labelX: 568,
    labelY: 170,
  },
  {
    id: 'brisket',
    labelAr: 'الصدر والأضلاع السفلية (Brisket & Plate)',
    labelEn: 'Brisket & Short Plate',
    cutExamplesAr: 'بريسكت التدخين · أسادو · برجر',
    cutExamplesEn: 'Smoking Brisket · Asado · Burger Blend',
    path: 'M 145,199 L 365,199 L 365,255 L 155,255 Z',
    labelX: 255,
    labelY: 230,
  },
  {
    id: 'shank',
    labelAr: 'الساق / الموزة (Shank)',
    labelEn: 'Foreshank & Hindshank',
    cutExamplesAr: 'أوسو بوكو بالعظم · مرق وكبسة',
    cutExamplesEn: 'Osso Buco Marrow Shank · Kabsa',
    path: 'M 160,259 L 225,259 L 218,335 L 168,335 Z M 532,249 L 595,249 L 585,335 L 538,335 Z',
    labelX: 192,
    labelY: 298,
  },
];

export const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({
  activeZone = 'all',
  onSelectZone,
  lang,
}) => {
  return (
    <div className="w-full bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="bh-eyebrow">
            {lang === 'ar' ? 'الخريطة التشريحية للقطعيات' : 'Anatomical Primal Cuts Map'}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-[#E0D5CD] mt-2">
            {lang === 'ar'
              ? 'موقع القطعية يحدد طراوتها وطريقة طهيها المثالية'
              : 'Cut Location Determines Tenderness & Ideal Cooking Method'}
          </h3>
        </div>
        <p className="text-sm text-[#9E938B] max-w-md">
          {lang === 'ar'
            ? 'العضلات العلوية البعيدة عن الحركة (الأضلاع وبيت الكلاوي) هي الأطرى للستيك والشواء السريع، بينما عضلات الحركة (الموزة والرقبة والصدر) هي الأغنى بالنكهة للطبخ البطيء والتدخين.'
            : 'Upper muscles low in motion (Rib & Loin) yield the most tender steaks, while active muscles (Shank, Chuck, Brisket) deliver rich collagen for slow braising and smoking.'}
        </p>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox="0 0 720 380"
          className="w-full max-w-4xl mx-auto h-auto select-none"
          role="img"
          aria-label={
            lang === 'ar'
              ? 'مخطط توضيحي لأقسام قطعيات اللحم البقري'
              : 'Diagram of Beef Primal Cuts'
          }
        >
          {/* Subtle grid lines */}
          <line x1="40" y1="340" x2="680" y2="340" stroke="rgba(224,213,205,0.12)" strokeWidth="1" />
          {/* Head & Neck silhouette */}
          <path
            d="M 55,135 L 95,90 L 140,95 L 140,210 L 95,205 L 55,165 Z"
            fill="rgba(224,213,205,0.04)"
            stroke="rgba(224,213,205,0.22)"
            strokeWidth="1.5"
          />
          {/* Flank area */}
          <path
            d="M 369,199 L 525,199 L 525,255 L 369,255 Z"
            fill="rgba(224,213,205,0.04)"
            stroke="rgba(224,213,205,0.18)"
            strokeWidth="1.5"
          />
          <text
            x="447"
            y="231"
            textAnchor="middle"
            fill="#9E938B"
            fontSize="11"
            fontWeight="500"
          >
            {lang === 'ar' ? 'الخاصرة (Flank)' : 'Flank'}
          </text>

          {/* Interactive Primal Zones */}
          {ZONES.map((z) => {
            const isSelected = activeZone === z.id;
            return (
              <g
                key={z.id}
                onClick={() => onSelectZone && onSelectZone(z.id)}
                className={onSelectZone ? 'cursor-pointer group' : ''}
              >
                <path
                  d={z.path}
                  fill={
                    isSelected
                      ? 'rgba(162, 0, 0, 0.72)'
                      : activeZone === 'all'
                      ? 'rgba(162, 0, 0, 0.18)'
                      : 'rgba(224, 213, 205, 0.06)'
                  }
                  stroke={isSelected ? '#E6061E' : '#E0D5CD'}
                  strokeOpacity={isSelected ? 1 : 0.35}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  className="transition-all duration-200 hover:fill-[#A20000]/55"
                />
                <text
                  x={z.labelX}
                  y={z.labelY - 6}
                  textAnchor="middle"
                  fill="#E0D5CD"
                  fontSize="12"
                  fontWeight="700"
                >
                  {lang === 'ar' ? z.labelAr.split(' (')[0] : z.labelEn}
                </text>
                <text
                  x={z.labelX}
                  y={z.labelY + 12}
                  textAnchor="middle"
                  fill={isSelected ? '#E0D5CD' : '#9E938B'}
                  fontSize="9.5"
                >
                  {lang === 'ar' ? z.cutExamplesAr.split(' · ')[0] : z.cutExamplesEn.split(' · ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Zone Selector Legend */}
      {onSelectZone && (
        <div className="mt-6 pt-5 border-t border-[#E0D5CD]/10 flex flex-wrap gap-2">
          {ZONES.map((z) => {
            const isSelected = activeZone === z.id;
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => onSelectZone(z.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#A20000] text-[#E0D5CD] border border-[#E6061E]'
                    : 'bg-black text-[#E0D5CD]/80 border border-[#E0D5CD]/15 hover:border-[#E0D5CD]/40'
                }`}
              >
                {lang === 'ar' ? z.labelAr : z.labelEn}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
