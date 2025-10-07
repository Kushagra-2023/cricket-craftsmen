// FantasyChatbot.tsx
import React, { useState } from "react";
import { Player, FantasyTeam } from "@/types/cricket";

interface FantasyChatbotProps {
  fantasyTeam: FantasyTeam;
  availablePlayers: Player[];
}

export const FantasyChatbot: React.FC<FantasyChatbotProps> = ({
  fantasyTeam,
  availablePlayers,
}) => {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    
    // Call backend LLM here with input and fantasyTeam / availablePlayers
    const responseText = "Assistant response here..."; // replace with fetch

    // Add assistant response
    setMessages((prev) => [...prev, { role: "assistant", text: responseText }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`my-1 p-2 rounded ${msg.role === "user" ? "bg-blue-200 text-black self-end" : "bg-gray-200 text-black self-start"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask assistant..."
        />
        <button
          className="bg-green-600 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
