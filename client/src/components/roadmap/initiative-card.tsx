import { type Initiative, type Team } from "@shared/schema";
import { useDrag } from "react-dnd";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface InitiativeCardProps {
  initiative: Initiative;
}

const teamLabels: Record<Team, string> = {
  engineering: "Engineering",
  design: "Design",
  product: "Product", 
  marketing: "Marketing",
  data: "Data",
};

const teamColors: Record<Team, string> = {
  engineering: "bg-green-600",
  design: "bg-orange-500", 
  product: "bg-purple-600",
  marketing: "bg-pink-600",
  data: "bg-blue-500",
};

const priorityColors = {
  alta: "bg-red-500",
  media: "bg-yellow-500",
  baixa: "bg-green-500",
};

const priorityLabels = {
  alta: "Alta",
  media: "Média", 
  baixa: "Baixa",
};

export default function InitiativeCard({ initiative }: InitiativeCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "initiative",
    item: { id: initiative.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`initiative-card bg-card border border-border rounded-lg p-4 shadow-sm cursor-grab transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-md ${
        isDragging ? "opacity-50" : ""
      }`}
      data-testid={`card-initiative-${initiative.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded ${teamColors[initiative.team as Team]}`} />
          <Badge variant="secondary" className="text-xs">
            {teamLabels[initiative.team as Team]}
          </Badge>
        </div>
        <Badge 
          className={`text-xs text-white ${priorityColors[initiative.priority as keyof typeof priorityColors]}`}
        >
          {priorityLabels[initiative.priority as keyof typeof priorityLabels]}
        </Badge>
      </div>
      
      <h4 className="font-medium text-sm mb-2" data-testid={`text-title-${initiative.id}`}>
        {initiative.title}
      </h4>
      
      {initiative.description && (
        <p className="text-xs text-muted-foreground mb-3" data-testid={`text-description-${initiative.id}`}>
          {initiative.description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span data-testid={`text-owner-${initiative.id}`}>{initiative.owner}</span>
        <span data-testid={`text-progress-${initiative.id}`}>{initiative.progress}%</span>
      </div>
      
      <Progress value={initiative.progress} className="h-1.5" />
    </div>
  );
}
