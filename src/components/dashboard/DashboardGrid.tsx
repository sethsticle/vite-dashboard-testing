import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Switch } from '@/components/ui/switch';
import { LockIcon, UnlockIcon } from 'lucide-react';

// Separate layout configuration
interface DashboardItemConfig {
  id: string;
  type: string;
  gridSpan: string;
  aspectRatio?: number;
  height?: string;
}

const defaultLayout: DashboardItemConfig[] = [
  {
    id: 'stats-container',
    type: 'stats',
    gridSpan: 'sm:col-span-2 md:col-span-3 lg:col-span-4'
  },
  {
    id: 'welcome-card',
    type: 'welcome',
    gridSpan: 'sm:col-span-2 md:col-span-2 lg:col-span-3',
    aspectRatio: 16/9
  },
  {
    id: 'satisfaction-rate',
    type: 'satisfaction',
    gridSpan: 'col-span-1',
    aspectRatio: 1
  },
  {
    id: 'sales-overview',
    type: 'sales',
    gridSpan: 'sm:col-span-2 md:col-span-3 lg:col-span-2',
    aspectRatio: 21/9
  },
  {
    id: 'active-users',
    type: 'users',
    gridSpan: 'col-span-1',
    aspectRatio: 4/3
  },
  {
    id: 'projects-table',
    type: 'projects',
    gridSpan: 'sm:col-span-2 md:col-span-3 lg:col-span-2',
    height: 'h-[400px]'
  },
  {
    id: 'orders-overview-1',
    type: 'orders1',
    gridSpan: 'col-span-1',
    height: 'h-[200px]'
  },
  {
    id: 'orders-overview-2',
    type: 'orders2',
    gridSpan: 'col-span-1',
    height: 'h-[200px]'
  }
];

const DashboardGrid = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [layout, setLayout] = useState<DashboardItemConfig[]>(() => {
    const saved = localStorage.getItem('dashboardLayout');
    return saved ? JSON.parse(saved) : defaultLayout;
  });

  useEffect(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
  }, [layout]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newLayout = Array.from(layout);
    const [reorderedItem] = newLayout.splice(result.source.index, 1);
    newLayout.splice(result.destination.index, 0, reorderedItem);

    setLayout(newLayout);
  };

  const renderContent = (item: DashboardItemConfig) => {
    switch (item.type) {
      case 'stats':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-black/20 backdrop-blur-xl rounded-xl p-4 h-24" />
            ))}
          </div>
        );
      case 'welcome':
        return <div className="h-full">Welcome Content</div>;
      case 'satisfaction':
        return <div className="h-full">Satisfaction Rate</div>;
      case 'sales':
        return <div className="h-full">Sales Chart</div>;
      case 'users':
        return <div className="h-full">Active Users</div>;
      case 'projects':
        return <div className={item.height}>Projects Table</div>;
      case 'orders1':
        return <div className={item.height}>Orders Overview 1</div>;
      case 'orders2':
        return <div className={item.height}>Orders Overview 2</div>;
      default:
        return null;
    }
  };

  const renderDraggableItem = (item: DashboardItemConfig, index: number) => (
    <Draggable 
      key={item.id} 
      draggableId={item.id} 
      index={index}
      isDragDisabled={!isEditable}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${item.gridSpan} ${isEditable ? 'cursor-move' : ''}`}
        >
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full relative group">
            {isEditable && (
              <div className="absolute inset-0 rounded-xl border-2 border-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}
            {item.aspectRatio ? (
              <AspectRatio ratio={item.aspectRatio}>
                {renderContent(item)}
              </AspectRatio>
            ) : (
              renderContent(item)
            )}
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-2">
        <div className="flex items-center space-x-2">
          {isEditable ? <UnlockIcon className="w-4 h-4" /> : <LockIcon className="w-4 h-4" />}
          <Switch
            checked={isEditable}
            onCheckedChange={setIsEditable}
          />
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min"
            >
              {layout.map((item, index) => renderDraggableItem(item, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DashboardGrid;