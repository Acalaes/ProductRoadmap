import { type Roadmap, type InsertRoadmap, type Initiative, type InsertInitiative } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Roadmaps
  getRoadmaps(): Promise<Roadmap[]>;
  getRoadmap(id: string): Promise<Roadmap | undefined>;
  createRoadmap(roadmap: InsertRoadmap): Promise<Roadmap>;
  updateRoadmap(id: string, roadmap: Partial<InsertRoadmap>): Promise<Roadmap | undefined>;
  deleteRoadmap(id: string): Promise<boolean>;
  
  // Initiatives
  getInitiativesByRoadmap(roadmapId: string): Promise<Initiative[]>;
  getInitiative(id: string): Promise<Initiative | undefined>;
  createInitiative(initiative: InsertInitiative): Promise<Initiative>;
  updateInitiative(id: string, initiative: Partial<InsertInitiative>): Promise<Initiative | undefined>;
  deleteInitiative(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private roadmaps: Map<string, Roadmap>;
  private initiatives: Map<string, Initiative>;

  constructor() {
    this.roadmaps = new Map();
    this.initiatives = new Map();
    
    // Create default roadmap
    const defaultRoadmap: Roadmap = {
      id: "default-roadmap",
      name: "Q1-Q4 2024 - Produto Principal",
      description: "Roadmap principal do produto para 2024",
      year: 2024,
      createdAt: new Date(),
    };
    this.roadmaps.set(defaultRoadmap.id, defaultRoadmap);
  }

  async getRoadmaps(): Promise<Roadmap[]> {
    return Array.from(this.roadmaps.values());
  }

  async getRoadmap(id: string): Promise<Roadmap | undefined> {
    return this.roadmaps.get(id);
  }

  async createRoadmap(insertRoadmap: InsertRoadmap): Promise<Roadmap> {
    const id = randomUUID();
    const roadmap: Roadmap = {
      ...insertRoadmap,
      id,
      createdAt: new Date(),
    };
    this.roadmaps.set(id, roadmap);
    return roadmap;
  }

  async updateRoadmap(id: string, updateData: Partial<InsertRoadmap>): Promise<Roadmap | undefined> {
    const roadmap = this.roadmaps.get(id);
    if (!roadmap) return undefined;
    
    const updated = { ...roadmap, ...updateData };
    this.roadmaps.set(id, updated);
    return updated;
  }

  async deleteRoadmap(id: string): Promise<boolean> {
    return this.roadmaps.delete(id);
  }

  async getInitiativesByRoadmap(roadmapId: string): Promise<Initiative[]> {
    return Array.from(this.initiatives.values()).filter(
      (initiative) => initiative.roadmapId === roadmapId,
    );
  }

  async getInitiative(id: string): Promise<Initiative | undefined> {
    return this.initiatives.get(id);
  }

  async createInitiative(insertInitiative: InsertInitiative): Promise<Initiative> {
    const id = randomUUID();
    const initiative: Initiative = {
      ...insertInitiative,
      id,
      createdAt: new Date(),
    };
    this.initiatives.set(id, initiative);
    return initiative;
  }

  async updateInitiative(id: string, updateData: Partial<InsertInitiative>): Promise<Initiative | undefined> {
    const initiative = this.initiatives.get(id);
    if (!initiative) return undefined;
    
    const updated = { ...initiative, ...updateData };
    this.initiatives.set(id, updated);
    return updated;
  }

  async deleteInitiative(id: string): Promise<boolean> {
    return this.initiatives.delete(id);
  }
}

export const storage = new MemStorage();
