interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ROI Labs',
  url: 'https://roilabs.com.br',
  logo: 'https://roilabs.com.br/logo.png',
  description:
    'Ecossistema completo de gestão empresarial com soluções de CRM, ERP e Marketing Digital para PMEs brasileiras',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-11-0000-0000',
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: 'pt-BR',
  },
  sameAs: [
    'https://www.linkedin.com/company/roilabs',
    'https://twitter.com/roilabs',
    'https://github.com/roilabs',
    'https://www.youtube.com/@roilabs',
  ],
};

// Software Application Schema for Products
export function softwareApplicationSchema(product: {
  name: string;
  description: string;
  applicationCategory: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: product.applicationCategory,
    operatingSystem: 'Web',
    offers: product.offers && {
      '@type': 'Offer',
      price: product.offers.price,
      priceCurrency: product.offers.priceCurrency,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'ROI Labs',
    },
  };
}

// Article Schema for Blog Posts
export function articleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ROI Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://roilabs.com.br/logo.png',
      },
    },
  };
}

// Breadcrumb Schema
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ Schema
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
