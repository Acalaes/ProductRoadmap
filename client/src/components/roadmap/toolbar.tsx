import { type Team, type Priority, teams, priorities } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface RoadmapToolbarProps {
  teamFilter: Team | "all";
  onTeamFilterChange: (team: Team | "all") => void;
  priorityFilter: Priority | "all";
  onPriorityFilterChange: (priority: Priority | "all") => void;
}

const teamLabels: Record<Team, string> = {
  engineering: "Engineering",
  design: "Design", 
  product: "Product",
  marketing: "Marketing",
  data: "Data",
};

const priorityLabels: Record<Priority, string> = {
  alta: "Alta",
  media: "Média", 
  baixa: "Baixa",
};

const teamColors: Record<Team, string> = {
  engineering: "bg-green-600",
  design: "bg-orange-500",
  product: "bg-purple-600", 
  marketing: "bg-pink-600",
  data: "bg-blue-500",
};

export default function RoadmapToolbar({ 
  teamFilter, 
  onTeamFilterChange, 
  priorityFilter, 
  onPriorityFilterChange 
}: RoadmapToolbarProps) {
  return (
    <div className="bg-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Filtros:</span>
              <Select value={teamFilter} onValueChange={onTeamFilterChange}>
                <SelectTrigger className="w-[160px]" data-testid="select-team-filter">
                  <SelectValue placeholder="Todas as Equipes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Equipes</SelectItem>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {teamLabels[team]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                <SelectTrigger className="w-[170px]" data-testid="select-priority-filter">
                  <SelectValue placeholder="Todas as Prioridades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Prioridades</SelectItem>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priorityLabels[priority]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm">
              {teams.map((team) => (
                <div key={team} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded ${teamColors[team]}`} />
                  <span className="text-muted-foreground">{teamLabels[team]}</span>
                </div>
              ))}
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-settings">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
