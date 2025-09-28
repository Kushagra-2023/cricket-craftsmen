export interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  points: number;
  price: number;
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    catches?: number;
  };
  imageUrl: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  logo: string;
  players: Player[];
}

export type CricketFormat = 'T20' | 'ODI' | 'Test';

export interface FantasyTeam {
  id: string;
  name: string;
  players: Player[];
  totalPoints: number;
  budget: number;
  remainingBudget: number;
}

export interface TeamSelectionState {
  selectedFormat?: CricketFormat;
  selectedTeams: Team[];
  availablePlayers: Player[];
  fantasyTeam: FantasyTeam;
}