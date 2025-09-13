import { useState } from 'react';
import { Target, Plus, Calendar, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface SavingsGoal {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  onAddGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  onUpdateGoal: (id: number, amount: number) => void;
}

export const SavingsGoals = ({ goals, onAddGoal, onUpdateGoal }: SavingsGoalsProps) => {
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    targetDate: '',
    category: 'general',
    priority: 'medium' as const
  });
  const [open, setOpen] = useState(false);
  const [addAmount, setAddAmount] = useState<{ [key: number]: string }>({});

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.targetDate) {
      onAddGoal({
        title: newGoal.title,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        targetDate: newGoal.targetDate,
        category: newGoal.category,
        priority: newGoal.priority
      });
      setNewGoal({
        title: '',
        targetAmount: '',
        targetDate: '',
        category: 'general',
        priority: 'medium'
      });
      setOpen(false);
    }
  };

  const handleAddMoney = (goalId: number) => {
    const amount = parseFloat(addAmount[goalId] || '0');
    if (amount > 0) {
      onUpdateGoal(goalId, amount);
      setAddAmount({ ...addAmount, [goalId]: '' });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-danger/10 border-danger/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/50';
    }
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount).length;

  return (
    <div className="space-y-8">
      {/* Savings Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Saved</p>
                <p className="text-3xl font-bold text-success">${totalSaved}</p>
              </div>
              <div className="bg-gradient-success p-3 rounded-xl shadow-success">
                <Target className="h-8 w-8 text-success-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              ${totalTarget - totalSaved} left to reach all goals
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Goals Progress</p>
                <p className="text-3xl font-bold text-primary">{((totalSaved / totalTarget) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-gradient-primary p-3 rounded-xl shadow-primary">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalSaved / totalTarget) * 100, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Completed Goals</p>
                <p className="text-3xl font-bold text-level">{completedGoals}</p>
              </div>
              <div className="bg-gradient-level p-3 rounded-xl">
                <CheckCircle className="h-8 w-8 text-level-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              out of {goals.length} total goals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Goal */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Savings Goals</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="finance" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Goal</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Savings Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Goal Title</Label>
                    <Input
                      id="title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      placeholder="e.g., New Laptop, Spring Break Trip"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Target Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Target Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button variant="finance" onClick={handleAddGoal} className="flex-1">
                      Create Goal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const isCompleted = goal.currentAmount >= goal.targetAmount;
              const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <Card key={goal.id} className={`${getPriorityBg(goal.priority)} border`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-lg">{goal.title}</h4>
                          {isCompleted && <CheckCircle className="h-5 w-5 text-success" />}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className={`font-medium ${getPriorityColor(goal.priority)}`}>
                            {goal.priority.toUpperCase()} PRIORITY
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${goal.currentAmount}</p>
                        <p className="text-sm text-muted-foreground">of ${goal.targetAmount}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{progress.toFixed(1)}% Complete</span>
                          <span>${goal.targetAmount - goal.currentAmount} remaining</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>
                      
                      {!isCompleted && (
                        <div className="flex space-x-2">
                          <Input
                            type="number"
                            placeholder="Add amount"
                            value={addAmount[goal.id] || ''}
                            onChange={(e) => setAddAmount({ ...addAmount, [goal.id]: e.target.value })}
                            className="flex-1"
                          />
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleAddMoney(goal.id)}
                            disabled={!addAmount[goal.id] || parseFloat(addAmount[goal.id]) <= 0}
                          >
                            Add Money
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {goals.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Savings Goals Yet</h3>
                <p className="text-muted-foreground mb-4">Create your first savings goal to start building your financial future!</p>
                <Button variant="finance" onClick={() => setOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Goal
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};