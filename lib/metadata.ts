import { Metadata } from 'next';

interface OpenGraphMetadataParams {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function generateMetadata({
  title,
  description,
  url = 'https://roilabs.com.br',
  image = 'https://roilabs.com.br/og-image.png',
  type = 'website',
}: OpenGraphMetadataParams): Metadata {
  const fullTitle = `${title} | ROI Labs`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'CRM',
      'ERP',
      'Marketing Digital',
      'Gestão Empresarial',
      'Software de Gestão',
      'PME',
      'Automação',
      'ROI Labs',
      'Brasil',
    ],
    authors: [{ name: 'ROI Labs' }],
    creator: 'ROI Labs',
    publisher: 'ROI Labs',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'pt_BR',
      url,
      title: fullTitle,
      description,
      siteName: 'ROI Labs',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@roilabs',
      site: '@roilabs',
    },
    alternates: {
      canonical: url,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://roilabs.com.br'),
  title: {
    default: 'ROI Labs - Ecossistema Completo de Gestão Empresarial',
    template: '%s | ROI Labs',
  },
  description:
    'Transforme sua empresa com soluções integradas de CRM, ERP e Marketing Digital. ROI comprovado em até 6 meses.',
  keywords: [
    'CRM',
    'ERP',
    'Marketing Digital',
    'Gestão Empresarial',
    'Software de Gestão',
    'PME',
    'Automação',
    'ROI Labs',
    'Brasil',
    'Sirius CRM',
    'Orion ERP',
    'Vértice Marketing',
  ],
  authors: [{ name: 'ROI Labs', url: 'https://roilabs.com.br' }],
  creator: 'ROI Labs',
  publisher: 'ROI Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://roilabs.com.br',
    title: 'ROI Labs - Ecossistema Completo de Gestão Empresarial',
    description:
      'Transforme sua empresa com soluções integradas de CRM, ERP e Marketing Digital. ROI comprovado em até 6 meses.',
    siteName: 'ROI Labs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ROI Labs - Gestão Empresarial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Labs - Ecossistema Completo de Gestão Empresarial',
    description:
      'Transforme sua empresa com soluções integradas de CRM, ERP e Marketing Digital.',
    creator: '@roilabs',
    site: '@roilabs',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
};
