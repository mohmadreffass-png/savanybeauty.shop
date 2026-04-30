interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
  dark?: boolean;
}

export default function Logo({ variant = 'full', className = '', dark = false }: LogoProps) {
  const primaryColor = dark ? '#ffffff' : '#0d3d2e';
  const accentColor = '#c9a84c';

  if (variant === 'icon') {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Circle background */}
        <circle cx="20" cy="20" r="20" fill={primaryColor} />
        {/* S monogram */}
        <text
          x="20"
          y="27"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="700"
          fontSize="22"
          fill={accentColor}
          letterSpacing="-1"
        >
          S
        </text>
        {/* Decorative dots */}
        <circle cx="10" cy="20" r="1.5" fill={accentColor} opacity="0.6" />
        <circle cx="30" cy="20" r="1.5" fill={accentColor} opacity="0.6" />
      </svg>
    );
  }

  return (
    <svg
      width="200"
      height="48"
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon part */}
      <circle cx="24" cy="24" r="20" fill={primaryColor} />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="22"
        fill={accentColor}
      >
        S
      </text>
      <circle cx="14" cy="24" r="1.5" fill={accentColor} opacity="0.5" />
      <circle cx="34" cy="24" r="1.5" fill={accentColor} opacity="0.5" />

      {/* Text part */}
      <text
        x="52"
        y="19"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="15"
        fill={primaryColor}
        letterSpacing="3"
      >
        SAVANY
      </text>
      {/* Gold underline */}
      <line x1="52" y1="22" x2="148" y2="22" stroke={accentColor} strokeWidth="1" opacity="0.6" />
      <text
        x="52"
        y="37"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="400"
        fontSize="11"
        fill={accentColor}
        letterSpacing="5"
      >
        BEAUTY
      </text>
      {/* Arabic tagline */}
      <text
        x="197"
        y="14"
        fontFamily="Cairo, sans-serif"
        fontWeight="300"
        fontSize="9"
        fill={dark ? '#e4c97e' : '#6b7280'}
        textAnchor="end"
        direction="rtl"
      >
        سافاني بيوتي
      </text>
    </svg>
  );
}
