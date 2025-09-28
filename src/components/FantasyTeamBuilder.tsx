import { Player, FantasyTeam } from "@/types/cricket";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayerCard } from "./PlayerCard";
import { Separator } from "@/components/ui/separator";
import { Trophy, DollarSign, Users, RotateCcw } from "lucide-react";

interface FantasyTeamBuilderProps {
  availablePlayers: Player[];
  fantasyTeam: FantasyTeam;
  onPlayerAdd: (player: Player) => void;
  onPlayerRemove: (player: Player) => void;
  onPlayerSwap: (playerOut: Player, playerIn: Player) => void;
}

export const FantasyTeamBuilder = ({ 
  availablePlayers, 
  fantasyTeam, 
  onPlayerAdd, 
  onPlayerRemove,
  onPlayerSwap 
}: FantasyTeamBuilderProps) => {
  const maxPlayers = 11;
  const canAddMore = fantasyTeam.players.length < maxPlayers;
  
  const getPositionCount = (position: string) => {
    return fantasyTeam.players.filter(p => p.position === position).length;
  };

  const sortedAvailablePlayers = availablePlayers
    .filter(p => !fantasyTeam.players.some(fp => fp.id === p.id))
    .sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6">
      {/* Fantasy Team Stats */}
      <Card className="p-6 bg-gradient-to-br from-cricket-green/5 to-fantasy-blue/5 border-cricket-green/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-cricket-green rounded-full mx-auto mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold">{fantasyTeam.players.length}/{maxPlayers}</p>
            <p className="text-sm text-muted-foreground">Players</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-fantasy-gold rounded-full mx-auto mb-2">
              <Trophy className="w-6 h-6 text-foreground" />
            </div>
            <p className="text-2xl font-bold">{fantasyTeam.totalPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-fantasy-blue rounded-full mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold">${fantasyTeam.remainingBudget.toFixed(1)}M</p>
            <p className="text-sm text-muted-foreground">Budget Left</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-fantasy rounded-full mx-auto mb-2">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Transfers Left</p>
          </div>
        </div>
      </Card>

      {/* Position Requirements */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Team Composition</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Badge variant="outline" className="justify-center p-2">
            Batsmen: {getPositionCount('Batsman')}/6
          </Badge>
          <Badge variant="outline" className="justify-center p-2">
            Bowlers: {getPositionCount('Bowler')}/6
          </Badge>
          <Badge variant="outline" className="justify-center p-2">
            WK: {getPositionCount('Wicket-Keeper')}/2
          </Badge>
          <Badge variant="outline" className="justify-center p-2">
            All-Rounders: {getPositionCount('All-Rounder')}/4
          </Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selected Players */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Your Fantasy Team</h3>
            <Badge className="bg-fantasy-gold text-foreground">
              {fantasyTeam.players.length} Selected
            </Badge>
          </div>
          
          {fantasyTeam.players.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Start building your fantasy team by selecting players</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {fantasyTeam.players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelected={true}
                  onRemove={onPlayerRemove}
                  showAddButton={false}
                  showRemoveButton={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Available Players */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Available Players</h3>
            <Badge variant="outline">
              {sortedAvailablePlayers.length} Available
            </Badge>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {sortedAvailablePlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={false}
                onSelect={canAddMore ? onPlayerAdd : undefined}
                showAddButton={canAddMore}
                showRemoveButton={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};