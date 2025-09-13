import { TrendingUp, ShoppingCart, Brain, Target, Calendar, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { key: 'expenses', label: 'Expenses', icon: ShoppingCart },
    { key: 'ai-suggestions', label: 'AI Suggestions', icon: Brain },
    { key: 'savings', label: 'Savings', icon: Target },
    { key: 'bills', label: 'Bills', icon: Calendar },
    { key: 'rewards', label: 'Rewards', icon: Gift }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-elegant border border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              variant={activeTab === tab.key ? "finance" : "ghost"}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.key
                  ? 'transform scale-105'
                  : ''
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};