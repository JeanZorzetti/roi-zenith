import { useGameStore } from '@/stores/gameStore';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Coins, Gem, Zap, Trophy, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GameHUD() {
  const { gameState, isConnected } = useGameStore();

  if (!isConnected || !gameState) {
    return null;
  }

  const xpPercentage = (gameState.progression.experience / gameState.progression.experienceToNextLevel) * 100;
  const energyPercentage = (gameState.resources.energy / gameState.resources.maxEnergy) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Level & XP */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <Badge variant="outline" className="bg-purple-500/20 border-purple-500 text-purple-100 px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              Nível {gameState.progression.level}
            </Badge>

            <div className="flex-1 max-w-[150px]">
              <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                <span>XP</span>
                <span>{gameState.progression.experience}/{gameState.progression.experienceToNextLevel}</span>
              </div>
              <Progress value={xpPercentage} className="h-2 bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${xpPercentage}%` }}
                />
              </Progress>
            </div>
          </div>

          {/* Resources */}
          <div className="flex items-center gap-4">
            {/* Coins */}
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-1.5">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold text-yellow-100">{gameState.resources.coins.toLocaleString()}</span>
            </div>

            {/* Gems */}
            <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-1.5">
              <Gem className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-cyan-100">{gameState.resources.gems.toLocaleString()}</span>
            </div>

            {/* Energy */}
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-1.5">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="font-semibold text-green-100">
                {gameState.resources.energy}/{gameState.resources.maxEnergy}
              </span>
            </div>

            {/* Reputation */}
            <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-1.5">
              <Trophy className="w-4 h-4 text-orange-400" />
              <span className="font-semibold text-orange-100">{gameState.resources.reputation.toLocaleString()}</span>
            </div>
          </div>

          {/* Energy Bar (optional compact version) */}
          <div className="hidden lg:flex items-center gap-2 min-w-[120px]">
            <Zap className="w-4 h-4 text-green-400" />
            <div className="flex-1">
              <div className="text-xs text-gray-300 mb-1">Energia</div>
              <Progress value={energyPercentage} className="h-1.5 bg-gray-700">
                <div
                  className={cn(
                    "h-full transition-all duration-300 rounded-full",
                    energyPercentage > 50 ? "bg-green-500" : energyPercentage > 25 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${energyPercentage}%` }}
                />
              </Progress>
            </div>
          </div>

          {/* Skill Points (if any) */}
          {gameState.stats.skillPoints > 0 && (
            <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 cursor-pointer animate-pulse">
              🎯 {gameState.stats.skillPoints} Skill Point{gameState.stats.skillPoints > 1 ? 's' : ''} disponível
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
