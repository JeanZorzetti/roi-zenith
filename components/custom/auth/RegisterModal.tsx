'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthModals } from '@/hooks/useAuthModals';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export default function RegisterModal() {
  const { registerOpen, closeAll, openLogin } = useAuthModals();
  const login = useAuthStore((state) => state.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        toast.success('Conta criada com sucesso!');
        closeAll();
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.error || 'Erro ao criar conta');
      }
    } catch (error) {
      toast.error('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    closeAll();
    openLogin();
  };

  return (
    <Dialog open={registerOpen} onOpenChange={closeAll}>
      <DialogContent className="sm:max-w-[425px] bg-deep-black border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-pure-white">Criar Conta</DialogTitle>
          <DialogDescription className="text-text-secondary">
            Preencha seus dados para criar uma conta.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-pure-white">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-charcoal border-border text-pure-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-pure-white">
              E-mail
            </Label>
            <Input
              id="register-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-charcoal border-border text-pure-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-pure-white">
              Senha
            </Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-charcoal border-border text-pure-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-pure-white">
              Confirmar Senha
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-charcoal border-border text-pure-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-white/90"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
            <div className="text-center text-sm text-text-secondary">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={handleSwitchToLogin}
                className="text-white hover:underline font-medium"
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
