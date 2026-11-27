/**
 * Contact details used by the residence pages.
 * The number is the Silverglades sales-enquiry line already used elsewhere on the site.
 * WhatsApp: confirm this number is active on WhatsApp, or override it with VITE_WHATSAPP_NUMBER
 * (digits only, with country code, e.g. 919876543210).
 */
const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;

export const CONTACT = {
  phoneDisplay: "+91 88820 12012",
  phoneTel: "tel:+918882012012",
  whatsappNumber: (env?.["VITE_WHATSAPP_NUMBER"] ?? "918882012012").replace(/\D/g, ""),
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}