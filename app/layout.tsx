import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "40. Ahrbach Cup · 8.–10. Januar 2027 · Montabaur",
  description: "Das Jubiläumsturnier des TuS Ahrbach: drei Tage Fußballfest unterm Hallendach in den Kreissporthallen Montabaur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${googleSansFlex.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
