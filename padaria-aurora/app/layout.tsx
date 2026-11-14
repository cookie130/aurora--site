import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = { metadataBase: new URL(site.origin), title: { default: "Padaria Aurora — Feito com tempo", template: "%s | Padaria Aurora" }, description: site.description, icons: { icon: "/icon.svg" }, openGraph: { type: "website", locale: "pt_BR", siteName: site.name, title: site.name, description: site.description, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Padaria Aurora — Feito com tempo. Servido com carinho." }] }, twitter: { card: "summary_large_image" }, robots: { index: false, follow: true } };
export const viewport: Viewport = { themeColor: "#F6F0E6" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo" tabIndex={-1}>{children}</main><Footer/></body></html>; }
