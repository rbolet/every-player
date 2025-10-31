/**
 * Database schema definitions
 *
 * Schema files are organized as:
 * - divisions.ts: Divisions, leagues, seasons
 * - formations.ts: Formations, positions
 * - teams.ts: Teams
 * - players.ts: Players, team-player relationships
 * - games.ts: Games, periods, assignments, absences
 */

// Export all schemas
export * from "./divisions";
export * from "./formations";
export * from "./teams";
export * from "./players";
export * from "./games";
