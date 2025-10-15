// ============= CRM REWARDS HOOK =============
// Hook to track CRM activities and award game rewards

import { useEffect, useRef } from 'react';
import { crmService } from '../../services/crmService';
import { GameRewardService } from '../services/GameRewardService';
import { useToast } from '../components/ui/Toast';
import type { Deal, Activity, Contact } from '../../types/CRM';

interface CRMRewardsConfig {
  enabled: boolean;
  pollInterval?: number; // in milliseconds
  trackDeals?: boolean;
  trackActivities?: boolean;
  trackContacts?: boolean;
}

/**
 * Hook to monitor CRM activities and reward the player
 *
 * Usage:
 * ```tsx
 * useCRMRewards({
 *   enabled: true,
 *   trackDeals: true,
 *   trackActivities: true,
 * });
 * ```
 */
export function useCRMRewards(config: CRMRewardsConfig = { enabled: true }) {
  const toast = useToast();
  const lastSyncRef = useRef<{
    deals: string[];
    activities: string[];
    contacts: string[];
  }>({
    deals: [],
    activities: [],
    contacts: [],
  });

  useEffect(() => {
    if (!config.enabled) return;

    const pollInterval = config.pollInterval || 30000; // Default: 30 seconds

    // Track deals
    const trackDeals = async () => {
      if (config.trackDeals === false) return;

      try {
        const deals = await crmService.getDeals();

        // Find new won deals
        const wonDeals = deals.filter(deal =>
          deal.status === 'won' && !lastSyncRef.current.deals.includes(deal.id)
        );

        // Award rewards for new won deals
        wonDeals.forEach(deal => {
          const reward = GameRewardService.rewardDealWon(deal);
          GameRewardService.applyReward(reward);

          toast.show({
            title: '🎉 Deal Fechado!',
            description: `${reward.reason}\n+${reward.experience} XP, +${reward.coins} coins`,
            variant: 'success',
            duration: 5000,
          });

          // Mark as synced
          lastSyncRef.current.deals.push(deal.id);
        });

        // Track deal progress
        const inProgressDeals = deals.filter(deal => deal.status === 'in_progress');
        // Store stages for next comparison (simplified)
        lastSyncRef.current.deals = deals.map(d => d.id);
      } catch (error) {
        console.error('Error tracking deals:', error);
      }
    };

    // Track activities
    const trackActivities = async () => {
      if (config.trackActivities === false) return;

      try {
        const activities = await crmService.getActivities();

        // Find newly completed activities
        const completedActivities = activities.filter(activity =>
          activity.status === 'completed' && !lastSyncRef.current.activities.includes(activity.id)
        );

        // Award rewards
        completedActivities.forEach(activity => {
          const reward = GameRewardService.rewardActivityComplete(activity);
          GameRewardService.applyReward(reward);

          toast.show({
            title: '✅ Atividade Completa!',
            description: `${reward.reason}\n+${reward.experience} XP`,
            variant: 'info',
            duration: 3000,
          });

          // Mark as synced
          lastSyncRef.current.activities.push(activity.id);
        });
      } catch (error) {
        console.error('Error tracking activities:', error);
      }
    };

    // Track contacts
    const trackContacts = async () => {
      if (config.trackContacts === false) return;

      try {
        const contacts = await crmService.getContacts();

        // Find new contacts
        const newContacts = contacts.filter(contact =>
          !lastSyncRef.current.contacts.includes(contact.id)
        );

        // Award rewards
        newContacts.forEach(contact => {
          const reward = GameRewardService.rewardNewContact(contact);
          GameRewardService.applyReward(reward);

          toast.show({
            title: '👤 Novo Contato!',
            description: `${reward.reason}\n+${reward.experience} XP`,
            variant: 'info',
            duration: 3000,
          });

          // Mark as synced
          lastSyncRef.current.contacts.push(contact.id);
        });
      } catch (error) {
        console.error('Error tracking contacts:', error);
      }
    };

    // Initial sync
    trackDeals();
    trackActivities();
    trackContacts();

    // Poll for updates
    const interval = setInterval(() => {
      trackDeals();
      trackActivities();
      trackContacts();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [config.enabled, config.pollInterval, config.trackDeals, config.trackActivities, config.trackContacts]);
}
