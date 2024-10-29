import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, trend, className }) => {
  return (
    <div className={cn('bg-black/20 backdrop-blur-xl rounded-xl p-4', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm mb-1">{label}</p>
          <h3 className="text-xl font-semibold text-white">{value}</h3>
        </div>
        <div className="bg-white/10 p-2 rounded-lg">{icon}</div>
      </div>
      <div className={cn('text-sm mt-2', trend.positive ? 'text-green-500' : 'text-red-500')}>
        {trend.positive ? '+' : '-'}{trend.value}
      </div>
    </div>
  );
};

export default StatsCard;