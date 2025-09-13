import { useState } from 'react';
import { FinanceHeader } from "@/components/FinanceHeader";
import { NavigationTabs } from "@/components/NavigationTabs";
import { BudgetCard } from "@/components/BudgetCard";
import { MetricsGrid } from "@/components/MetricsGrid";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { SimplePieChart } from "@/components/SimpleCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Book, Car, Home, Gamepad2, ShoppingCart, Lightbulb, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [budget] = useState(800);
  const [totalSpent, setTotalSpent] = useState(542);
  const [savingsGoal] = useState(1000);
  const [currentSavings] = useState(350);
  const [points, setPoints] = useState(1250);
  const [level] = useState(3);

  const [expenses, setExpenses] = useState([
    { id: 1, amount: 45, description: 'Grocery shopping', category: 'food', date: '2024-09-12', auto: true },
    { id: 2, amount: 120, description: 'Textbooks', category: 'education', date: '2024-09-11', auto: true },
    { id: 3, amount: 25, description: 'Coffee & snacks', category: 'food', date: '2024-09-10', auto: true },
    { id: 4, amount: 80, description: 'Phone bill', category: 'utilities', date: '2024-09-09', auto: true },
    { id: 5, amount: 15, description: 'Bus pass', category: 'transport', date: '2024-09-08', auto: true },
    { id: 6, amount: 60, description: 'Dinner out', category: 'food', date: '2024-09-07', auto: true },
    { id: 7, amount: 35, description: 'Netflix subscription', category: 'entertainment', date: '2024-09-06', auto: true },
    { id: 8, amount: 22, description: 'Laundry', category: 'utilities', date: '2024-09-05', auto: true },
  ]);

  const categoryColors = {
    food: '#FF6B6B',
    education: '#4ECDC4',
    transport: '#45B7D1',
    utilities: '#96CEB4',
    entertainment: '#FECA57',
    other: '#DDA0DD'
  };

  const categoryIcons = {
    food: Coffee,
    education: Book,
    transport: Car,
    utilities: Home,
    entertainment: Gamepad2,
    other: ShoppingCart
  };

  const budgetRemaining = budget - totalSpent;
  const budgetUsedPercent = (totalSpent / budget) * 100;
  const savingsProgress = (currentSavings / savingsGoal) * 100;
  const lastMonthSpent = 580;
  const predictedSpending = 580;

  const categoryData = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name as keyof typeof categoryColors]
  }));

  const aiTips = [
    { 
      category: 'food', 
      tip: 'Cook 4 more meals at home this week', 
      potential: 'Save $80/month', 
      icon: Coffee, 
      savings: 80, 
      difficulty: 'Easy' 
    },
    { 
      category: 'transport', 
      tip: 'Get a monthly bus pass instead of daily tickets', 
      potential: 'Save $25/month', 
      icon: Car, 
      savings: 25, 
      difficulty: 'Easy' 
    },
    { 
      category: 'entertainment', 
      tip: 'Share streaming subscriptions with 2 friends', 
      potential: 'Save $35/month', 
      icon: Gamepad2, 
      savings: 35, 
      difficulty: 'Medium' 
    },
  ];

  const handleAddExpense = (newExpense: Omit<typeof expenses[0], 'id'>) => {
    const expense = {
      ...newExpense,
      id: expenses.length + 1,
    };
    setExpenses([expense, ...expenses]);
    setTotalSpent(prev => prev + newExpense.amount);
    setPoints(prev => prev + 10);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <FinanceHeader points={points} level={level} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <BudgetCard 
              budgetRemaining={budgetRemaining}
              budgetUsedPercent={budgetUsedPercent}
              totalSpent={totalSpent}
              budget={budget}
            />
            
            <MetricsGrid
              budgetRemaining={budgetRemaining}
              totalSpent={totalSpent}
              currentSavings={currentSavings}
              savingsGoal={savingsGoal}
              predictedSpending={predictedSpending}
              budgetUsedPercent={budgetUsedPercent}
              savingsProgress={savingsProgress}
              lastMonthSpent={lastMonthSpent}
            />

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimplePieChart data={categoryData} />
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {categoryData.map((item) => {
                      const Icon = categoryIcons[item.name as keyof typeof categoryIcons];
                      return (
                        <div key={item.name} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <span className="text-sm font-medium capitalize">{item.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">${item.value}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-warning" />
                    <span>Smart Money Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiTips.map((tip, index) => {
                      const Icon = tip.icon;
                      return (
                        <div key={index} className="p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-xl border border-success/20">
                          <div className="flex items-start space-x-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                              <Icon className="h-5 w-5 text-success" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{tip.tip}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full font-medium">
                                  {tip.potential}
                                </span>
                                <span className="text-xs text-muted-foreground">{tip.difficulty}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <ExpenseTracker expenses={expenses} onAddExpense={handleAddExpense} />
              
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-ai" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-ai/10 rounded-xl border border-ai/20">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="h-5 w-5 text-ai mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-ai">Smart Prediction</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your spending typically increases by 15% during exam season. 
                          Consider budgeting an extra $120 for December finals.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-success/10 rounded-xl border border-success/20">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-success">Money-Saving Opportunity</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You're spending 40% more on food than similar students. 
                          Try meal prep on Sundays to save $60/month.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div>
            <ExpenseTracker expenses={expenses} onAddExpense={handleAddExpense} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
