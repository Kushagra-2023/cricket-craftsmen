import { Team } from "@/types/cricket";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface TeamSelectorProps {
  teams: Team[];
  selectedTeams: Team[];
  onTeamSelect: (team: Team) => void;
  maxSelections: number;
}

export const TeamSelector = ({
  teams,
  selectedTeams,
  onTeamSelect,
  maxSelections,
}: TeamSelectorProps) => {
  const isTeamSelected = (team: Team) =>
    selectedTeams.some((t) => t.id === team.id);
  const canSelectMore = selectedTeams.length < maxSelections;

  return (
    <div className="space-y-6 relative z-10"> {/* ✅ Keeps this layer above dashboard */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-cricket bg-clip-text text-transparent">
          Select Your Teams
        </h2>
        <p className="text-muted-foreground mt-2">
          Choose {maxSelections} teams to build your fantasy squad from
        </p>
      </div>

      {/* ✅ Main grid area */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto relative z-20">
        {teams.map((team) => {
          const selected = isTeamSelected(team);
          return (
            <Card
              key={team.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-player border-2 ${
                selected
                  ? "border-fantasy-gold bg-gradient-to-br from-fantasy-gold/10 to-fantasy-blue/10 shadow-selected"
                  : "border-transparent hover:border-cricket-green/30"
              }`}
              onClick={() => onTeamSelect(team)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-card"
                    style={{ backgroundColor: team.color }}
                  >
                    {team.shortName}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{team.name}</h3>
                    <p className="text-muted-foreground">
                      {team.players.length} players available
                    </p>
                  </div>
                </div>

                {selected && (
                  <div className="flex items-center justify-center w-8 h-8 bg-fantasy-gold rounded-full">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Button
                  variant={selected ? "selected" : canSelectMore ? "cricket" : "outline"}
                  disabled={!canSelectMore && !selected}
                  className="w-full"
                >
                  {selected ? "Selected" : canSelectMore ? "Select Team" : "Max Teams Selected"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ✅ Info Strip always on top */}
      <div className="sticky bottom-0 z-50 bg-background/80 backdrop-blur-md border-t border-border p-4 rounded-t-2xl shadow-md flex items-center justify-around">
        <span className="font-semibold text-sm">🏏 Batsmen: 3</span>
        <span className="font-semibold text-sm">🎯 Bowlers: 3</span>
        <span className="font-semibold text-sm">⚡ All-rounders: 2</span>
        <span className="font-semibold text-sm">🧤 Keepers: 1</span>
      </div>
    </div>
  );
};
