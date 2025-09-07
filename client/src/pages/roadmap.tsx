import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Roadmap, type Initiative, type Team, type Priority } from "@shared/schema";
import RoadmapHeader from "@/components/roadmap/header";
import RoadmapToolbar from "@/components/roadmap/toolbar";
import RoadmapTimeline from "@/components/roadmap/timeline";
import NewInitiativeModal from "@/components/roadmap/new-initiative-modal";

export default function RoadmapPage() {
  const params = useParams();
  const roadmapId = params.id || "default-roadmap";
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamFilter, setTeamFilter] = useState<Team | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  const { data: roadmaps } = useQuery<Roadmap[]>({
    queryKey: ["/api/roadmaps"],
  });

  const { data: roadmap } = useQuery<Roadmap>({
    queryKey: ["/api/roadmaps", roadmapId],
    enabled: !!roadmapId,
  });

  const { data: initiatives = [], refetch: refetchInitiatives } = useQuery<Initiative[]>({
    queryKey: ["/api/roadmaps", roadmapId, "initiatives"],
    enabled: !!roadmapId,
  });

  const filteredInitiatives = initiatives.filter((initiative) => {
    if (teamFilter !== "all" && initiative.team !== teamFilter) return false;
    if (priorityFilter !== "all" && initiative.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RoadmapHeader
        roadmaps={roadmaps || []}
        currentRoadmap={roadmap}
        onNewInitiative={() => setIsModalOpen(true)}
      />
      
      <RoadmapToolbar
        teamFilter={teamFilter}
        onTeamFilterChange={setTeamFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
      />
      
      <RoadmapTimeline
        initiatives={filteredInitiatives}
        roadmapId={roadmapId}
        onInitiativeUpdate={refetchInitiatives}
      />
      
      <NewInitiativeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roadmapId={roadmapId}
        onSuccess={() => {
          setIsModalOpen(false);
          refetchInitiatives();
        }}
      />
    </div>
  );
}
