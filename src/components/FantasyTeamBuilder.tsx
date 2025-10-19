import React, { useState, useEffect } from "react";
import { Player, FantasyTeam } from "@/types/cricket";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  DollarSign,
  Users,
  RotateCcw,
  X,
  Shuffle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { FantasyChatbot } from "./LLM";
import { PlayerCard } from "./PlayerCard";

// ----------------------
// ✨ AutoSelectModal
// ----------------------
// const AutoSelectModal = ({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) => {
//   const [composition, setComposition] = useState<string[]>([]);
//   const [batsman, setBatsman] = useState(4);
//   const [bowler, setBowler] = useState(4);
//   const [allRounder, setAllRounder] = useState(3);
//   const [teamType, setTeamType] = useState("neutral");

//   const toggleComposition = (nation: string) => {
//     setComposition((prev) =>
//       prev.includes(nation)
//         ? prev.filter((n) => n !== nation)
//         : [...prev, nation]
//     );
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-fadeIn">
//         <button
//           className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
//           onClick={onClose}
//         >
//           <X className="w-5 h-5 text-gray-600" />
//         </button>

//         <h2 className="text-2xl font-bold text-center mb-4">
//           ⚙️ Auto Team Configuration
//         </h2>

//         {/* Nationality */}
//         <div className="mb-5">
//           <p className="font-semibold mb-2 text-gray-700">Team Composition</p>
//           <div className="flex flex-wrap gap-3">
//             {["India", "Australia", "England", "Pakistan", "South Africa"].map(
//               (nation) => (
//                 <label
//                   key={nation}
//                   className="flex items-center gap-2 text-sm cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={composition.includes(nation)}
//                     onChange={() => toggleComposition(nation)}
//                     className="accent-green-600"
//                   />
//                   {nation}
//                 </label>
//               )
//             )}
//           </div>
//         </div>

//         {/* Role sliders */}
//         <div className="mb-5 space-y-4">
//           {[
//             { label: "Batsmen", value: batsman, setValue: setBatsman, min: 1, max: 6 },
//             { label: "Bowlers", value: bowler, setValue: setBowler, min: 1, max: 6 },
//             { label: "All-Rounders", value: allRounder, setValue: setAllRounder, min: 0, max: 4 },
//           ].map(({ label, value, setValue, min, max }) => (
//             <div key={label}>
//               <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
//                 <span>{label}</span>
//                 <span>{value}</span>
//               </div>
//               <input
//                 type="range"
//                 min={min}
//                 max={max}
//                 value={value}
//                 onChange={(e) => setValue(parseInt(e.target.value))}
//                 className="w-full accent-green-600"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Team Type */}
//         <div className="mb-6">
//           <p className="font-semibold mb-2 text-gray-700">Team Type</p>
//           <div className="flex justify-around text-sm">
//             {["stable", "neutral", "risky"].map((type) => (
//               <label key={type} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="teamType"
//                   value={type}
//                   checked={teamType === type}
//                   onChange={(e) => setTeamType(e.target.value)}
//                   className="accent-green-600"
//                 />
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </label>
//             ))}
//           </div>
//         </div>

//         <button
//           className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
//           onClick={() => {
//             console.log({
//               composition,
//               batsman,
//               bowler,
//               allRounder,
//               teamType,
//             });
//             onClose();
//           }}
//         >
//           Apply Auto-Select
//         </button>
//       </div>
//     </div>
//   );
// };

const AutoSelectModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [composition, setComposition] = useState<Record<string, number>>({
    India: 0,
    Australia: 0
  });

  const [batsman, setBatsman] = useState(4);
  const [bowler, setBowler] = useState(4);
  const [allRounder, setAllRounder] = useState(3);
  const [teamType, setTeamType] = useState("neutral");

  const updateComposition = (nation: string, value: number) => {
    setComposition((prev) => ({ ...prev, [nation]: value }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          ⚙️ Auto Team Configuration
        </h2>

        {/* Team Composition Sliders */}
        <div className="mb-5 space-y-4">
          <p className="font-semibold mb-2 text-gray-700">Team Composition</p>
          {Object.keys(composition).map((nation) => (
            <div key={nation}>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>{nation}</span>
                <span>{composition[nation]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={6} // max per country
                value={composition[nation]}
                onChange={(e) => updateComposition(nation, parseInt(e.target.value))}
                className="w-full accent-green-600"
              />
            </div>
          ))}
        </div>

        {/* Role Sliders */}
        <div className="mb-5 space-y-4">
          {[
            { label: "Batsmen", value: batsman, setValue: setBatsman, min: 1, max: 6 },
            { label: "Bowlers", value: bowler, setValue: setBowler, min: 1, max: 6 },
            { label: "All-Rounders", value: allRounder, setValue: setAllRounder, min: 0, max: 4 },
          ].map(({ label, value, setValue, min, max }) => (
            <div key={label}>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                className="w-full accent-green-600"
              />
            </div>
          ))}
        </div>

        {/* Team Type */}
        <div className="mb-6">
          <p className="font-semibold mb-2 text-gray-700">Team Type</p>
          <div className="flex justify-around text-sm">
            {["stable", "neutral", "risky"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="teamType"
                  value={type}
                  checked={teamType === type}
                  onChange={(e) => setTeamType(e.target.value)}
                  className="accent-green-600"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button
          className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          onClick={() => {
            console.log({
              composition,
              batsman,
              bowler,
              allRounder,
              teamType,
            });
            onClose();
          }}
        >
          Apply Auto-Select
        </button>
      </div>
    </div>
  );
};


// ----------------------
// 🏏 FantasyTeamBuilder
// ----------------------
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
  const [lastSwap, setLastSwap] = useState<{ out: Player; in: Player } | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [autoModalOpen, setAutoModalOpen] = useState(false);

  // Calculate totals
  useEffect(() => {
    const totalPoints = fantasyTeam.players.reduce((sum, p) => sum + p.points, 0);
    const totalCost = fantasyTeam.players.reduce((sum, p) => sum + p.price, 0);
    const budgetCap = 100;
    fantasyTeam.totalPoints = totalPoints;
    fantasyTeam.remainingBudget = budgetCap - totalCost;
  }, [fantasyTeam.players]);

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
    const totalPlayers = fantasyTeam.players.length;
    const idx = fantasyTeam.players.findIndex((p) => p.id === player.id);
    const row = idx < 6 ? 0 : 1;
    const posInRow = row === 0 ? idx : idx - 6;
    const maxInRow = row === 0 ? 6 : 5;
    const topPercent = row === 0 ? 30 : 60;
    const horizontalSpacing = 100 / (maxInRow + 1);
    const leftPercent = horizontalSpacing * (posInRow + 1);

    return {
      top: `${topPercent}%`,
      left: `${leftPercent}%`,
      transform: "translateX(-50%)",
    };
  };

  const sortedPlayers = availablePlayers
    .filter((p) => !fantasyTeam.players.some((fp) => fp.id === p.id))
    .sort((a, b) => b.points - a.points);

  // Auto-hide swap toast
  useEffect(() => {
    if (lastSwap) {
      const timer = setTimeout(() => setLastSwap(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSwap]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-400 via-green-400 to-green-600 rounded-3xl overflow-hidden">
      {/* HEADER */}
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
            <p className="text-xl font-bold">
              ${fantasyTeam.remainingBudget.toFixed(1)}M
            </p>
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

        {/* Auto Select Button */}
        <div className="flex justify-center mt-4">
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            onClick={() => setAutoModalOpen(true)}
          >
            <Sparkles className="w-4 h-4" /> Auto Select
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-start mt-6 space-y-8 px-4">
        {/* Stadium */}
        <div className="relative w-full max-w-[500px] aspect-[3/2] bg-gradient-to-b from-green-500 to-green-700 rounded-2xl shadow-lg flex items-center justify-center">
          <div className="absolute inset-0 bg-green-600 opacity-40 rounded-2xl"></div>

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
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg ${positionColors[p.position]} ${
                    isSelected ? "ring-4 ring-yellow-400" : ""
                  }`}
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
        <div className="w-full bg-gradient-to-b from-white/90 to-gray-50 backdrop-blur-sm border-t-4 border-green-600 p-6 rounded-t-3xl shadow-inner relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            Player Pool
            <span className="text-sm text-gray-500 font-normal">
              ({sortedPlayers.length} available)
            </span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto max-h-[65vh] px-1">
            {sortedPlayers.length > 0 ? (
              sortedPlayers.map((p) => (
                <PlayerCard
                  key={p.id}
                  player={p}
                  positionColor={positionColors[p.position]}
                  onSelect={handlePoolPlayerClick}
                  swapMode={swapMode}
                  selectedPlayer={selectedPlayer}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 col-span-full">
                No players available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {/* {assistantOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl p-4 border-l border-gray-200 overflow-y-auto z-50">
          <button
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
            onClick={() => setAssistantOpen(false)}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <FantasyChatbot
            fantasyTeam={fantasyTeam}
            availablePlayers={availablePlayers}
          />
        </div>
      )} */}

      {assistantOpen && (
  <div className="fixed right-0 top-0 h-full w-[28rem] md:w-[32rem] bg-white/95 backdrop-blur-md shadow-2xl p-4 border-l border-gray-200 overflow-y-auto z-50 flex flex-col">
    {/* Close Button */}
    <button
      className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
      onClick={() => setAssistantOpen(false)}
    >
      <X className="w-5 h-5 text-gray-600" />
    </button>

    {/* Title / Header */}
    <h2 className="text-lg font-semibold text-gray-700 mb-3">
      Fantasy Assistant
    </h2>

    {/* Chatbot */}
    <div className="flex-1">
      <FantasyChatbot
        fantasyTeam={fantasyTeam}
        availablePlayers={availablePlayers}
      />
    </div>
  </div>
)}


      {/* Swap Toast */}
      {lastSwap && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 p-3 rounded-lg shadow-lg text-sm transition-opacity duration-700">
          Swapped <span className="font-semibold">{lastSwap.out.name}</span> ↔️{" "}
          <span className="font-semibold">{lastSwap.in.name}</span>
        </div>
      )}

      {/* Auto Select Modal */}
      <AutoSelectModal
        open={autoModalOpen}
        onClose={() => setAutoModalOpen(false)}
      />
    </div>
  );
};
