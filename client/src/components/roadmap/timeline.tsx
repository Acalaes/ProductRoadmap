import { type Initiative, type Quarter, quarters } from "@shared/schema";
import { useDrop } from "react-dnd";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import InitiativeCard from "./initiative-card";

interface RoadmapTimelineProps {
  initiatives: Initiative[];
  roadmapId: string;
  onInitiativeUpdate: () => void;
}

interface QuarterColumnProps {
  quarter: Quarter;
  initiatives: Initiative[];
  onDrop: (initiativeId: string, quarter: Quarter) => void;
}

const quarterLabels: Record<Quarter, { title: string; subtitle: string }> = {
  Q1: { title: "Q1 2024", subtitle: "Jan - Mar" },
  Q2: { title: "Q2 2024", subtitle: "Abr - Jun" },
  Q3: { title: "Q3 2024", subtitle: "Jul - Set" },
  Q4: { title: "Q4 2024", subtitle: "Out - Dez" },
};

function QuarterColumn({ quarter, initiatives, onDrop }: QuarterColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "initiative",
    drop: (item: { id: string }) => {
      onDrop(item.id, quarter);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`timeline-quarter bg-card border border-border rounded-lg min-h-[600px] ${
        isOver ? "bg-accent" : ""
      }`}
    >
      <div className="sticky top-0 bg-card border-b border-border p-4 z-10 rounded-t-lg">
        <h3 className="font-semibold text-lg text-foreground">
          {quarterLabels[quarter].title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {quarterLabels[quarter].subtitle}
        </p>
      </div>
      <div className="p-4 space-y-3" data-testid={`quarter-${quarter}`}>
        {initiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))}
      </div>
    </div>
  );
}

export default function RoadmapTimeline({ 
  initiatives, 
  roadmapId, 
  onInitiativeUpdate 
}: RoadmapTimelineProps) {
  const { toast } = useToast();

  const updateInitiativeMutation = useMutation({
    mutationFn: async ({ id, quarter }: { id: string; quarter: Quarter }) => {
      return apiRequest("PUT", `/api/initiatives/${id}`, { quarter });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/roadmaps", roadmapId, "initiatives"] });
      onInitiativeUpdate();
      toast({
        title: "Sucesso",
        description: "Iniciativa movida com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao mover iniciativa. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleDrop = (initiativeId: string, quarter: Quarter) => {
    const initiative = initiatives.find(i => i.id === initiativeId);
    if (initiative && initiative.quarter !== quarter) {
      updateInitiativeMutation.mutate({ id: initiativeId, quarter });
    }
  };

  const initiativesByQuarter = quarters.reduce((acc, quarter) => {
    acc[quarter] = initiatives.filter(i => i.quarter === quarter);
    return acc;
  }, {} as Record<Quarter, Initiative[]>);

  return (
    <main className="max-w-7xl mx-auto">
      <div className="timeline-container overflow-x-auto">
        <div className="min-w-[1200px] grid grid-cols-4 gap-1 p-4">
          {quarters.map((quarter) => (
            <QuarterColumn
              key={quarter}
              quarter={quarter}
              initiatives={initiativesByQuarter[quarter]}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
