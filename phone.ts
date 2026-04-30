// Saudi phone number validation and normalization

export function normalizeSaudiPhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Handle various formats:
  // 05XXXXXXXX -> +9665XXXXXXXX
  // 5XXXXXXXX -> +9665XXXXXXXX
  // 9665XXXXXXXX -> +9665XXXXXXXX
  // +9665XXXXXXXX -> +9665XXXXXXXX

  if (digits.startsWith('966')) {
    return '+' + digits;
  }
  if (digits.startsWith('05')) {
    return '+966' + digits.slice(1);
  }
  if (digits.startsWith('5') && digits.length === 9) {
    return '+966' + digits;
  }
  if (digits.startsWith('00966')) {
    return '+' + digits.slice(2);
  }

  return '+966' + digits;
}

export function validateSaudiPhone(phone: string): boolean {
  const normalized = normalizeSaudiPhone(phone);
  // Saudi mobile: +9665XXXXXXXX (12 digits total after +)
  return /^\+9665[0-9]{8}$/.test(normalized);
}

export function formatPhoneDisplay(phone: string): string {
  const normalized = normalizeSaudiPhone(phone);
  if (normalized.startsWith('+9665')) {
    const local = normalized.slice(4); // 5XXXXXXXX
    return `0${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7)}`;
  }
  return phone;
}

// Capture UTM params from URL
export function captureUTM(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    referrer: document.referrer || '',
    user_agent: navigator.userAgent || '',
  };
}

// Generate order ID
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SVB-${timestamp}-${random}`;
}
