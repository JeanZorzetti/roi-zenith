import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { contactService } from '@/services/contactService';
import type { ContactRequest } from '@/types/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres')
});

type ContactData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema)
  });

  // Pre-fill form if coming from CTA buttons
  useEffect(() => {
    if (location.state?.subject) {
      setValue('subject', location.state.subject);
    }
    if (location.state?.message) {
      setValue('message', location.state.message);
    }
  }, [location.state, setValue]);

  const onSubmit = async (data: ContactData) => {
    setIsSubmitting(true);

    try {
      const contactData: ContactRequest = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        subject: data.subject,
        message: data.message
      };

      const response = await contactService.submitContact(contactData);

      if (response.success) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Nossa equipe entrará em contato em breve.",
          duration: 5000
        });
        reset();
      } else {
        throw new Error(response.error || 'Erro ao enviar mensagem');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <AnimatedSection className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pronto para revolucionar suas vendas com SDR AI? Vamos conversar sobre suas necessidades.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo *
                </Label>
                <Input
                  {...register('name')}
                  type="text"
                  className="bg-gray-900 border-gray-700 text-white focus:border-primary-400"
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Empresarial *
                </Label>
                <Input
                  {...register('email')}
                  type="email"
                  className="bg-gray-900 border-gray-700 text-white focus:border-primary-400"
                  placeholder="seu.email@empresa.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">
                    Empresa
                  </Label>
                  <Input
                    {...register('company')}
                    type="text"
                    className="bg-gray-900 border-gray-700 text-white focus:border-primary-400"
                    placeholder="Nome da empresa"
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone
                  </Label>
                  <Input
                    {...register('phone')}
                    type="tel"
                    className="bg-gray-900 border-gray-700 text-white focus:border-primary-400"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Assunto *
                </Label>
                <Input
                  {...register('subject')}
                  type="text"
                  className="bg-gray-900 border-gray-700 text-white focus:border-primary-400"
                  placeholder="Interesse em SDR AI"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem *
                </Label>
                <Textarea
                  {...register('message')}
                  rows={5}
                  className="bg-gray-900 border-gray-700 text-white focus:border-primary-400 resize-none"
                  placeholder="Conte-nos sobre seu projeto e como podemos ajudar com SDR AI..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Informações de Contato</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-primary-400">Email:</strong><br />
                  contato@roilabs.com.br
                </p>
                <p>
                  <strong className="text-primary-400">Telefone:</strong><br />
                  +55 (11) 9999-9999
                </p>
                <p>
                  <strong className="text-primary-400">Endereço:</strong><br />
                  Av. Paulista, 1000<br />
                  São Paulo, SP - 01310-100
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Horário de Atendimento</h3>
              <div className="text-gray-300">
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 12h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-900/20 to-secondary-900/20 p-6 rounded-lg border border-primary-500/30">
              <h4 className="text-lg font-semibold text-white mb-2">🚀 Resposta Rápida</h4>
              <p className="text-gray-300 text-sm">
                Mensagens sobre SDR AI são priorizadas e respondidas em até 2 horas durante horário comercial.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactPage;