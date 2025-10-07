"use client";

import { useEffect, useState } from "react";

interface PlayerStatsData {
  name: string;
  [key: string]: string | number;
}

interface StatsResponse {
  type: "single" | "comparative";
  players: PlayerStatsData[];
}

interface PlayerStatsProps {
  playerNames: string[]; // variable length
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ playerNames }) => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerNames || playerNames.length === 0) return;

    setLoading(true);
    fetch("/api/player-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ players: playerNames }),
    })
      .then((res) => res.json())
      .then((data: StatsResponse) => setStats(data))
      .catch((err: any) => setError(err.message || "Failed to fetch"))
      .finally(() => setLoading(false));
  }, [playerNames]);

  if (!playerNames || playerNames.length === 0)
    return <div className="p-4">No players selected</div>;
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {stats.type === "single" ? "Player Stats" : "Comparative Stats"}
      </h2>

      <div
        className={`grid ${
          stats.type === "single" ? "grid-cols-1" : "grid-cols-2"
        } gap-6`}
      >
        {stats.players.map((player, idx) => (
          <div key={idx} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{player.name}</h3>
            {Object.entries(player).map(([key, value]) =>
              key !== "name" ? (
                <p key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                </p>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
