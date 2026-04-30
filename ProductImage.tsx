interface ProductImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'bottle' | 'box' | 'hero';
}

export default function ProductImage({
  className = '',
  size = 'md',
  variant = 'bottle',
}: ProductImageProps) {
  const sizes = { sm: 160, md: 240, lg: 340 };
  const w = sizes[size];
  const h = Math.round(w * 1.35);

  if (variant === 'hero') {
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 340 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`animate-float ${className}`}
      >
        {/* Glow */}
        <ellipse cx="170" cy="440" rx="90" ry="16" fill="rgba(201,168,76,0.2)" />

        {/* Bottle body */}
        <rect x="100" y="80" width="140" height="320" rx="30" fill="url(#bottleGrad)" />

        {/* Glass highlight */}
        <rect x="110" y="90" width="30" height="200" rx="15" fill="rgba(255,255,255,0.15)" />

        {/* Cap */}
        <rect x="120" y="50" width="100" height="45" rx="12" fill="url(#capGrad)" />

        {/* Cap detail */}
        <rect x="128" y="60" width="84" height="6" rx="3" fill="rgba(255,255,255,0.3)" />

        {/* Label background */}
        <rect x="108" y="140" width="124" height="200" rx="16" fill="white" opacity="0.95" />

        {/* Label - Brand name */}
        <text x="170" y="175" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="11" fill="#0d3d2e" letterSpacing="3">
          SAVANY
        </text>
        <line x1="118" y1="181" x2="222" y2="181" stroke="#c9a84c" strokeWidth="1" />
        <text x="170" y="194" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="400" fontSize="7" fill="#c9a84c" letterSpacing="4">
          BEAUTY
        </text>

        {/* Product name */}
        <text x="170" y="220" textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight="700" fontSize="10" fill="#0d3d2e">
          شعر · بشرة · أظافر
        </text>

        {/* Gummies illustration */}
        <circle cx="148" cy="255" r="12" fill="url(#gummy1)" />
        <circle cx="170" cy="248" r="14" fill="url(#gummy2)" />
        <circle cx="193" cy="255" r="12" fill="url(#gummy1)" />
        <circle cx="158" cy="272" r="11" fill="url(#gummy2)" />
        <circle cx="182" cy="272" r="11" fill="url(#gummy1)" />

        {/* 60 gummies */}
        <text x="170" y="308" textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight="800" fontSize="22" fill="#0d3d2e">
          60
        </text>
        <text x="170" y="322" textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight="400" fontSize="8" fill="#6b7280">
          GUMMIES / 30 DAYS
        </text>

        {/* Supplement fact */}
        <text x="170" y="338" textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight="400" fontSize="7" fill="#9ca3af">
          مكمل غذائي · Dietary Supplement
        </text>

        {/* Gold accent lines on bottle */}
        <rect x="100" y="115" width="140" height="3" rx="1.5" fill="url(#goldLine)" opacity="0.6" />
        <rect x="100" y="385" width="140" height="3" rx="1.5" fill="url(#goldLine)" opacity="0.6" />

        {/* Stars */}
        <text x="170" y="360" textAnchor="middle" fontSize="14" fill="#c9a84c">★★★★★</text>

        <defs>
          <linearGradient id="bottleGrad" x1="100" y1="80" x2="240" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0d3d2e" />
            <stop offset="50%" stopColor="#1a5c44" />
            <stop offset="100%" stopColor="#0a2e20" />
          </linearGradient>
          <linearGradient id="capGrad" x1="120" y1="50" x2="220" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="50%" stopColor="#e4c97e" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
          <linearGradient id="goldLine" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="gummy1" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#e4c97e" />
          </linearGradient>
          <linearGradient id="gummy2" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#0d3d2e" />
            <stop offset="100%" stopColor="#1a5c44" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (variant === 'box') {
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Box front */}
        <rect x="20" y="40" width="160" height="220" rx="8" fill="url(#boxGrad)" />
        {/* Box side */}
        <polygon points="180,40 220,20 220,240 180,260" fill="url(#boxSide)" />
        {/* Box top */}
        <polygon points="20,40 60,20 220,20 180,40" fill="url(#boxTop)" />

        {/* Label on front */}
        <rect x="30" y="80" width="140" height="160" rx="6" fill="white" opacity="0.95" />
        <text x="100" y="115" textAnchor="middle" fontFamily="Georgia" fontWeight="700" fontSize="10" fill="#0d3d2e" letterSpacing="2">
          SAVANY
        </text>
        <line x1="38" y1="121" x2="162" y2="121" stroke="#c9a84c" strokeWidth="0.8" />
        <text x="100" y="132" textAnchor="middle" fontFamily="Georgia" fontWeight="400" fontSize="6" fill="#c9a84c" letterSpacing="4">
          BEAUTY
        </text>
        <text x="100" y="160" textAnchor="middle" fontFamily="Cairo" fontWeight="700" fontSize="9" fill="#0d3d2e">
          شعر · بشرة · أظافر
        </text>
        <text x="100" y="195" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="20" fill="#0d3d2e">60</text>
        <text x="100" y="208" textAnchor="middle" fontFamily="Arial" fontWeight="400" fontSize="7" fill="#6b7280">GUMMIES</text>
        <text x="100" y="230" textAnchor="middle" fontSize="12" fill="#c9a84c">★★★★★</text>

        <defs>
          <linearGradient id="boxGrad" x1="20" y1="40" x2="180" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0d3d2e" />
            <stop offset="100%" stopColor="#1a5c44" />
          </linearGradient>
          <linearGradient id="boxSide" x1="180" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0a2e20" />
            <stop offset="100%" stopColor="#082418" />
          </linearGradient>
          <linearGradient id="boxTop" x1="0" y1="20" x2="0" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a5c44" />
            <stop offset="100%" stopColor="#0d3d2e" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Default: bottle
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="60" y="40" width="80" height="210" rx="20" fill="url(#smBottleGrad)" />
      <rect x="65" y="46" width="18" height="130" rx="9" fill="rgba(255,255,255,0.12)" />
      <rect x="74" y="20" width="52" height="30" rx="8" fill="url(#smCapGrad)" />
      <rect x="68" y="90" width="64" height="120" rx="10" fill="white" opacity="0.95" />
      <text x="100" y="115" textAnchor="middle" fontFamily="Georgia" fontWeight="700" fontSize="7" fill="#0d3d2e" letterSpacing="2">SAVANY</text>
      <line x1="72" y1="119" x2="128" y2="119" stroke="#c9a84c" strokeWidth="0.6" />
      <text x="100" y="128" textAnchor="middle" fontFamily="Georgia" fontSize="5" fill="#c9a84c" letterSpacing="3">BEAUTY</text>
      <text x="100" y="152" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="16" fill="#0d3d2e">60</text>
      <text x="100" y="163" textAnchor="middle" fontFamily="Arial" fontSize="5" fill="#6b7280">GUMMIES</text>
      <text x="100" y="200" textAnchor="middle" fontSize="10" fill="#c9a84c">★★★★★</text>
      <defs>
        <linearGradient id="smBottleGrad" x1="60" y1="40" x2="140" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0d3d2e" />
          <stop offset="100%" stopColor="#1a5c44" />
        </linearGradient>
        <linearGradient id="smCapGrad" x1="74" y1="20" x2="126" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#e4c97e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
