import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';
import ContactFAQ from '@/components/sections/ContactFAQ';

export const metadata: Metadata = {
  title: 'Contato | ROI Labs',
  description: 'Entre em contato com a ROI Labs. Estamos aqui para ajudar seu negócio a crescer.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-content mx-auto text-center">
          <h1 className="text-display font-thin mb-6">Entre em Contato</h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Estamos aqui para ajudar seu negócio a crescer
          </p>
        </div>
      </section>

      {/* Main Contact Section - Two Columns */}
      <section className="py-16 px-8">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info - 1 column */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-8">
        <div className="max-w-content mx-auto">
          <ContactFAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 bg-gradient-to-b from-gray-950 to-pure-black">
        <div className="max-w-content mx-auto text-center">
          <h2 className="text-h2 font-light mb-6">Prefere agendar uma demonstração?</h2>
          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            Veja o ROI Labs em ação com um especialista do nosso time
          </p>
          <a
            href="#"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded text-lg font-light tracking-wide transition-all hover:scale-105"
          >
            Agendar Demo →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
