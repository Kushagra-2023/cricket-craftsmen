import React, { useState } from "react";
import { Player, FantasyTeam } from "@/types/cricket";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, DollarSign, Users, RotateCcw, X, Shuffle } from "lucide-react";

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
  onPlayerSwap,
}: FantasyTeamBuilderProps) => {
  const maxPlayers = 11;
  const canAddMore = fantasyTeam.players.length < maxPlayers;

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [swapMode, setSwapMode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "All" | "Batsman" | "Bowler" | "Wicket-Keeper" | "All-Rounder"
  >("All");
  const [lastSwap, setLastSwap] = useState<{ out: Player; in: Player } | null>(
    null
  );

  // 🟢 TEAM PLAYER CLICK
  const handleTeamPlayerClick = (player: Player) => {
    // If same player clicked twice → cancel selection
    if (swapMode && selectedPlayer?.id === player.id) {
      setSwapMode(false);
      setSelectedPlayer(null);
      return;
    }

    // Select this player to swap out
    setSelectedPlayer(player);
    setSwapMode(true);
  };

  // 🟢 POOL PLAYER CLICK
  const handlePoolPlayerClick = (player: Player) => {
    if (swapMode && selectedPlayer) {
      // Perform swap
      onPlayerSwap(selectedPlayer, player);

      // Store swap info (Player A and B)
      setLastSwap({ out: selectedPlayer, in: player });

      // Reset swap mode
      setSwapMode(false);
      setSelectedPlayer(null);
      return;
    } 
    
    if (!swapMode && canAddMore) {
      // Only add if not in swap mode
      onPlayerAdd(player);
    }
  };

  // Helper functions
  const getPositionCount = (pos: string) =>
    fantasyTeam.players.filter((p) => p.position === pos).length;

  const positionColors: Record<string, string> = {
    "Batsman": "bg-blue-500",
    "Bowler": "bg-red-500",
    "Wicket-Keeper": "bg-green-500",
    "All-Rounder": "bg-purple-500",
  };

  const getFieldPosition = (player: Player) => {
    const positions: Record<string, any[]> = {
      "Wicket-Keeper": [
        { bottom: "12%", left: "50%", transform: "translateX(-50%)" },
      ],
      "Batsman": [
        { bottom: "30%", left: "15%" },
        { bottom: "30%", left: "35%" },
        { bottom: "30%", right: "15%" },
        { bottom: "30%", right: "35%" },
        { bottom: "45%", left: "50%", transform: "translateX(-50%)" },
      ],
      "All-Rounder": [
        { bottom: "60%", left: "20%" },
        { bottom: "60%", right: "20%" },
        { bottom: "70%", left: "50%", transform: "translateX(-50%)" },
      ],
      "Bowler": [
        { bottom: "85%", left: "20%" },
        { bottom: "85%", right: "20%" },
        { bottom: "90%", left: "50%", transform: "translateX(-50%)" },
      ],
    };

    const playersByPosition = fantasyTeam.players.filter(
      (p) => p.position === player.position
    );
    const idx = playersByPosition.findIndex((p) => p.id === player.id);
    return (
      positions[player.position]?.[idx] ?? {
        bottom: "50%",
        left: "50%",
        transform: "translateX(-50%)",
      }
    );
  };

  const sortedPlayers = availablePlayers
    .filter((p) => !fantasyTeam.players.some((fp) => fp.id === p.id))
    .sort((a, b) => b.points - a.points);

  const filteredPlayers =
    activeTab === "All"
      ? sortedPlayers
      : sortedPlayers.filter((p) => p.position === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-400 via-green-400 to-green-600">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm p-4 shadow-lg sticky top-16 z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mx-auto mb-1">
              <Users className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-bold">
              {fantasyTeam.players.length}/{maxPlayers}
            </p>
            <p className="text-xs text-gray-600">Players</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full mx-auto mb-1">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-bold">{fantasyTeam.totalPoints}</p>
            <p className="text-xs text-gray-600">Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full mx-auto mb-1">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-bold">
              ${fantasyTeam.remainingBudget.toFixed(1)}M
            </p>
            <p className="text-xs text-gray-600">Budget</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full mx-auto mb-1">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-bold">3</p>
            <p className="text-xs text-gray-600">Transfers</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 max-w-4xl mx-auto">
          {["Batsman", "Bowler", "Wicket-Keeper", "All-Rounder"].map((pos) => (
            <Badge
              key={pos}
              variant="outline"
              className={`justify-center p-2 ${positionColors[pos]} bg-opacity-20 text-black`}
            >
              {pos}: {getPositionCount(pos)}/
              {pos === "Batsman" || pos === "Bowler"
                ? 6
                : pos === "All-Rounder"
                ? 4
                : 2}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stadium */}
      <div className="relative w-full max-w-[500px] mx-auto aspect-[3/2] my-6">
        <div className="absolute inset-0 bg-green-600 rounded-lg opacity-40"></div>

        {fantasyTeam.players.map((p) => {
          const pos = getFieldPosition(p);
          const isSelected = selectedPlayer?.id === p.id;
          return (
            <div
              key={p.id}
              className="absolute cursor-pointer"
              style={pos}
              onClick={() => handleTeamPlayerClick(p)}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg
              ${positionColors[p.position]} ${
                  isSelected ? "ring-4 ring-yellow-400" : ""
                }`}
              >
                {p.name.split(" ").map((n) => n[0]).join("")}
                <button
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayerRemove(p);
                    setSelectedPlayer(null);
                    setSwapMode(false);
                  }}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          );
        })}

        {swapMode && selectedPlayer && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded shadow-lg z-10">
            <Shuffle className="inline w-4 h-4 mr-1" />
            Click player from pool to swap with {selectedPlayer.name}
          </div>
        )}
      </div>

      {/* Player Pool */}
      <div className="bg-white/95 backdrop-blur-sm border-t-4 border-green-600 flex-1 overflow-y-auto">
        {/* Tabs */}
        <div className="flex gap-2 p-4 sticky top-0 bg-white z-10 border-b">
          {["All", "Batsman", "Bowler", "Wicket-Keeper", "All-Rounder"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Player Grid */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredPlayers.map((p) => (
            <Card
              key={p.id}
              className="p-2 cursor-pointer hover:scale-105 hover:shadow-lg transition"
              onClick={() => handlePoolPlayerClick(p)}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${positionColors[p.position]} text-white font-bold`}
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-center text-sm font-medium truncate">
                  {p.name}
                </div>
                <div className="text-xs text-gray-600">{p.team}</div>
                <div className="flex justify-between w-full text-xs mt-1">
                  <span>${p.price}M</span>
                  <span>{p.points}pts</span>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs w-full text-center"
                >
                  {p.position}
                </Badge>
              </div>
            </Card>
          ))}
          {filteredPlayers.length === 0 && (
            <div className="text-center py-8 text-gray-500 col-span-full">
              No players available
            </div>
          )}
        </div>
      </div>

      {/* Last Swap Message */}
      {lastSwap && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 p-3 rounded-lg shadow-lg text-sm">
          Swapped{" "}
          <span className="font-semibold">{lastSwap.out.name}</span> ↔️{" "}
          <span className="font-semibold">{lastSwap.in.name}</span>
        </div>
      )}
    </div>
  );
};
