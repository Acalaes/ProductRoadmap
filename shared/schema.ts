import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const roadmaps = pgTable("roadmaps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const initiatives = pgTable("initiatives", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roadmapId: varchar("roadmap_id").notNull().references(() => roadmaps.id),
  title: text("title").notNull(),
  description: text("description"),
  team: text("team").notNull(), // engineering, design, product, marketing, data
  priority: text("priority").notNull(), // alta, media, baixa
  quarter: text("quarter").notNull(), // Q1, Q2, Q3, Q4
  owner: text("owner").notNull(),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRoadmapSchema = createInsertSchema(roadmaps).omit({
  id: true,
  createdAt: true,
});

export const insertInitiativeSchema = createInsertSchema(initiatives).omit({
  id: true,
  createdAt: true,
});

export type InsertRoadmap = z.infer<typeof insertRoadmapSchema>;
export type Roadmap = typeof roadmaps.$inferSelect;
export type InsertInitiative = z.infer<typeof insertInitiativeSchema>;
export type Initiative = typeof initiatives.$inferSelect;

export const teams = [
  "engineering",
  "design", 
  "product",
  "marketing",
  "data"
] as const;

export const priorities = [
  "alta",
  "media", 
  "baixa"
] as const;

export const quarters = [
  "Q1",
  "Q2",
  "Q3", 
  "Q4"
] as const;

export type Team = typeof teams[number];
export type Priority = typeof priorities[number];
export type Quarter = typeof quarters[number];
