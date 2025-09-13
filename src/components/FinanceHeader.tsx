import { Star, Trophy, DollarSign } from "lucide-react";

interface FinanceHeaderProps {
  points: number;
  level: number;
}

export const FinanceHeader = ({ points, level }: FinanceHeaderProps) => {
  return (
    <div className="bg-white shadow-elegant border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-primary p-3 rounded-2xl shadow-primary">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                SmartFinance
              </h1>
              <p className="text-sm text-muted-foreground font-medium">AI-Powered Student Finance Manager</p>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center bg-gradient-gold p-4 rounded-xl shadow-elegant">
              <div className="flex items-center space-x-2 text-gold-foreground">
                <Star className="h-5 w-5" />
                <span className="font-bold text-lg">{points}</span>
              </div>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center bg-gradient-level p-4 rounded-xl shadow-elegant">
              <div className="flex items-center space-x-2 text-level-foreground">
                <Trophy className="h-5 w-5" />
                <span className="font-bold text-lg">Level {level}</span>
              </div>
              <p className="text-xs text-muted-foreground">Achievement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};