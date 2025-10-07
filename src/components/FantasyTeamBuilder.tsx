import React, { useState, useEffect } from "react";
import { Player, FantasyTeam } from "@/types/cricket";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, DollarSign, Users, RotateCcw, X, Shuffle, MessageSquare } from "lucide-react";
import { FantasyChatbot } from "./LLM";
import * as Toast from "./ui/toast";

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
  const [lastSwap, setLastSwap] = useState<{ out: Player; in: Player } | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const handleTeamPlayerClick = (player: Player) => {
    if (swapMode && selectedPlayer?.id === player.id) {
      setSwapMode(false);
      setSelectedPlayer(null);
      return;
    }
    setSelectedPlayer(player);
    setSwapMode(true);
  };

  const handlePoolPlayerClick = (player: Player) => {
    if (swapMode && selectedPlayer) {
      onPlayerSwap(selectedPlayer, player);
      setLastSwap({ out: selectedPlayer, in: player });
      setSwapMode(false);
      setSelectedPlayer(null);
      return;
    }
    if (!swapMode && canAddMore) onPlayerAdd(player);
  };

  const getPositionCount = (pos: string) =>
    fantasyTeam.players.filter((p) => p.position === pos).length;

  const positionColors: Record<string, string> = {
    Batsman: "bg-blue-500",
    Bowler: "bg-red-500",
    "Wicket-Keeper": "bg-green-500",
    "All-Rounder": "bg-purple-500",
  };

  const getFieldPosition = (player: Player) => {
    const positions: Record<string, any[]> = {
      "Wicket-Keeper": [{ bottom: "12%", left: "50%", transform: "translateX(-50%)" }],
      Batsman: [
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
      Bowler: [
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

  // 🕒 Auto-hide last swap after 2 seconds
  useEffect(() => {
    if (lastSwap) {
      const timer = setTimeout(() => setLastSwap(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSwap]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-400 via-green-400 to-green-600">
      {/* 1️⃣ HEADER */}
      <div className="bg-white/90 backdrop-blur-sm p-4 shadow-lg sticky top-0 z-30">
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
            <p className="text-xl font-bold">${fantasyTeam.remainingBudget.toFixed(1)}M</p>
            <p className="text-xs text-gray-600">Budget</p>
          </div>

          <div className="text-center relative">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full mx-auto mb-1">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-bold">3</p>
            <p className="text-xs text-gray-600">Transfers</p>
            <button
              className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center"
              onClick={() => setAssistantOpen(!assistantOpen)}
            >
              <MessageSquare className="w-3 h-3 text-white" />
            </button>
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

      {/* 2️⃣ MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-start mt-6 space-y-8 px-4">
        {/* Stadium */}
        <div className="relative w-full max-w-[500px] aspect-[3/2] bg-gradient-to-b from-green-500 to-green-700 rounded-2xl shadow-lg flex items-center justify-center">
          <div className="absolute inset-0 bg-green-600 opacity-40 rounded-2xl"></div>

          {fantasyTeam.players.map((p) => {
            const pos = getFieldPosition(p);
            const isSelected = selectedPlayer?.id === p.id;
            return (
              <div key={p.id} className="absolute cursor-pointer" style={pos} onClick={() => handleTeamPlayerClick(p)}>
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg ${positionColors[p.position]} ${
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
        <div className="w-full bg-white/95 backdrop-blur-sm border-t-4 border-green-600 p-6 rounded-t-2xl shadow-inner">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredPlayers.map((p) => (
              <Card
                key={p.id}
                className="p-2 cursor-pointer hover:scale-105 hover:shadow-lg transition"
                onClick={() => handlePoolPlayerClick(p)}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${positionColors[p.position]} text-white font-bold`}>
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-center text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-gray-600">{p.team}</div>
                  <div className="flex justify-between w-full text-xs mt-1">
                    <span>${p.price}M</span>
                    <span>{p.points}pts</span>
                  </div>
                  <Badge variant="outline" className="text-xs w-full text-center">{p.position}</Badge>
                </div>
              </Card>
            ))}
            {filteredPlayers.length === 0 && (
              <div className="text-center py-8 text-gray-500 col-span-full">No players available</div>
            )}
          </div>
        </div>
      </div>

      {/* 3️⃣ CHAT SIDEBAR */}
      {assistantOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl p-4 border-l border-gray-200 overflow-y-auto z-50">
          {/* ✖️ Close button */}
          <button
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
            onClick={() => setAssistantOpen(false)}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <FantasyChatbot fantasyTeam={fantasyTeam} availablePlayers={availablePlayers} />
        </div>
      )}

      {/* Swap Info Toast */}
      {lastSwap && (
        <div
          className={`fixed bottom-4 right-4 bg-yellow-100 p-3 rounded-lg shadow-lg text-sm transition-opacity duration-700 ${
            lastSwap ? "opacity-100" : "opacity-0"
          }`}
        >
          Swapped <span className="font-semibold">{lastSwap.out.name}</span> ↔️{" "}
          <span className="font-semibold">{lastSwap.in.name}</span>
        </div>
      )}
    </div>
  );
};
