import { DollarSign, TrendingUp, Target, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricsGridProps {
  budgetRemaining: number;
  totalSpent: number;
  currentSavings: number;
  savingsGoal: number;
  predictedSpending: number;
  budgetUsedPercent: number;
  savingsProgress: number;
  lastMonthSpent: number;
}

export const MetricsGrid = ({ 
  budgetRemaining, 
  totalSpent, 
  currentSavings, 
  savingsGoal, 
  predictedSpending,
  budgetUsedPercent,
  savingsProgress,
  lastMonthSpent
}: MetricsGridProps) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
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
              <p className="text-xs text-muted-foreground">${(budgetRemaining / 18).toFixed(1)}/day left</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">This Month</p>
              <p className="text-3xl font-bold">${totalSpent}</p>
            </div>
            <div className="bg-gradient-primary p-3 rounded-xl shadow-primary">
              <TrendingUp className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {totalSpent > lastMonthSpent ? 
              `↑ $${totalSpent - lastMonthSpent} more than last month` :
              `↓ $${lastMonthSpent - totalSpent} less than last month`
            }
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Savings Progress</p>
              <p className="text-3xl font-bold text-level">${currentSavings}</p>
            </div>
            <div className="bg-gradient-level p-3 rounded-xl">
              <Target className="h-8 w-8 text-level-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-level h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(savingsProgress, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">{savingsProgress.toFixed(1)}% of ${savingsGoal} goal</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">AI Prediction</p>
              <p className="text-3xl font-bold text-ai">${predictedSpending}</p>
            </div>
            <div className="bg-gradient-ai p-3 rounded-xl shadow-ai">
              <Brain className="h-8 w-8 text-ai-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Next month forecast</p>
        </CardContent>
      </Card>
    </div>
  );
};