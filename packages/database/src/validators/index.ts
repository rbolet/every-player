/**
 * Zod validators generated from Drizzle schemas
 *
 * Uses drizzle-zod to automatically generate runtime validation schemas
 * from the Drizzle ORM type definitions.
 */
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import {
  divisions,
  leagues,
  seasons,
  formations,
  positions,
  formationPositions,
  teams,
  players,
  teamPlayers,
  games,
  gamePeriods,
  gamePlayerAbsences,
  gamePlayerAssignments,
} from "../schema";

// Division validators
export const insertDivisionSchema = createInsertSchema(divisions, {
  playersCount: z.number().positive(),
  rosterMax: z.number().positive(),
});
export const selectDivisionSchema = createSelectSchema(divisions);

// League validators
export const insertLeagueSchema = createInsertSchema(leagues);
export const selectLeagueSchema = createSelectSchema(leagues);

// Season validators
export const insertSeasonSchema = createInsertSchema(seasons);
export const selectSeasonSchema = createSelectSchema(seasons);

// Formation validators
export const insertFormationSchema = createInsertSchema(formations, {
  playersCount: z.number().positive(),
});
export const selectFormationSchema = createSelectSchema(formations);

// Position validators
export const insertPositionSchema = createInsertSchema(positions);
export const selectPositionSchema = createSelectSchema(positions);

// Formation position validators
export const insertFormationPositionSchema = createInsertSchema(formationPositions, {
  displayOrder: z.number().positive(),
});
export const selectFormationPositionSchema = createSelectSchema(formationPositions);

// Team validators
export const insertTeamSchema = createInsertSchema(teams);
export const selectTeamSchema = createSelectSchema(teams);

// Player validators
export const insertPlayerSchema = createInsertSchema(players);
export const selectPlayerSchema = createSelectSchema(players);

// Team player validators
export const insertTeamPlayerSchema = createInsertSchema(teamPlayers, {
  jerseyNumber: z.number().positive().nullable(),
});
export const selectTeamPlayerSchema = createSelectSchema(teamPlayers);

// Game validators
export const insertGameSchema = createInsertSchema(games);
export const selectGameSchema = createSelectSchema(games);

// Game period validators
export const insertGamePeriodSchema = createInsertSchema(gamePeriods, {
  periodNumber: z.number().positive(),
});
export const selectGamePeriodSchema = createSelectSchema(gamePeriods);

// Game player absence validators
export const insertGamePlayerAbsenceSchema = createInsertSchema(gamePlayerAbsences);
export const selectGamePlayerAbsenceSchema = createSelectSchema(gamePlayerAbsences);

// Game player assignment validators
export const insertGamePlayerAssignmentSchema = createInsertSchema(gamePlayerAssignments);
export const selectGamePlayerAssignmentSchema = createSelectSchema(gamePlayerAssignments);

// Export type inference helpers
export type InsertDivision = z.infer<typeof insertDivisionSchema>;
export type Division = z.infer<typeof selectDivisionSchema>;

export type InsertLeague = z.infer<typeof insertLeagueSchema>;
export type League = z.infer<typeof selectLeagueSchema>;

export type InsertSeason = z.infer<typeof insertSeasonSchema>;
export type Season = z.infer<typeof selectSeasonSchema>;

export type InsertFormation = z.infer<typeof insertFormationSchema>;
export type Formation = z.infer<typeof selectFormationSchema>;

export type InsertPosition = z.infer<typeof insertPositionSchema>;
export type Position = z.infer<typeof selectPositionSchema>;

export type InsertFormationPosition = z.infer<typeof insertFormationPositionSchema>;
export type FormationPosition = z.infer<typeof selectFormationPositionSchema>;

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = z.infer<typeof selectTeamSchema>;

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = z.infer<typeof selectPlayerSchema>;

export type InsertTeamPlayer = z.infer<typeof insertTeamPlayerSchema>;
export type TeamPlayer = z.infer<typeof selectTeamPlayerSchema>;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = z.infer<typeof selectGameSchema>;

export type InsertGamePeriod = z.infer<typeof insertGamePeriodSchema>;
export type GamePeriod = z.infer<typeof selectGamePeriodSchema>;

export type InsertGamePlayerAbsence = z.infer<typeof insertGamePlayerAbsenceSchema>;
export type GamePlayerAbsence = z.infer<typeof selectGamePlayerAbsenceSchema>;

export type InsertGamePlayerAssignment = z.infer<typeof insertGamePlayerAssignmentSchema>;
export type GamePlayerAssignment = z.infer<typeof selectGamePlayerAssignmentSchema>;
