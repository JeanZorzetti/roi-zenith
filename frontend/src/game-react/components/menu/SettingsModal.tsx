// ============= SETTINGS MODAL =============
// Modal de configurações do jogo

import React, { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { Section } from '../layout/Section';
import { Volume2, VolumeX, Music, Music2, Gamepad2, Globe, Palette } from 'lucide-react';
import clsx from 'clsx';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'gameplay' | 'graphics' | 'language'>('audio');

  // Settings state (em produção, isso virá de um store)
  const [settings, setSettings] = useState({
    // Audio
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 90,
    isMuted: false,

    // Gameplay
    autoSave: true,
    tutorials: true,
    notifications: true,
    difficulty: 'normal' as 'easy' | 'normal' | 'hard',

    // Graphics
    quality: 'high' as 'low' | 'medium' | 'high',
    animations: true,
    particles: true,

    // Language
    language: 'pt-BR' as 'pt-BR' | 'en-US' | 'es-ES',
  });

  const handleSave = () => {
    // Salvar configurações no localStorage
    localStorage.setItem('game-settings', JSON.stringify(settings));
    onClose();
  };

  const handleReset = () => {
    // Reset para valores padrão
    setSettings({
      masterVolume: 80,
      musicVolume: 70,
      sfxVolume: 90,
      isMuted: false,
      autoSave: true,
      tutorials: true,
      notifications: true,
      difficulty: 'normal',
      quality: 'high',
      animations: true,
      particles: true,
      language: 'pt-BR',
    });
  };

  // Slider component
  const Slider: React.FC<{
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: React.ReactNode;
  }> = ({ label, value, onChange, icon }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );

  // Toggle component
  const Toggle: React.FC<{
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: string;
  }> = ({ label, checked, onChange, description }) => (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative w-12 h-6 rounded-full transition-colors',
          checked ? 'bg-blue-600' : 'bg-gray-600'
        )}
      >
        <div
          className={clsx(
            'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
            checked ? 'translate-x-7' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );

  // Radio group component
  const RadioGroup: React.FC<{
    label: string;
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (value: string) => void;
  }> = ({ label, options, value, onChange }) => (
    <div className="space-y-2">
      <p className="text-sm text-gray-300 font-semibold">{label}</p>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={clsx(
              'flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
              value === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="lg">
      <Dialog.Header>
        <Dialog.Title>Configurações</Dialog.Title>
        <Dialog.Description>Personalize sua experiência de jogo</Dialog.Description>
      </Dialog.Header>

      <Dialog.Body>
        <Tabs
          tabs={[
            { id: 'audio', label: 'Áudio', icon: 'Volume2' },
            { id: 'gameplay', label: 'Gameplay', icon: 'Gamepad2' },
            { id: 'graphics', label: 'Gráficos', icon: 'Palette' },
            { id: 'language', label: 'Idioma', icon: 'Globe' },
          ]}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab as any)}
        />

        <div className="mt-6 space-y-6">
          {/* Audio Tab */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <Toggle
                label="Mudo"
                checked={settings.isMuted}
                onChange={(checked) => setSettings({ ...settings, isMuted: checked })}
                description="Silenciar todos os sons do jogo"
              />

              <Slider
                label="Volume Geral"
                value={settings.masterVolume}
                onChange={(value) => setSettings({ ...settings, masterVolume: value })}
                icon={<Volume2 className="w-4 h-4" />}
              />

              <Slider
                label="Música"
                value={settings.musicVolume}
                onChange={(value) => setSettings({ ...settings, musicVolume: value })}
                icon={<Music className="w-4 h-4" />}
              />

              <Slider
                label="Efeitos Sonoros"
                value={settings.sfxVolume}
                onChange={(value) => setSettings({ ...settings, sfxVolume: value })}
                icon={<Music2 className="w-4 h-4" />}
              />
            </div>
          )}

          {/* Gameplay Tab */}
          {activeTab === 'gameplay' && (
            <div className="space-y-4">
              <RadioGroup
                label="Dificuldade"
                options={[
                  { value: 'easy', label: 'Fácil' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'hard', label: 'Difícil' },
                ]}
                value={settings.difficulty}
                onChange={(value) => setSettings({ ...settings, difficulty: value as any })}
              />

              <Toggle
                label="Auto-Save"
                checked={settings.autoSave}
                onChange={(checked) => setSettings({ ...settings, autoSave: checked })}
                description="Salvar automaticamente o progresso"
              />

              <Toggle
                label="Tutoriais"
                checked={settings.tutorials}
                onChange={(checked) => setSettings({ ...settings, tutorials: checked })}
                description="Mostrar dicas e tutoriais durante o jogo"
              />

              <Toggle
                label="Notificações"
                checked={settings.notifications}
                onChange={(checked) => setSettings({ ...settings, notifications: checked })}
                description="Receber notificações de eventos importantes"
              />
            </div>
          )}

          {/* Graphics Tab */}
          {activeTab === 'graphics' && (
            <div className="space-y-4">
              <RadioGroup
                label="Qualidade Gráfica"
                options={[
                  { value: 'low', label: 'Baixa' },
                  { value: 'medium', label: 'Média' },
                  { value: 'high', label: 'Alta' },
                ]}
                value={settings.quality}
                onChange={(value) => setSettings({ ...settings, quality: value as any })}
              />

              <Toggle
                label="Animações"
                checked={settings.animations}
                onChange={(checked) => setSettings({ ...settings, animations: checked })}
                description="Habilitar animações suaves"
              />

              <Toggle
                label="Partículas"
                checked={settings.particles}
                onChange={(checked) => setSettings({ ...settings, particles: checked })}
                description="Mostrar efeitos de partículas"
              />
            </div>
          )}

          {/* Language Tab */}
          {activeTab === 'language' && (
            <div className="space-y-4">
              <RadioGroup
                label="Idioma do Jogo"
                options={[
                  { value: 'pt-BR', label: 'Português (BR)' },
                  { value: 'en-US', label: 'English (US)' },
                  { value: 'es-ES', label: 'Español (ES)' },
                ]}
                value={settings.language}
                onChange={(value) => setSettings({ ...settings, language: value as any })}
              />

              <div className="p-4 bg-blue-900 bg-opacity-20 border border-blue-500 rounded-lg">
                <p className="text-sm text-blue-300">
                  💡 O jogo será reiniciado após alterar o idioma
                </p>
              </div>
            </div>
          )}
        </div>
      </Dialog.Body>

      <Dialog.Footer>
        <Button variant="ghost" onClick={handleReset}>
          Restaurar Padrão
        </Button>
        <div className="flex gap-2">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </Dialog.Footer>
    </Dialog>
  );
};
