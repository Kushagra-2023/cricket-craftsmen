"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/types/cricket";

interface PlayerCardProps {
  player: Player;
  onSelect?: (player: Player) => void;
  positionColor?: string;
}

export const PlayerCard = ({ player, onSelect, positionColor }: PlayerCardProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    pressTimer.current = setTimeout(() => {
      fetchImage();
    }, 600); // Long press threshold
  };

  const handleMouseUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleClick = () => {
    if (!showPreview && onSelect) onSelect(player);
  };

  const fetchImage = async () => {
  try {
    setLoading(true);
    setError(null);
    setShowPreview(true);

    const res = await fetch(
      `http://127.0.0.1:8000/players/summary/${encodeURIComponent(player.name)}`,
      {
        method: "POST", // use GET if backend is @app.get
      }
    );

    if (!res.ok) throw new Error("Failed to fetch image");

    // Convert raw response to blob
    const blob = await res.blob();
    const imageObjectUrl = URL.createObjectURL(blob);

    setImageUrl(imageObjectUrl);
  } catch (err: any) {
    setError(err.message || "Error fetching image");
  } finally {
    setLoading(false);
  }
};


  const handleClosePreview = () => {
    setShowPreview(false);
    setImageUrl(null);
  };

  return (
    <>
      <Card
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="group flex flex-col items-center justify-between gap-2 p-4 border border-gray-200 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.04] hover:shadow-lg bg-white/80 hover:bg-white"
      >
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${
            positionColor || "bg-gray-400"
          } group-hover:scale-105 transition`}
        >
          {player.name.split(" ").map((n) => n[0]).join("")}
        </div>

        <div className="text-center">
          <div className="text-sm font-semibold truncate">{player.name}</div>
          <div className="text-xs text-gray-500">{player.team}</div>
        </div>

        <div className="flex justify-between w-full text-xs text-gray-600 mt-1">
          <span>${player.price}M</span>
          <span>{player.points} pts</span>
        </div>

        <Badge variant="outline" className="text-xs w-full text-center mt-1">
          {player.position}
        </Badge>
      </Card>

      {/* Preview Overlay */}
      {showPreview && (
        <div
          onClick={handleClosePreview}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center relative">
            {loading && <p className="text-gray-600">Loading image...</p>}

            {!loading && error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {!loading && !error && imageUrl && (
              <img
                src={imageUrl}
                alt={`${player.name} image`}
                className="rounded-lg mb-4 mx-auto max-h-[250px] object-contain"
              />
            )}

            <h2 className="text-lg font-bold mb-2">{player.name}</h2>
            <button
              onClick={handleClosePreview}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
