import { CricketFormat } from "@/types/cricket";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Trophy } from "lucide-react";

interface FormatSelectorProps {
  selectedFormat?: CricketFormat;
  onFormatSelect: (format: CricketFormat) => void;
}

export const FormatSelector = ({ selectedFormat, onFormatSelect }: FormatSelectorProps) => {
  const formats = [
    {
      name: 'T20' as CricketFormat,
      title: 'Twenty20',
      description: 'Fast-paced 20 overs per side',
      duration: '3 hours',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-fantasy-blue',
      features: ['20 overs', 'Power plays', 'Strategic timeouts']
    },
    {
      name: 'ODI' as CricketFormat,
      title: 'One Day International',
      description: 'Classic 50 overs format',
      duration: '8 hours',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-cricket-green',
      features: ['50 overs', 'Fielding restrictions', 'Two new balls']
    },
    {
      name: 'Test' as CricketFormat,
      title: 'Test Match',
      description: 'Ultimate cricket test over 5 days',
      duration: '5 days',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-fantasy-gold',
      features: ['5 days', 'Two innings', 'Red ball cricket']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-cricket bg-clip-text text-transparent">
          Choose Cricket Format
        </h2>
        <p className="text-muted-foreground mt-2">
          Select your preferred cricket format to build your fantasy team
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {formats.map((format) => {
          const isSelected = selectedFormat === format.name;
          return (
            <Card
              key={format.name}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-player border-2 ${
                isSelected 
                  ? 'border-fantasy-gold bg-gradient-to-br from-fantasy-gold/10 to-fantasy-blue/10 shadow-selected' 
                  : 'border-transparent hover:border-cricket-green/30'
              }`}
              onClick={() => onFormatSelect(format.name)}
            >
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 ${format.color} rounded-full flex items-center justify-center text-white mx-auto`}>
                  {format.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">{format.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{format.description}</p>
                </div>
                
                <Badge variant="outline" className="bg-muted">
                  Duration: {format.duration}
                </Badge>
                
                <div className="space-y-2">
                  {format.features.map((feature, index) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      • {feature}
                    </div>
                  ))}
                </div>
                
                <Button
                  variant={isSelected ? "selected" : "cricket"}
                  className="w-full"
                >
                  {isSelected ? "Selected" : "Select Format"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};