import { Button } from "@/components/ui/button";
import { Trophy, Target, Users } from "lucide-react";
import cricketHero from "@/assets/cricket-hero.jpg";

interface CricketHeroProps {
  onGetStarted: () => void;
}

export const CricketHero = ({ onGetStarted }: CricketHeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cricketHero})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Trophy className="w-8 h-8 text-fantasy-gold" />
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-fantasy-gold via-white to-fantasy-blue bg-clip-text text-transparent">
            Fantasy Cricket
          </h1>
          <Trophy className="w-8 h-8 text-fantasy-gold" />
        </div>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
          Build your dream cricket team, compete with friends, and prove your cricket knowledge. 
          Select players, manage your budget, and climb the leaderboard!
        </p>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Target className="w-8 h-8 text-fantasy-gold mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Strategic Selection</h3>
            <p className="text-white/80">Choose players based on form, stats, and upcoming matches</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Users className="w-8 h-8 text-fantasy-blue mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Team Building</h3>
            <p className="text-white/80">Create balanced teams with batsmen, bowlers, and all-rounders</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Trophy className="w-8 h-8 text-fantasy-gold mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Compete & Win</h3>
            <p className="text-white/80">Track player performance and climb the fantasy leagues</p>
          </div>
        </div>
        
        <Button 
          onClick={onGetStarted}
          variant="fantasy"
          size="lg"
          className="text-lg px-8 py-4 rounded-xl"
        >
          Start Building Your Team
        </Button>
      </div>
    </div>
  );
};