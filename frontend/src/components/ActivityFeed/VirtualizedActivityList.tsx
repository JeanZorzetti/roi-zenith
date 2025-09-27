import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Activity } from '../../types/Activity';
import ActivityItem from './ActivityItem';

interface VirtualizedActivityListProps {
  activities: Activity[];
  height: number;
  itemHeight?: number;
  onActivityClick?: (activity: Activity) => void;
  compact?: boolean;
}

interface ItemRendererProps {
  index: number;
  style: React.CSSProperties;
  data: {
    activities: Activity[];
    onActivityClick?: (activity: Activity) => void;
    compact?: boolean;
  };
}

const ItemRenderer: React.FC<ItemRendererProps> = ({ index, style, data }) => {
  const { activities, onActivityClick, compact } = data;
  const activity = activities[index];

  if (!activity) {
    return <div style={style} />;
  }

  return (
    <div style={style}>
      <div className="px-2 py-1">
        <ActivityItem
          activity={activity}
          compact={compact}
          onClick={onActivityClick}
        />
      </div>
    </div>
  );
};

export const VirtualizedActivityList: React.FC<VirtualizedActivityListProps> = ({
  activities,
  height,
  itemHeight = 80,
  onActivityClick,
  compact = false
}) => {
  // Memoizar dados para evitar re-renders desnecessários
  const itemData = useMemo(() => ({
    activities,
    onActivityClick,
    compact
  }), [activities, onActivityClick, compact]);

  // Ajustar altura do item baseado no modo
  const actualItemHeight = compact ? itemHeight * 0.7 : itemHeight;

  if (activities.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center text-gray-400"
      >
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <p>Nenhuma atividade encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <List
      height={height}
      itemCount={activities.length}
      itemSize={actualItemHeight}
      itemData={itemData}
      overscanCount={5} // Renderizar 5 itens extras fora da vista para scroll suave
      className="custom-scrollbar"
    >
      {ItemRenderer}
    </List>
  );
};

export default VirtualizedActivityList;