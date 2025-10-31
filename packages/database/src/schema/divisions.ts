/**
 * League structure schemas: divisions, leagues, seasons
 */
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

/**
 * Divisions table - Division rulesets (e.g., U10, U12)
 */
export const divisions = sqliteTable(
  "divisions",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    playersCount: integer("players_count").notNull(),
    rosterMax: integer("roster_max").notNull(),
    noGk: integer("no_gk", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    playersNoGkIdx: index("idx_divisions_players_no_gk").on(table.playersCount, table.noGk),
  })
);

/**
 * Leagues table - Leagues within divisions
 */
export const leagues = sqliteTable(
  "leagues",
  {
    id: text("id").primaryKey(),
    divisionId: text("division_id")
      .notNull()
      .references(() => divisions.id),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    divisionIdx: index("idx_leagues_division").on(table.divisionId),
  })
);

/**
 * Seasons table - Seasons within leagues
 */
export const seasons = sqliteTable(
  "seasons",
  {
    id: text("id").primaryKey(),
    leagueId: text("league_id")
      .notNull()
      .references(() => leagues.id),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    leagueIdx: index("idx_seasons_league").on(table.leagueId),
  })
);
