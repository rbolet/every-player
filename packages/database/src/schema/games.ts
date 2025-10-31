/**
 * Games, periods, assignments, and absences schemas
 */
import { sqliteTable, text, integer, index, unique } from "drizzle-orm/sqlite-core";
import { teams } from "./teams";
import { players } from "./players";
import { positions } from "./formations";

/**
 * Game status enum
 */
export const gameStatuses = ["PROJECTED", "ACTUAL"] as const;
export type GameStatus = (typeof gameStatuses)[number];

/**
 * Period status enum
 */
export const periodStatuses = ["PROJECTED", "ACTUAL"] as const;
export type PeriodStatus = (typeof periodStatuses)[number];

/**
 * Assignment status enum
 */
export const assignmentStatuses = ["PROJECTED", "ACTUAL", "ABSENT"] as const;
export type AssignmentStatus = (typeof assignmentStatuses)[number];

/**
 * Games table - Game entities
 */
export const games = sqliteTable(
  "games",
  {
    id: text("id").primaryKey(),
    homeTeamId: text("home_team_id")
      .notNull()
      .references(() => teams.id),
    awayTeamId: text("away_team_id").references(() => teams.id),
    opponentName: text("opponent_name"),
    dateTime: integer("date_time", { mode: "timestamp" }).notNull(),
    location: text("location").notNull(),
    status: text("status", { enum: gameStatuses }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    homeTeamIdx: index("idx_games_home_team").on(table.homeTeamId),
    awayTeamIdx: index("idx_games_away_team").on(table.awayTeamId),
  })
);

/**
 * Game periods table - Period entities within games
 */
export const gamePeriods = sqliteTable(
  "game_periods",
  {
    id: text("id").primaryKey(),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id),
    periodNumber: integer("period_number").notNull(),
    status: text("status", { enum: periodStatuses }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    gameIdx: index("idx_game_periods_game").on(table.gameId),
    gameNumberIdx: index("idx_game_periods_game_number").on(table.gameId, table.periodNumber),
    gameNumberUnique: unique("unique_game_periods_game_number").on(
      table.gameId,
      table.periodNumber
    ),
  })
);

/**
 * Game player absences table - Tracks absent players
 */
export const gamePlayerAbsences = sqliteTable(
  "game_player_absences",
  {
    id: text("id").primaryKey(),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id),
    playerId: text("player_id")
      .notNull()
      .references(() => players.id),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    gameIdx: index("idx_absences_game").on(table.gameId),
    playerIdx: index("idx_absences_player").on(table.playerId),
    gamePlayerUnique: unique("unique_game_player_absences_game_player").on(
      table.gameId,
      table.playerId
    ),
  })
);

/**
 * Game player assignments table - Player position assignments for periods
 */
export const gamePlayerAssignments = sqliteTable(
  "game_player_assignments",
  {
    id: text("id").primaryKey(),
    gamePeriodId: text("game_period_id")
      .notNull()
      .references(() => gamePeriods.id),
    playerId: text("player_id").references(() => players.id),
    positionId: text("position_id").references(() => positions.id),
    status: text("status", { enum: assignmentStatuses }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    periodIdx: index("idx_assignments_period").on(table.gamePeriodId),
    playerIdx: index("idx_assignments_player").on(table.playerId),
    positionIdx: index("idx_assignments_position").on(table.positionId),
    periodPlayerIdx: index("idx_assignments_period_player").on(table.gamePeriodId, table.playerId),
  })
);
