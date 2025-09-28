import { Player } from "@/types/cricket";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, Award } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  isSelected?: boolean;
  onSelect?: (player: Player) => void;
  onRemove?: (player: Player) => void;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}

export const PlayerCard = ({ 
  player, 
  isSelected = false, 
  onSelect, 
  onRemove, 
  showAddButton = true,
  showRemoveButton = false 
}: PlayerCardProps) => {
  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case 'batsman': return 'bg-fantasy-blue text-white';
      case 'bowler': return 'bg-cricket-green text-white';
      case 'wicket-keeper': return 'bg-fantasy-gold text-foreground';
      case 'all-rounder': return 'bg-gradient-fantasy text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position.toLowerCase()) {
      case 'batsman': return <Target className="w-4 h-4" />;
      case 'bowler': return <TrendingUp className="w-4 h-4" />;
      case 'wicket-keeper': return <Award className="w-4 h-4" />;
      case 'all-rounder': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-player ${
      isSelected ? 'ring-2 ring-fantasy-gold shadow-selected bg-gradient-to-br from-fantasy-gold/5 to-fantasy-blue/5' : ''
    }`}>
      <div className="flex flex-col space-y-3">
        {/* Player Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-cricket rounded-full flex items-center justify-center text-white font-bold">
              {player.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{player.name}</h3>
              <p className="text-sm text-muted-foreground">{player.team}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-bold text-fantasy-gold">${player.price}M</p>
          </div>
        </div>

        {/* Position Badge */}
        <div className="flex items-center space-x-2">
          <Badge className={`${getPositionColor(player.position)} border-0`}>
            {getPositionIcon(player.position)}
            {player.position}
          </Badge>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            {player.points} pts
          </Badge>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center p-2 bg-muted rounded-lg">
            <p className="font-semibold">{player.stats.matches}</p>
            <p className="text-muted-foreground">Matches</p>
          </div>
          {player.stats.runs && (
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="font-semibold">{player.stats.runs}</p>
              <p className="text-muted-foreground">Runs</p>
            </div>
          )}
          {player.stats.wickets && (
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="font-semibold">{player.stats.wickets}</p>
              <p className="text-muted-foreground">Wickets</p>
            </div>
          )}
          {player.stats.catches && (
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="font-semibold">{player.stats.catches}</p>
              <p className="text-muted-foreground">Catches</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {showAddButton && !isSelected && onSelect && (
            <Button 
              onClick={() => onSelect(player)}
              variant="cricket"
              className="flex-1"
            >
              Add Player
            </Button>
          )}
          {showRemoveButton && isSelected && onRemove && (
            <Button 
              onClick={() => onRemove(player)}
              variant="destructive"
              className="flex-1"
            >
              Remove
            </Button>
          )}
          {isSelected && !showRemoveButton && (
            <Button variant="selected" className="flex-1" disabled>
              Selected
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};