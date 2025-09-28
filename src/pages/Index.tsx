import { useState } from "react";
import { Team, Player, FantasyTeam, TeamSelectionState } from "@/types/cricket";
import { mockTeams } from "@/data/cricketData";
import { CricketHero } from "@/components/CricketHero";
import { TeamSelector } from "@/components/TeamSelector";
import { FantasyTeamBuilder } from "@/components/FantasyTeamBuilder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AppStep = 'hero' | 'team-selection' | 'team-building';

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [gameState, setGameState] = useState<TeamSelectionState>({
    selectedTeams: [],
    availablePlayers: [],
    fantasyTeam: {
      id: 'user-team',
      name: 'My Fantasy Team',
      players: [],
      totalPoints: 0,
      budget: 100.0,
      remainingBudget: 100.0,
    },
  });

  const handleGetStarted = () => {
    setCurrentStep('team-selection');
  };

  const handleTeamSelect = (team: Team) => {
    const isSelected = gameState.selectedTeams.some(t => t.id === team.id);
    
    if (isSelected) {
      // Deselect team
      const newSelectedTeams = gameState.selectedTeams.filter(t => t.id !== team.id);
      const newAvailablePlayers = gameState.availablePlayers.filter(p => p.team !== team.name);
      
      setGameState(prev => ({
        ...prev,
        selectedTeams: newSelectedTeams,
        availablePlayers: newAvailablePlayers,
      }));
      
      toast({
        title: "Team Deselected",
        description: `${team.name} has been removed from your selection.`,
      });
    } else if (gameState.selectedTeams.length < 2) {
      // Select team
      const newSelectedTeams = [...gameState.selectedTeams, team];
      const newAvailablePlayers = [...gameState.availablePlayers, ...team.players];
      
      setGameState(prev => ({
        ...prev,
        selectedTeams: newSelectedTeams,
        availablePlayers: newAvailablePlayers,
      }));
      
      toast({
        title: "Team Selected",
        description: `${team.name} added to your selection. ${team.players.length} players now available.`,
      });
      
      // Auto-advance if 2 teams selected
      if (newSelectedTeams.length === 2) {
        setTimeout(() => {
          setCurrentStep('team-building');
          toast({
            title: "Ready to Build!",
            description: "Now select players from both teams to create your fantasy squad.",
          });
        }, 1000);
      }
    }
  };

  const handlePlayerAdd = (player: Player) => {
    if (gameState.fantasyTeam.players.length >= 11) {
      toast({
        title: "Team Full",
        description: "You can only select 11 players. Remove a player first.",
        variant: "destructive",
      });
      return;
    }

    if (gameState.fantasyTeam.remainingBudget < player.price) {
      toast({
        title: "Insufficient Budget",
        description: `You need $${player.price}M but only have $${gameState.fantasyTeam.remainingBudget.toFixed(1)}M remaining.`,
        variant: "destructive",
      });
      return;
    }

    const newPlayers = [...gameState.fantasyTeam.players, player];
    const newTotalPoints = newPlayers.reduce((sum, p) => sum + p.points, 0);
    const newRemainingBudget = gameState.fantasyTeam.remainingBudget - player.price;

    setGameState(prev => ({
      ...prev,
      fantasyTeam: {
        ...prev.fantasyTeam,
        players: newPlayers,
        totalPoints: newTotalPoints,
        remainingBudget: newRemainingBudget,
      },
    }));

    toast({
      title: "Player Added",
      description: `${player.name} has been added to your fantasy team!`,
    });
  };

  const handlePlayerRemove = (player: Player) => {
    const newPlayers = gameState.fantasyTeam.players.filter(p => p.id !== player.id);
    const newTotalPoints = newPlayers.reduce((sum, p) => sum + p.points, 0);
    const newRemainingBudget = gameState.fantasyTeam.remainingBudget + player.price;

    setGameState(prev => ({
      ...prev,
      fantasyTeam: {
        ...prev.fantasyTeam,
        players: newPlayers,
        totalPoints: newTotalPoints,
        remainingBudget: newRemainingBudget,
      },
    }));

    toast({
      title: "Player Removed",
      description: `${player.name} has been removed from your fantasy team.`,
    });
  };

  const handlePlayerSwap = (playerOut: Player, playerIn: Player) => {
    // For now, we'll implement this as remove + add
    handlePlayerRemove(playerOut);
    setTimeout(() => handlePlayerAdd(playerIn), 100);
  };

  const handleReset = () => {
    setGameState({
      selectedTeams: [],
      availablePlayers: [],
      fantasyTeam: {
        id: 'user-team',
        name: 'My Fantasy Team',
        players: [],
        totalPoints: 0,
        budget: 100.0,
        remainingBudget: 100.0,
      },
    });
    setCurrentStep('hero');
    toast({
      title: "Game Reset",
      description: "Starting fresh! Build your dream team again.",
    });
  };

  const handleBackToTeamSelection = () => {
    setCurrentStep('team-selection');
  };

  if (currentStep === 'hero') {
    return <CricketHero onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cricket-green/5 to-fantasy-blue/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={currentStep === 'team-building' ? handleBackToTeamSelection : () => setCurrentStep('hero')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-cricket bg-clip-text text-transparent">
                Fantasy Cricket
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              {gameState.selectedTeams.length > 0 && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-muted-foreground">Teams:</span>
                  {gameState.selectedTeams.map((team, index) => (
                    <span key={team.id} className="font-medium">
                      {team.shortName}
                      {index < gameState.selectedTeams.length - 1 && " vs "}
                    </span>
                  ))}
                </div>
              )}
              <Button variant="outline" onClick={handleReset} size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {currentStep === 'team-selection' && (
          <TeamSelector
            teams={mockTeams}
            selectedTeams={gameState.selectedTeams}
            onTeamSelect={handleTeamSelect}
            maxSelections={2}
          />
        )}

        {currentStep === 'team-building' && (
          <FantasyTeamBuilder
            availablePlayers={gameState.availablePlayers}
            fantasyTeam={gameState.fantasyTeam}
            onPlayerAdd={handlePlayerAdd}
            onPlayerRemove={handlePlayerRemove}
            onPlayerSwap={handlePlayerSwap}
          />
        )}
      </div>
    </div>
  );
};

export default Index;