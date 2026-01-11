import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Sobre | ROI Labs',
  description: 'Transformando negócios através da tecnologia',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white">
      <Navigation />

      <main className="max-w-content mx-auto px-8 py-32">
        <h1 className="text-display font-thin mb-6">Sobre a ROI Labs</h1>
        <p className="text-body text-text-secondary max-w-3xl">
          Transformando negócios através da tecnologia. Em breve mais informações.
        </p>
        {/* TODO: Implementar conforme wireframes FASE2_WIREFRAMES.md */}
      </main>

      <Footer />
    </div>
  );
}
