import { FadeIn } from '@/components/animations';

export default function AboutHero() {
  return (
    <section className="pt-32 pb-24 px-8 bg-gradient-to-b from-pure-black to-gray-950 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px]" />

      <div className="max-w-content mx-auto relative z-10">
        <FadeIn className="text-center">
          <h1 className="text-display font-thin mb-8">
            Transformando negócios
            <br />
            através da tecnologia
          </h1>
          <p className="text-subtitle text-text-secondary max-w-3xl mx-auto">
            A ROI Labs é uma empresa brasileira de tecnologia especializada em soluções integradas
            de gestão empresarial. Combinamos CRM, ERP, Marketing e gestão industrial em uma única
            plataforma.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
