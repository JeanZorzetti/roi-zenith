'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthModals } from '@/hooks/useAuthModals';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export default function LoginModal() {
  const { isLoginOpen, closeLogin, openRegister } = useAuthModals();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        toast.success('Login realizado com sucesso!');
        closeLogin();
        setEmail('');
        setPassword('');
      } else {
        toast.error(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      toast.error('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToRegister = () => {
    closeLogin();
    openRegister();
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={closeLogin}>
      <DialogContent className="sm:max-w-[425px] bg-deep-black border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-pure-white">Entrar</DialogTitle>
          <DialogDescription className="text-text-secondary">
            Entre com suas credenciais para acessar sua conta.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-pure-white">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-charcoal border-border text-pure-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-pure-white">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <div className="text-center text-sm text-text-secondary">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={handleSwitchToRegister}
                className="text-white hover:underline font-medium"
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
