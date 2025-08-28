import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const leadCaptureSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa é obrigatório'),
  role: z.string().min(1, 'Cargo é obrigatório'),
  companySector: z.string().min(1, 'Setor da empresa é obrigatório'),
  teamSize: z.string().min(1, 'Tamanho da equipe é obrigatório'),
  currentChallenges: z.string().min(10, 'Descreva seus desafios (mínimo 10 caracteres)'),
  monthlyLeads: z.string().min(1, 'Volume de leads é obrigatório'),
  budget: z.string().min(1, 'Orçamento é obrigatório'),
  timeline: z.string().min(1, 'Timeline é obrigatório'),
  gdprConsent: z.boolean().refine(val => val === true, 'Consentimento é obrigatório'),
  marketingConsent: z.boolean().optional()
});

type LeadCaptureData = z.infer<typeof leadCaptureSchema>;

interface LeadCaptureFormProps {
  onSubmit: (data: LeadCaptureData) => void;
  isLoading?: boolean;
}

const LeadCaptureForm = ({ onSubmit, isLoading = false }: LeadCaptureFormProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<LeadCaptureData>({
    resolver: zodResolver(leadCaptureSchema)
  });

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Informações Básicas</h3>
        <p className="text-gray-400">Conte-nos sobre você e sua empresa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-300">Nome Completo *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Seu nome completo"
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-300">Email Corporativo *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="seu.email@empresa.com"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company" className="text-gray-300">Empresa *</Label>
          <Input
            id="company"
            {...register('company')}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Nome da sua empresa"
          />
          {errors.company && (
            <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role" className="text-gray-300">Cargo *</Label>
          <Input
            id="role"
            {...register('role')}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="CEO, VP Sales, etc."
          />
          {errors.role && (
            <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Contexto de Negócio</h3>
        <p className="text-gray-400">Ajude-nos a entender suas necessidades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Setor da Empresa *</Label>
          <Select onValueChange={(value) => setValue('companySector', value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS B2B</SelectItem>
              <SelectItem value="fintech">Fintech</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="startup">Tech Startup</SelectItem>
              <SelectItem value="consulting">Consultoria</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
          {errors.companySector && (
            <p className="text-red-400 text-xs mt-1">{errors.companySector.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-300">Tamanho da Equipe de Vendas *</Label>
          <Select onValueChange={(value) => setValue('teamSize', value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Tamanho da equipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 pessoas</SelectItem>
              <SelectItem value="6-15">6-15 pessoas</SelectItem>
              <SelectItem value="16-50">16-50 pessoas</SelectItem>
              <SelectItem value="51+">51+ pessoas</SelectItem>
            </SelectContent>
          </Select>
          {errors.teamSize && (
            <p className="text-red-400 text-xs mt-1">{errors.teamSize.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Volume Mensal de Leads *</Label>
          <Select onValueChange={(value) => setValue('monthlyLeads', value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Leads por mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<100">Menos de 100</SelectItem>
              <SelectItem value="100-500">100-500</SelectItem>
              <SelectItem value="500-1000">500-1000</SelectItem>
              <SelectItem value="1000+">1000+</SelectItem>
            </SelectContent>
          </Select>
          {errors.monthlyLeads && (
            <p className="text-red-400 text-xs mt-1">{errors.monthlyLeads.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-300">Orçamento Mensal *</Label>
          <Select onValueChange={(value) => setValue('budget', value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Faixa de orçamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<5k">Menos de R$ 5.000</SelectItem>
              <SelectItem value="5k-15k">R$ 5.000 - R$ 15.000</SelectItem>
              <SelectItem value="15k-30k">R$ 15.000 - R$ 30.000</SelectItem>
              <SelectItem value="30k+">Mais de R$ 30.000</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="currentChallenges" className="text-gray-300">Principais Desafios *</Label>
        <Textarea
          id="currentChallenges"
          {...register('currentChallenges')}
          className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
          placeholder="Descreva seus principais desafios em pré-vendas e qualificação de leads..."
        />
        {errors.currentChallenges && (
          <p className="text-red-400 text-xs mt-1">{errors.currentChallenges.message}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Timeline e Consentimento</h3>
        <p className="text-gray-400">Últimos detalhes para personalizarmos sua proposta</p>
      </div>

      <div>
        <Label className="text-gray-300">Quando gostaria de implementar? *</Label>
        <Select onValueChange={(value) => setValue('timeline', value)}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Timeline de implementação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Imediatamente</SelectItem>
            <SelectItem value="30days">Próximos 30 dias</SelectItem>
            <SelectItem value="90days">Próximos 90 dias</SelectItem>
            <SelectItem value="planning">Ainda estou avaliando</SelectItem>
          </SelectContent>
        </Select>
        {errors.timeline && (
          <p className="text-red-400 text-xs mt-1">{errors.timeline.message}</p>
        )}
      </div>

      <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="gdprConsent" 
            onCheckedChange={(checked) => setValue('gdprConsent', !!checked)}
            className="border-gray-600"
          />
          <Label htmlFor="gdprConsent" className="text-sm text-gray-300 leading-relaxed">
            Concordo em compartilhar meus dados para que a ROI Labs possa entrar em contato 
            comigo sobre soluções de SDR AI. *
          </Label>
        </div>
        {errors.gdprConsent && (
          <p className="text-red-400 text-xs">{errors.gdprConsent.message}</p>
        )}

        <div className="flex items-start space-x-2">
          <Checkbox 
            id="marketingConsent" 
            onCheckedChange={(checked) => setValue('marketingConsent', !!checked)}
            className="border-gray-600"
          />
          <Label htmlFor="marketingConsent" className="text-sm text-gray-400 leading-relaxed">
            Gostaria de receber conteúdos sobre SDR AI e vendas (opcional)
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Etapa {step} de {totalSteps}</span>
          <span className="text-sm text-gray-400">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="flex justify-between pt-6">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Voltar
            </Button>
          )}
          
          {step < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-primary-600 hover:bg-primary-700 ml-auto"
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 ml-auto"
            >
              {isLoading ? 'Enviando...' : 'Ver Minha Proposta SDR AI'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadCaptureForm;