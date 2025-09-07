import { type Roadmap } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Share, Plus, Map } from "lucide-react";

interface RoadmapHeaderProps {
  roadmaps: Roadmap[];
  currentRoadmap?: Roadmap;
  onNewInitiative: () => void;
}

export default function RoadmapHeader({ roadmaps, currentRoadmap, onNewInitiative }: RoadmapHeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Map className="text-primary text-xl" />
              <h1 className="text-xl font-semibold text-foreground">Roadmap Planner</h1>
            </div>
            <div className="hidden md:flex items-center space-x-2 ml-8">
              <span className="text-sm text-muted-foreground">Roadmap:</span>
              <Select defaultValue={currentRoadmap?.id}>
                <SelectTrigger className="w-[280px]" data-testid="select-roadmap">
                  <SelectValue placeholder="Selecione um roadmap" />
                </SelectTrigger>
                <SelectContent>
                  {roadmaps.map((roadmap) => (
                    <SelectItem key={roadmap.id} value={roadmap.id}>
                      {roadmap.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="secondary" data-testid="button-share">
              <Share className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
            <Button onClick={onNewInitiative} data-testid="button-new-initiative">
              <Plus className="mr-2 h-4 w-4" />
              Nova Iniciativa
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
