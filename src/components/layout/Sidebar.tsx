import React, { useState } from 'react';
import { Home, LayoutDashboard, Table, CreditCard, User, Settings, HelpCircle, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Table, label: 'Tables' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Settings, label: 'Settings' },
];

const accountItems = [
  { icon: User, label: 'Profile' },
  { icon: HelpCircle, label: 'Help' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen bg-black/20 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center gap-2 px-2 mb-8">
        <Home className="w-6 h-6 text-blue-500 flex-shrink-0" />
        {!isCollapsed && <span className="font-semibold text-lg text-white">Vision UI</span>}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-blue-500 rounded-full p-1.5 text-white hover:bg-blue-600 transition-colors"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
      </button>

      <nav className="flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                item.active
                  ? 'bg-blue-500/10 text-blue-500'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && item.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {!isCollapsed && <div className="text-xs font-semibold text-white/50 px-3 mb-2">ACCOUNT</div>}
          <div className="space-y-1">
            {accountItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {!isCollapsed && (
        <div className="mt-auto">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4">
            <h4 className="font-semibold text-white mb-1">Need help?</h4>
            <p className="text-sm text-white/70 mb-3">Check our documentation</p>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded-lg transition-colors">
              Documentation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;