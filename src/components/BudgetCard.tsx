import { DollarSign, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BudgetCardProps {
  budgetRemaining: number;
  budgetUsedPercent: number;
  totalSpent: number;
  budget: number;
}

export const BudgetCard = ({ budgetRemaining, budgetUsedPercent, totalSpent, budget }: BudgetCardProps) => {
  const alertLevel = budgetUsedPercent >= 90 ? 'danger' : budgetUsedPercent >= 75 ? 'warning' : 'safe';
  const daysLeft = 18; // Days left in month

  return (
    <div className="space-y-6">
      {/* Budget Alert */}
      {alertLevel !== 'safe' && (
        <Card className={`border shadow-elegant ${
          alertLevel === 'danger' 
            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200' 
            : 'bg-gradient-warning border-warning/20'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className={`h-6 w-6 ${
                alertLevel === 'danger' ? 'text-danger' : 'text-warning'
              }`} />
              <div>
                <h3 className={`font-bold text-lg ${
                  alertLevel === 'danger' ? 'text-red-900' : 'text-warning-foreground'
                }`}>
                  {alertLevel === 'danger' ? '🚨 Budget Alert!' : '⚠️ Budget Warning'}
                </h3>
                <p className={`${
                  alertLevel === 'danger' ? 'text-red-700' : 'text-warning-foreground/80'
                }`}>
                  You've used {budgetUsedPercent.toFixed(1)}% of your monthly budget. 
                  {alertLevel === 'danger' ? ' Consider reducing spending.' : ' Keep an eye on your expenses.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Remaining Card */}
      <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Budget Remaining</p>
              <p className={`text-3xl font-bold ${budgetRemaining < 100 ? 'text-danger' : 'text-success'}`}>
                ${budgetRemaining}
              </p>
            </div>
            <div className="bg-gradient-success p-3 rounded-xl shadow-success">
              <DollarSign className="h-8 w-8 text-success-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  budgetUsedPercent >= 90 ? 'bg-gradient-to-r from-red-400 to-red-600' : 
                  budgetUsedPercent >= 75 ? 'bg-gradient-warning' : 'bg-gradient-success'
                }`}
                style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">{budgetUsedPercent.toFixed(1)}% used</p>
              <p className="text-xs text-muted-foreground">${(budgetRemaining / daysLeft).toFixed(1)}/day left</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};