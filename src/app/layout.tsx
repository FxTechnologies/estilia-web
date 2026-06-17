import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://esstiliapp.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Estilia — Tu tiempo, tu estilo",
    template: "%s | Estilia",
  },
  description: "Reserva citas con los mejores profesionales de belleza y bienestar en Honduras. Barbería, salones, spas, maquillaje y más.",
  keywords: ["belleza", "bienestar", "barbería", "salón", "spa", "Honduras", "reservar cita", "estilia"],
  authors: [{ name: "Estilia" }],
  creator: "Estilia",
  openGraph: {
    type: "website",
    locale: "es_HN",
    url: SITE_URL,
    siteName: "Estilia",
    title: "Estilia — Tu tiempo, tu estilo",
    description: "Reserva citas con los mejores profesionales de belleza y bienestar en Honduras.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Estilia — Tu tiempo, tu estilo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estilia — Tu tiempo, tu estilo",
    description: "Reserva citas con los mejores profesionales de belleza y bienestar en Honduras.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
