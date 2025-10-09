# 🎮 Game System Integration Guide

## Overview
O sistema de gamificação do ROI Labs CRM está integrado via **Socket.IO** com eventos real-time que notificam o frontend quando ações do CRM geram recompensas no jogo.

---

## 🔌 Socket.IO Connection

### Namespace
```typescript
const socket = io('http://localhost:5000/game', {
  transports: ['websocket'],
  autoConnect: true
});
```

### Join Game Room
Quando o usuário faz login, conecte ao namespace `/game` e entre na sala:

```typescript
socket.emit('join-game', userId);

// Receber estado inicial do jogo
socket.on('game-state', (gameState) => {
  console.log('Game state loaded:', gameState);
  // gameState contém: level, experience, coins, gems, energy, inventory, party, etc.
});
```

---

## 📡 Game Events

### 1. Experience Gained
```typescript
socket.on('experience-gained', (data) => {
  // data: { experience: 50, currentXP: 150, totalXP: 500, level: 3 }
  updateXPBar(data);
});
```

### 2. Level Up
```typescript
socket.on('level-up', (data) => {
  // data: { newLevel: 4, skillPoints: 1, maxEnergy: 55, rewards: {...}, animation: 'level-up' }
  showLevelUpAnimation(data);
  playSound('level-up');
});
```

### 3. Resources Gained
```typescript
socket.on('resources-gained', (data) => {
  // data: { coins: 100, gems: 5, energy: 10, reputation: 20, experience: 50 }
  updateResourcesUI(data);
});
```

### 4. Item Dropped
```typescript
socket.on('item-dropped', (data) => {
  // data: { itemId: 'sword_of_insight', itemName: 'Sword of Insight', rarity: 'rare', source: 'pain_discovery', animation: 'item-drop' }
  showItemDropAnimation(data);
  playSound('item-drop');
});
```

### 5. Quest Progress
```typescript
socket.on('quest-progress', (data) => {
  // data: { questId: 'first_10_contacts', progress: { contacts: 7, target: 10 }, completed: false }
  updateQuestUI(data);
});
```

### 6. Quest Completed
```typescript
socket.on('quest-completed', (data) => {
  // data: { questId: 'first_10_contacts', rewards: {...}, animation: 'quest-complete' }
  showQuestCompleteAnimation(data);
});
```

### 7. Achievement Unlocked
```typescript
socket.on('achievement-unlocked', (data) => {
  // data: { achievementId: 'pain_hunter', name: 'Pain Hunter', description: '...', rewards: {...}, badge: '🏆', animation: 'achievement-unlock' }
  showAchievementToast(data);
});
```

### 8. Notifications
```typescript
socket.on('notification', (data) => {
  // data: { type: 'success', title: '🎉 Novo Contato', message: 'João Silva foi adicionado! +50 XP, +100 coins', duration: 5000 }
  showToast(data);
});
```

### 9. Contact Created
```typescript
socket.on('contact-created', (data) => {
  // data: { contactId: 'contact-123', contactName: 'João Silva', rewards: {...} }
  console.log('Contact created in game:', data);
});
```

### 10. Pain Discovered
```typescript
socket.on('pain-discovered', (data) => {
  // data: { dealId: 'deal-456', painIntensity: 8, rewards: {...}, itemDropped: 'potion_insight', leveledUp: false, animation: 'high-intensity-pain' }
  showPainDiscoveryAnimation(data);
});
```

---

## 🎯 CRM Actions → Game Events

### 1. Criar Contato
**Backend**: `POST /api/crm/contacts`

**Payload**:
```json
{
  "firstName": "João",
  "lastName": "Silva",
  "email": "joao@example.com",
  "userId": "user-123"  // ← IMPORTANTE: Incluir userId
}
```

**Game Events Triggered**:
- `contact-created`
- `experience-gained`
- `resources-gained`
- `notification`
- `level-up` (se subiu de nível)

---

### 2. Descobrir Dor (Atualizar Deal com Pain)
**Backend**: `PUT /api/crm/deals/:dealId`

**Payload**:
```json
{
  "painDiscovered": "Equipe gasta 10h/semana em processos manuais",
  "painIntensity": 8,
  "painCategory": "operational",
  "orionSolution": "ERP módulo de automação de processos",
  "userId": "user-123"  // ← IMPORTANTE
}
```

**Game Events Triggered**:
- `pain-discovered`
- `experience-gained` (baseado na intensidade)
- `resources-gained`
- `item-dropped` (chance de drop)
- `notification`
- `level-up` (se aplicável)

---

### 3. Criar Atividade/Entrevista
**Backend**: `POST /api/crm/activities`

**Payload**:
```json
{
  "type": "MEETING",
  "subject": "Discovery Call",
  "description": "Entrevista inicial",
  "dealId": "deal-456",
  "contactId": "contact-123",
  "userId": "user-123"  // ← IMPORTANTE
}
```

**Game Events Triggered**:
- `resources-gained` (coins, experience)
- `notification` (se for entrevista: "⚔️ Nova Batalha!")

---

### 4. Mapear Solução Orion
**Backend**: `PUT /api/crm/deals/:dealId`

**Payload**:
```json
{
  "orionSolution": "ERP módulo X + módulo Y",
  "userId": "user-123"  // ← IMPORTANTE
}
```

**Game Events Triggered**:
- `resources-gained` (coins, experience)
- `notification` ("💡 Solução Mapeada")

---

## 🛠️ Frontend Implementation Example

### React Component
```typescript
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const GameOverlay = ({ userId }) => {
  const [gameState, setGameState] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000/game');

    socket.emit('join-game', userId);

    socket.on('game-state', (state) => {
      setGameState(state);
    });

    socket.on('notification', (notif) => {
      setNotifications(prev => [...prev, notif]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== notif));
      }, notif.duration || 5000);
    });

    socket.on('experience-gained', (data) => {
      // Animar barra de XP
      animateXPGain(data.experience);
    });

    socket.on('level-up', (data) => {
      // Mostrar animação de level up
      playLevelUpAnimation(data);
    });

    return () => {
      socket.emit('leave-game', userId);
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div className="game-overlay">
      {/* HUD com level, XP, resources */}
      <GameHUD gameState={gameState} />

      {/* Notificações toast */}
      <ToastContainer notifications={notifications} />
    </div>
  );
};
```

---

## 📊 Game State Structure

```typescript
interface GameState {
  // Resources
  coins: number;
  gems: number;
  energy: number;
  maxEnergy: number;
  reputation: number;

  // Progression
  level: number;
  experience: number;
  experienceToNextLevel: number;

  // Stats
  intelligence: number;
  charisma: number;
  perception: number;
  knowledge: number;
  luck: number;
  skillPoints: number;

  // Collections
  inventory: Array<{ itemId: string; quantity: number; isEquipped: boolean }>;
  party: Array<{ npcId: string; level: number }>;
  activeQuests: Array<{ questId: string; progress: any; status: string }>;
  achievements: Array<{ achievementId: string; unlockedAt: Date }>;

  // Territory
  unlockedTerritories: string[];
  territories: Array<{ territoryId: string; explorationPercent: number; ... }>;
}
```

---

## ✅ Checklist de Integração

### Backend
- [x] Socket.IO configurado no server.ts
- [x] Namespace `/game` criado
- [x] Event handlers implementados (gameEvents.ts)
- [x] CRM controllers integrados com eventos
- [x] Tipos TypeScript definidos

### Frontend (TODO)
- [x] Socket.IO client instalado (`npm install socket.io-client`)
- [ ] Conectar ao namespace `/game` no login
- [ ] Implementar listeners para eventos de jogo
- [ ] Criar componente GameHUD com level, XP, resources
- [ ] Implementar sistema de notificações/toasts
- [ ] Criar animações para level up, item drop, etc
- [ ] Adicionar campo `userId` em todos os requests CRM
- [ ] Implementar Phaser.js (próxima fase)

---

## 🔐 Autenticação

**IMPORTANTE**: O `userId` deve ser passado no body de todas as requests CRM que devem triggerar eventos de jogo:

```typescript
// Exemplo com axios
const createContact = async (contactData) => {
  const userId = getCurrentUserId(); // Pegar do auth context

  return axios.post('/api/crm/contacts', {
    ...contactData,
    userId  // ← Incluir userId
  });
};
```

---

## 🎨 UI/UX Recommendations

1. **HUD Persistente**: Barra de XP e resources sempre visível no topo
2. **Notificações Toast**: Canto superior direito, duração de 3-5s
3. **Animações**: Level up (explosão de confete), item drop (chest opening), pain discovery (boss battle effect)
4. **Sound Effects**: Level up, item drop, achievement unlock
5. **Progress Tracking**: Quest tracker sidebar (collapsible)

---

## 📝 Next Steps (Week 2)

1. Implementar Phaser.js game canvas
2. Criar sistema de batalhas (entrevistas)
3. Sistema de mercado/loja
4. Map exploration com territórios
5. Multiplayer features (party system)

---

## 🐛 Troubleshooting

### Eventos não estão chegando
- Verificar se o userId está sendo enviado nos requests
- Confirmar que o Socket.IO está conectado: `socket.connected`
- Verificar se entrou na sala: `socket.emit('join-game', userId)`

### Build errors
- Rodar `npm run build` no backend para verificar erros TypeScript
- Verificar imports em gameEvents.ts e gameSocket.ts

### Database
- Verificar se as migrations foram rodadas: `npx prisma migrate dev`
- Verificar se o game state foi inicializado para o usuário

---

🎮 **Happy Coding!**
