@import "tailwindcss";

@layer base {
  :root {
    --color-primary: #0d3d2e;
    --color-primary-light: #1a5c44;
    --color-accent: #c9a84c;
    --color-accent-light: #e4c97e;
    --color-cream: #faf7f2;
    --color-warm-gray: #f5f2ed;
  }

  html {
    font-family: 'Cairo', 'Inter', sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: #faf7f2;
    color: #1a1a1a;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  [dir="rtl"] {
    text-align: right;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cairo', sans-serif;
    font-weight: 700;
  }

  .font-en {
    font-family: 'Inter', sans-serif;
    direction: ltr;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #c9a84c;
    border-radius: 3px;
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    80%, 100% { transform: scale(2); opacity: 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  /* Gold shimmer effect */
  .gold-shimmer {
    background: linear-gradient(
      90deg,
      #c9a84c 0%,
      #e4c97e 25%,
      #c9a84c 50%,
      #e4c97e 75%,
      #c9a84c 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Premium card */
  .premium-card {
    background: white;
    border: 1px solid rgba(201, 168, 76, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(13, 61, 46, 0.06);
    transition: all 0.3s ease;
  }

  .premium-card:hover {
    box-shadow: 0 8px 40px rgba(13, 61, 46, 0.12);
    transform: translateY(-2px);
  }

  /* Bundle card selected state */
  .bundle-selected {
    border: 2px solid #c9a84c !important;
    background: linear-gradient(135deg, #faf7f2 0%, #fff9ef 100%) !important;
    box-shadow: 0 8px 32px rgba(201, 168, 76, 0.2) !important;
  }

  /* Button styles */
  .btn-primary {
    background: linear-gradient(135deg, #0d3d2e 0%, #1a5c44 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Cairo', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    padding: 16px 32px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(13, 61, 46, 0.3);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: 0.01em;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #1a5c44 0%, #0d3d2e 100%);
    box-shadow: 0 8px 24px rgba(13, 61, 46, 0.4);
    transform: translateY(-1px);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  .btn-gold {
    background: linear-gradient(135deg, #c9a84c 0%, #e4c97e 50%, #c9a84c 100%);
    color: #0d3d2e;
    border: none;
    border-radius: 12px;
    font-family: 'Cairo', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    padding: 16px 32px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(201, 168, 76, 0.4);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-gold:hover {
    box-shadow: 0 8px 24px rgba(201, 168, 76, 0.5);
    transform: translateY(-1px);
  }

  /* Form inputs */
  .form-input {
    width: 100%;
    border: 1.5px solid #e2ddd8;
    border-radius: 10px;
    padding: 14px 16px;
    font-family: 'Cairo', sans-serif;
    font-size: 0.95rem;
    color: #1a1a1a;
    background: white;
    transition: all 0.2s ease;
    outline: none;
    direction: rtl;
  }

  .form-input:focus {
    border-color: #c9a84c;
    box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
  }

  .form-input.error {
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }

  .form-label {
    display: block;
    font-family: 'Cairo', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 6px;
  }

  .form-error {
    color: #e53e3e;
    font-size: 0.8rem;
    margin-top: 4px;
    font-family: 'Cairo', sans-serif;
  }

  /* Stars */
  .stars {
    color: #c9a84c;
    letter-spacing: 2px;
  }

  /* Sticky mobile CTA */
  .sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding: 12px 20px;
    background: white;
    border-top: 1px solid rgba(201, 168, 76, 0.3);
    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
  }

  /* Badge */
  .badge-gold {
    background: linear-gradient(135deg, #c9a84c, #e4c97e);
    color: #0d3d2e;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    display: inline-block;
  }

  .badge-green {
    background: #0d3d2e;
    color: white;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    display: inline-block;
  }

  /* Divider */
  .gold-divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, #c9a84c, transparent);
    border: none;
  }

  /* WhatsApp button */
  .btn-whatsapp {
    background: #25D366;
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Cairo', sans-serif;
    font-weight: 700;
    padding: 14px 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
    width: 100%;
  }

  .btn-whatsapp:hover {
    background: #1da851;
    transform: translateY(-1px);
  }

  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 998;
    backdrop-filter: blur(4px);
  }

  /* Slide panel */
  .slide-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 999;
    overflow-y: auto;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .slide-panel.open {
    transform: translateY(0);
  }

  /* Trust badge icons */
  .trust-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0d3d2e, #1a5c44);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c9a84c;
    font-size: 1.4rem;
    margin: 0 auto 12px;
  }

  /* Section headings */
  .section-title {
    font-family: 'Cairo', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #0d3d2e;
    text-align: center;
    margin-bottom: 8px;
  }

  .section-subtitle {
    font-family: 'Cairo', sans-serif;
    font-size: 1rem;
    color: #6b7280;
    text-align: center;
    margin-bottom: 40px;
  }

  /* Review card */
  .review-card {
    background: white;
    border: 1px solid rgba(201, 168, 76, 0.15);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }

  /* Checkbox custom */
  input[type="checkbox"].custom-check {
    width: 20px;
    height: 20px;
    accent-color: #0d3d2e;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Progress step */
  .progress-step {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.85rem;
  }

  .progress-step.active {
    background: #0d3d2e;
    color: #c9a84c;
  }

  .progress-step.done {
    background: #c9a84c;
    color: #0d3d2e;
  }

  .progress-step.inactive {
    background: #e5e7eb;
    color: #9ca3af;
  }
}
