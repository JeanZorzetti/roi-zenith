import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROI Labs - SDR AI para Pré-Vendas | Inteligência Artificial B2B",
  description: "SDR AI que qualifica prospects, aumenta conversão em 3x e reduz CAC. Solução completa de pré-vendas com IA para SaaS, Fintechs e Startups.",
  authors: [{ name: "ROI Labs" }],
  keywords: ["SDR AI", "pré-vendas artificial", "qualificação de leads", "inteligência artificial B2B", "automação de vendas", "ROI Labs", "lead qualification", "sales AI"],
  openGraph: {
    type: "website",
    title: "ROI Labs - SDR AI para Pré-Vendas | 3x Mais Conversão",
    description: "SDR AI que qualifica prospects automaticamente, aumenta conversão em 3x e reduz custos. Solução premium para empresas B2B.",
    url: "/",
    siteName: "ROI Labs",
    images: [
      {
        url: "https://roilabs.com.br/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROI Labs - SDR AI para Pré-Vendas",
    description: "SDR AI que qualifica prospects e aumenta conversão em 3x. Automação inteligente para equipes de vendas B2B.",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
