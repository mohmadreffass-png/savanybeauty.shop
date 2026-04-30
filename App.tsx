// Google Sheets / Apps Script integration

export interface OrderData {
  order_id: string;
  bundle: number;
  qty: number;
  price_sar: number;
  upsells: string;
  upsells_total: number;
  grand_total: number;
  name: string;
  phone_raw: string;
  phone_e164: string;
  city: string;
  district: string;
  address: string;
  landmark: string;
  delivery_time_pref: string;
  notes: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  user_agent: string;
  consent_checkbox: boolean;
  call_center_notes: string;
}

export async function submitOrder(data: OrderData): Promise<{ success: boolean; message: string }> {
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;

  if (!webhookUrl) {
    // Dev mode: log to console
    console.log('📋 ORDER SUBMITTED (dev mode - no webhook configured):', data);
    return { success: true, message: 'Order logged (dev mode)' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // Apps Script requires this
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    // no-cors mode always returns opaque response, so we assume success
    console.log('Order submitted to Google Sheets', response);
    return { success: true, message: 'Order submitted successfully' };
  } catch (error) {
    console.error('Failed to submit order:', error);
    return { success: false, message: 'Submission failed' };
  }
}

// Track Snapchat pixel event
export function trackSnapchatEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof (window as Window & { snaptrEvent?: (e: string, p?: Record<string, unknown>) => void }).snaptrEvent === 'function') {
    (window as Window & { snaptrEvent?: (e: string, p?: Record<string, unknown>) => void }).snaptrEvent!(event, params);
  }
}
