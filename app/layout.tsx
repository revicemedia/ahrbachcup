import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import InstagramTab from "@/components/InstagramTab/InstagramTab";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

const title = "40. Ahrbach Cup · 8.–10. Januar 2027 · Montabaur";
const description = "Das Jubiläumsturnier des TuS Ahrbach: drei Tage Fußballfest unterm Hallendach in den Kreissporthallen Montabaur.";

export const metadata: Metadata = {
  // Absolute Adresse für das Vorschaubild beim Teilen. Bis zur eigenen Domain die Vercel-Adresse;
  // später hier oder per NEXT_PUBLIC_SITE_URL umstellen.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahrbachcup.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Ahrbach Cup",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${googleSansFlex.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <InstagramTab />
      </body>
    </html>
  );
}
