// import { Player, FantasyTeam } from "@/types/cricket";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { PlayerCard } from "./PlayerCard";
// import { Separator } from "@/components/ui/separator";
// import { Trophy, DollarSign, Users, RotateCcw } from "lucide-react";

// interface FantasyTeamBuilderProps {
//   availablePlayers: Player[];
//   fantasyTeam: FantasyTeam;
//   onPlayerAdd: (player: Player) => void;
//   onPlayerRemove: (player: Player) => void;
//   onPlayerSwap: (playerOut: Player, playerIn: Player) => void;
// }

// export const FantasyTeamBuilder = ({ 
//   availablePlayers, 
//   fantasyTeam, 
//   onPlayerAdd, 
//   onPlayerRemove,
//   onPlayerSwap 
// }: FantasyTeamBuilderProps) => {
//   const maxPlayers = 11;
//   const canAddMore = fantasyTeam.players.length < maxPlayers;
  
//   const getPositionCount = (position: string) => {
//     return fantasyTeam.players.filter(p => p.position === position).length;
//   };

//   const sortedAvailablePlayers = availablePlayers
//     .filter(p => !fantasyTeam.players.some(fp => fp.id === p.id))
//     .sort((a, b) => b.points - a.points);

//   return (
//     <div className="space-y-6">
//       {/* Fantasy Team Stats */}
//       <Card className="p-6 bg-gradient-to-br from-cricket-green/5 to-fantasy-blue/5 border-cricket-green/20">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="flex items-center justify-center w-12 h-12 bg-cricket-green rounded-full mx-auto mb-2">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <p className="text-2xl font-bold">{fantasyTeam.players.length}/{maxPlayers}</p>
//             <p className="text-sm text-muted-foreground">Players</p>
//           </div>
//           <div className="text-center">
//             <div className="flex items-center justify-center w-12 h-12 bg-fantasy-gold rounded-full mx-auto mb-2">
//               <Trophy className="w-6 h-6 text-foreground" />
//             </div>
//             <p className="text-2xl font-bold">{fantasyTeam.totalPoints}</p>
//             <p className="text-sm text-muted-foreground">Total Points</p>
//           </div>
//           <div className="text-center">
//             <div className="flex items-center justify-center w-12 h-12 bg-fantasy-blue rounded-full mx-auto mb-2">
//               <DollarSign className="w-6 h-6 text-white" />
//             </div>
//             <p className="text-2xl font-bold">${fantasyTeam.remainingBudget.toFixed(1)}M</p>
//             <p className="text-sm text-muted-foreground">Budget Left</p>
//           </div>
//           <div className="text-center">
//             <div className="flex items-center justify-center w-12 h-12 bg-gradient-fantasy rounded-full mx-auto mb-2">
//               <RotateCcw className="w-6 h-6 text-white" />
//             </div>
//             <p className="text-2xl font-bold">3</p>
//             <p className="text-sm text-muted-foreground">Transfers Left</p>
//           </div>
//         </div>
//       </Card>

//       {/* Position Requirements */}
//       <Card className="p-4">
//         <h3 className="font-semibold mb-3">Team Composition</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//           <Badge variant="outline" className="justify-center p-2">
//             Batsmen: {getPositionCount('Batsman')}/6
//           </Badge>
//           <Badge variant="outline" className="justify-center p-2">
//             Bowlers: {getPositionCount('Bowler')}/6
//           </Badge>
//           <Badge variant="outline" className="justify-center p-2">
//             WK: {getPositionCount('Wicket-Keeper')}/2
//           </Badge>
//           <Badge variant="outline" className="justify-center p-2">
//             All-Rounders: {getPositionCount('All-Rounder')}/4
//           </Badge>
//         </div>
//       </Card>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Selected Players */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-semibold">Your Fantasy Team</h3>
//             <Badge className="bg-fantasy-gold text-foreground">
//               {fantasyTeam.players.length} Selected
//             </Badge>
//           </div>
          
//           {fantasyTeam.players.length === 0 ? (
//             <Card className="p-8 text-center">
//               <p className="text-muted-foreground">Start building your fantasy team by selecting players</p>
//             </Card>
//           ) : (
//             <div className="space-y-3">
//               {fantasyTeam.players.map((player) => (
//                 <PlayerCard
//                   key={player.id}
//                   player={player}
//                   isSelected={true}
//                   onRemove={onPlayerRemove}
//                   showAddButton={false}
//                   showRemoveButton={true}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Available Players */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-semibold">Available Players</h3>
//             <Badge variant="outline">
//               {sortedAvailablePlayers.length} Available
//             </Badge>
//           </div>
          
//           <div className="space-y-3 max-h-[600px] overflow-y-auto">
//             {sortedAvailablePlayers.map((player) => (
//               <PlayerCard
//                 key={player.id}
//                 player={player}
//                 isSelected={false}
//                 onSelect={canAddMore ? onPlayerAdd : undefined}
//                 showAddButton={canAddMore}
//                 showRemoveButton={false}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Player, FantasyTeam } from "@/types/cricket";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, DollarSign, Users, RotateCcw, X, Plus, Shuffle } from "lucide-react";

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
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeTab, setActiveTab] = useState<'All'|'Batsman'|'Bowler'|'Wicket-Keeper'|'All-Rounder'>('All');

  const getPositionCount = (position: string) =>
    fantasyTeam.players.filter(p => p.position === position).length;

  const positionColors: Record<string,string> = {
    'Batsman': 'bg-blue-500',
    'Bowler': 'bg-red-500',
    'Wicket-Keeper': 'bg-green-500',
    'All-Rounder': 'bg-purple-500'
  };

  const getFieldPosition = (player: Player, index: number) => {
    // Predefined positions (relative bottom/left)
    const positions: Record<string, any[]> = {
      'Wicket-Keeper': [{ bottom: '12%', left: '50%', transform: 'translateX(-50%)' }],
      'Batsman': [
        { bottom: '30%', left: '15%' }, { bottom: '30%', left: '35%' },
        { bottom: '30%', right: '15%' }, { bottom: '30%', right: '35%' },
        { bottom: '45%', left: '50%', transform: 'translateX(-50%)' }
      ],
      'All-Rounder': [
        { bottom: '60%', left: '20%' }, { bottom: '60%', right: '20%' },
        { bottom: '70%', left: '50%', transform: 'translateX(-50%)' }
      ],
      'Bowler': [
        { bottom: '85%', left: '20%' }, { bottom: '85%', right: '20%' },
        { bottom: '90%', left: '50%', transform: 'translateX(-50%)' }
      ]
    };
    const playersByPosition = fantasyTeam.players.filter(p => p.position === player.position);
    const idx = playersByPosition.findIndex(p => p.id === player.id);
    return positions[player.position]?.[idx] ?? { bottom: '50%', left: '50%', transform: 'translateX(-50%)' };
  };

  const sortedPlayers = availablePlayers
    .filter(p => !fantasyTeam.players.some(fp => fp.id === p.id))
    .sort((a,b)=>b.points-a.points);

  const filteredPlayers = activeTab === 'All'
    ? sortedPlayers
    : sortedPlayers.filter(p => p.position === activeTab);

  const handlePlayerClick = (player: Player) => {
    if (selectedPlayer) {
      onPlayerSwap(selectedPlayer, player);
      setSelectedPlayer(null);
    } else if(canAddMore){
      onPlayerAdd(player);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-400 via-green-400 to-green-600">

      {/* Stats Header */}
      <div className="bg-white/90 backdrop-blur-sm p-4 shadow-lg sticky top-0 z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mx-auto mb-1">
              <Users className="w-5 h-5 text-white"/>
            </div>
            <p className="text-xl font-bold">{fantasyTeam.players.length}/{maxPlayers}</p>
            <p className="text-xs text-gray-600">Players</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full mx-auto mb-1">
              <Trophy className="w-5 h-5 text-white"/>
            </div>
            <p className="text-xl font-bold">{fantasyTeam.totalPoints}</p>
            <p className="text-xs text-gray-600">Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full mx-auto mb-1">
              <DollarSign className="w-5 h-5 text-white"/>
            </div>
            <p className="text-xl font-bold">${fantasyTeam.remainingBudget.toFixed(1)}M</p>
            <p className="text-xs text-gray-600">Budget</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full mx-auto mb-1">
              <RotateCcw className="w-5 h-5 text-white"/>
            </div>
            <p className="text-xl font-bold">3</p>
            <p className="text-xs text-gray-600">Transfers</p>
          </div>
        </div>

        {/* Position badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 max-w-4xl mx-auto">
          {['Batsman','Bowler','Wicket-Keeper','All-Rounder'].map(pos=>(
            <Badge key={pos} variant="outline" className={`justify-center p-2 ${positionColors[pos]} bg-opacity-20 text-black`}>
              {pos}: {getPositionCount(pos)}/{
                pos==='Batsman'||pos==='Bowler'?6:pos==='All-Rounder'?4:2
              }
            </Badge>
          ))}
        </div>
      </div>

      {/* Stadium */}
      <div className="relative w-full max-w-[500px] mx-auto aspect-[3/2] my-6">
        <div className="absolute inset-0 bg-green-600 rounded-lg opacity-40"></div>

        {/* Players */}
        {fantasyTeam.players.map(p=>{
          const pos = getFieldPosition(p,0);
          const isSelected = selectedPlayer?.id===p.id;
          return (
            <div key={p.id} className="absolute cursor-pointer" style={pos}
              onClick={()=>setSelectedPlayer(selectedPlayer?.id===p.id?null:p)}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg
                ${positionColors[p.position]} ${isSelected?'ring-4 ring-yellow-400':''}`}>
                {p.name.split(' ').map(n=>n[0]).join('')}
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  onClick={(e)=>{e.stopPropagation(); onPlayerRemove(p); setSelectedPlayer(null)}}>
                  <X className="w-3 h-3 text-white"/>
                </button>
              </div>
            </div>
          )
        })}

        {/* Swap hint */}
        {selectedPlayer && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded shadow-lg z-10">
            <Shuffle className="inline w-4 h-4 mr-1"/> Click player from pool to swap with {selectedPlayer.name}
          </div>
        )}
      </div>

      {/* Player Pool */}
      <div className="bg-white/95 backdrop-blur-sm border-t-4 border-green-600 flex-1 overflow-y-auto">
        {/* Tabs */}
        <div className="flex gap-2 p-4 sticky top-0 bg-white z-10 border-b">
          {['All','Batsman','Bowler','Wicket-Keeper','All-Rounder'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab===tab?'bg-green-600 text-white':'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              {tab} {tab!=='All' && `(${getPositionCount(tab)})`}
            </button>
          ))}
        </div>

        {/* Player Grid */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredPlayers.map(p=>(
            <Card key={p.id} className="p-2 cursor-pointer hover:scale-105 hover:shadow-lg transition"
              onClick={()=>handlePlayerClick(p)}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${positionColors[p.position]} text-white font-bold`}>
                  {p.name.split(' ').map(n=>n[0]).join('')}
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
          {filteredPlayers.length===0 && (
            <div className="text-center py-8 text-gray-500 col-span-full">No players available</div>
          )}
        </div>
      </div>
    </div>
  )
}
