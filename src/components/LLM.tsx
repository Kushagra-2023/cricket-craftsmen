// FantasyChatbot.tsx
import React, { useState, useRef, useEffect } from "react";
import { Player, FantasyTeam } from "@/types/cricket";

interface FantasyChatbotProps {
  fantasyTeam: FantasyTeam;
  availablePlayers: Player[];
}

export const FantasyChatbot: React.FC<FantasyChatbotProps> = ({
  fantasyTeam,
  availablePlayers,
}) => {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    await sleep(1500); // simulate response

    const responseText = "The optimizer chose Virat Kohli because he satisfies the mandatory wicket-keeper role (1–2 required), complementing player 53 to meet the upper limit. He costs 7 (modest compared to player 53 at 9), leaving more budget for high-scoring players. With a Weighted Score of 294.2, he is among the highest-scoring wicket-keepers and contributes significantly to the total objective. Under the “risky” setting, his variance of 151 is well below the squad average (~313), providing a strong score while controlling overall risk. Team-balance constraints (6 players from Team 1, 5 from Team 2) are satisfied, with player 7 filling one Team 2 slot efficiently. Overall, selecting him adds +1 wicket-keeper, +7 cost, +294.2 weighted score, and low variance. Omitting him would require a more expensive or lower-scoring wicket-keeper, reducing the final objective. In short, player 7 delivers the best “bang-for-buck,” balancing role, cost, score, and risk perfectly for the 90-unit budget under a “risky” strategy.";
    setMessages((prev) => [...prev, { role: "assistant", text: responseText }]);
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-[90%] mx-auto border rounded-xl shadow-lg bg-white p-4">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-3 space-y-3 px-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] p-3 rounded-xl shadow-sm break-words ${
              msg.role === "user"
                ? "bg-blue-100 text-black self-end ml-auto"
                : "bg-gray-100 text-black self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask assistant..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
