'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  interest: z.string().min(1, 'Selecione uma opção'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  consent: z.boolean().refine((val) => val === true, 'Você deve aceitar receber comunicações'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Implement Server Action for form submission
      // await submitContactForm(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      reset();
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8">
      <h2 className="text-h3 font-light mb-2">Como podemos ajudar?</h2>
      <p className="text-sm text-text-muted mb-8">
        Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Seu nome completo"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="seu@email.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        {/* Company */}
        <div>
          <Label htmlFor="company">Empresa</Label>
          <Input id="company" {...register('company')} placeholder="Nome da sua empresa" />
        </div>

        {/* Interest */}
        <div>
          <Label htmlFor="interest">Interesse em: *</Label>
          <select
            id="interest"
            {...register('interest')}
            className={`w-full bg-gray-900 border ${
              errors.interest ? 'border-red-500' : 'border-white/10'
            } rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="">Selecione uma solução</option>
            <option value="sirius-crm">Sirius CRM</option>
            <option value="orion-erp">Orion ERP</option>
            <option value="vertice-marketing">Vértice Marketing</option>
            <option value="all">Todas as soluções</option>
            <option value="other">Outro</option>
          </select>
          {errors.interest && (
            <p className="text-xs text-red-400 mt-1">{errors.interest.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message">Mensagem *</Label>
          <textarea
            id="message"
            {...register('message')}
            placeholder="Conte-nos mais sobre suas necessidades..."
            rows={5}
            className={`w-full bg-gray-900 border ${
              errors.message ? 'border-red-500' : 'border-white/10'
            } rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none`}
          />
          {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="consent"
            {...register('consent')}
            className="mt-1 w-4 h-4 rounded border-white/10 bg-gray-900 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
            Aceito receber comunicações da ROI Labs sobre produtos, serviços e eventos.
          </Label>
        </div>
        {errors.consent && <p className="text-xs text-red-400">{errors.consent.message}</p>}

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem →'}
        </Button>
      </form>
    </div>
  );
}
