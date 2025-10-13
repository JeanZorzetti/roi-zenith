// ============= BATTLE ACTIONS =============
// Botões de ação na batalha

import React from 'react';
import { Skill } from '../../types/battle.types';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import { motion } from 'framer-motion';
import { Sword, Sparkles, Package, Flag, Clock } from 'lucide-react';
import clsx from 'clsx';

interface BattleActionsProps {
  onAttack: () => void;
  onUseSkill: (skillId: string) => void;
  onFlee: () => void;
  skills: Skill[];
  disabled?: boolean;
}

export const BattleActions: React.FC<BattleActionsProps> = ({
  onAttack,
  onUseSkill,
  onFlee,
  skills,
  disabled = false,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Ataque básico */}
      <motion.div variants={itemVariants}>
        <Button
          variant="danger"
          size="lg"
          onClick={onAttack}
          disabled={disabled}
          className="w-full flex items-center justify-center gap-2"
        >
          <Sword className="w-5 h-5" />
          <span className="font-bold">ATACAR</span>
        </Button>
      </motion.div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            HABILIDADES
          </p>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => {
              const isOnCooldown = skill.currentCooldown > 0;

              const tooltipContent = (
                <div className="space-y-1">
                  <p className="font-bold">{skill.name}</p>
                  <p className="text-xs">{skill.description}</p>
                  <div className="text-xs space-y-0.5 mt-2">
                    <p>Tipo: <span className="capitalize">{skill.type}</span></p>
                    <p>Poder: {skill.power}x</p>
                    {skill.cooldown > 0 && (
                      <p>Cooldown: {skill.cooldown} turnos</p>
                    )}
                    {isOnCooldown && (
                      <p className="text-yellow-400">
                        Disponível em: {skill.currentCooldown} turnos
                      </p>
                    )}
                  </div>
                </div>
              );

              return (
                <motion.div key={skill.id} variants={itemVariants}>
                  <Tooltip content={tooltipContent}>
                    <button
                      onClick={() => onUseSkill(skill.id)}
                      disabled={disabled || isOnCooldown}
                      className={clsx(
                        'w-full p-3 rounded-lg border-2 transition-all',
                        'flex flex-col items-center gap-1',
                        isOnCooldown
                          ? 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed'
                          : 'bg-purple-900 bg-opacity-30 border-purple-500 text-white hover:bg-purple-800 hover:scale-105',
                        disabled && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span className="text-xs font-bold text-center line-clamp-2">
                        {skill.name}
                      </span>
                      {isOnCooldown && (
                        <div className="flex items-center gap-1 text-xs text-yellow-400">
                          <Clock className="w-3 h-3" />
                          {skill.currentCooldown}
                        </div>
                      )}
                    </button>
                  </Tooltip>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Ações secundárias */}
      <div className="flex gap-2">
        <motion.div variants={itemVariants} className="flex-1">
          <Button
            variant="ghost"
            size="md"
            onClick={onFlee}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-2"
          >
            <Flag className="w-4 h-4" />
            Fugir
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
