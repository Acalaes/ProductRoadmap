import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRoadmapSchema, insertInitiativeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Roadmap routes
  app.get("/api/roadmaps", async (req, res) => {
    try {
      const roadmaps = await storage.getRoadmaps();
      res.json(roadmaps);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar roadmaps" });
    }
  });

  app.get("/api/roadmaps/:id", async (req, res) => {
    try {
      const roadmap = await storage.getRoadmap(req.params.id);
      if (!roadmap) {
        return res.status(404).json({ message: "Roadmap não encontrado" });
      }
      res.json(roadmap);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar roadmap" });
    }
  });

  app.post("/api/roadmaps", async (req, res) => {
    try {
      const validatedData = insertRoadmapSchema.parse(req.body);
      const roadmap = await storage.createRoadmap(validatedData);
      res.status(201).json(roadmap);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para criação do roadmap" });
    }
  });

  app.put("/api/roadmaps/:id", async (req, res) => {
    try {
      const validatedData = insertRoadmapSchema.partial().parse(req.body);
      const roadmap = await storage.updateRoadmap(req.params.id, validatedData);
      if (!roadmap) {
        return res.status(404).json({ message: "Roadmap não encontrado" });
      }
      res.json(roadmap);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para atualização do roadmap" });
    }
  });

  app.delete("/api/roadmaps/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteRoadmap(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Roadmap não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar roadmap" });
    }
  });

  // Initiative routes
  app.get("/api/roadmaps/:roadmapId/initiatives", async (req, res) => {
    try {
      const initiatives = await storage.getInitiativesByRoadmap(req.params.roadmapId);
      res.json(initiatives);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar iniciativas" });
    }
  });

  app.get("/api/initiatives/:id", async (req, res) => {
    try {
      const initiative = await storage.getInitiative(req.params.id);
      if (!initiative) {
        return res.status(404).json({ message: "Iniciativa não encontrada" });
      }
      res.json(initiative);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar iniciativa" });
    }
  });

  app.post("/api/initiatives", async (req, res) => {
    try {
      const validatedData = insertInitiativeSchema.parse(req.body);
      const initiative = await storage.createInitiative(validatedData);
      res.status(201).json(initiative);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para criação da iniciativa" });
    }
  });

  app.put("/api/initiatives/:id", async (req, res) => {
    try {
      const validatedData = insertInitiativeSchema.partial().parse(req.body);
      const initiative = await storage.updateInitiative(req.params.id, validatedData);
      if (!initiative) {
        return res.status(404).json({ message: "Iniciativa não encontrada" });
      }
      res.json(initiative);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para atualização da iniciativa" });
    }
  });

  app.delete("/api/initiatives/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteInitiative(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Iniciativa não encontrada" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar iniciativa" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
