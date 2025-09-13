import { useState } from 'react';
import { Plus, Coffee, Book, Car, Home, Gamepad2, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  auto: boolean;
}

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

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

export const ExpenseTracker = ({ expenses, onAddExpense }: ExpenseTrackerProps) => {
  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: 'food'
  });
  const [open, setOpen] = useState(false);

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.description) {
      onAddExpense({
        amount: parseFloat(newExpense.amount),
        description: newExpense.description,
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0],
        auto: false
      });
      setNewExpense({ amount: '', description: '', category: 'food' });
      setOpen(false);
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Recent Expenses</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="finance" size="sm" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Expense</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="What did you spend on?"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">🍕 Food</SelectItem>
                      <SelectItem value="education">📚 Education</SelectItem>
                      <SelectItem value="transport">🚗 Transport</SelectItem>
                      <SelectItem value="utilities">🏠 Utilities</SelectItem>
                      <SelectItem value="entertainment">🎮 Entertainment</SelectItem>
                      <SelectItem value="other">🛍️ Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="finance" onClick={handleAddExpense} className="flex-1">
                    Add Expense
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.slice(0, 5).map((expense) => {
            const Icon = categoryIcons[expense.category as keyof typeof categoryIcons];
            const color = categoryColors[expense.category as keyof typeof categoryColors];
            return (
              <div key={expense.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                <div className="flex items-center space-x-4">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: color + '20' }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="font-semibold">{expense.description}</p>
                    <p className="text-sm text-muted-foreground capitalize flex items-center space-x-2">
                      <span>{expense.category} • {expense.date}</span>
                      {expense.auto && (
                        <span className="bg-success/20 text-success px-2 py-1 rounded-full text-xs font-medium">
                          🤖 AI Tagged
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-lg">${expense.amount}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};