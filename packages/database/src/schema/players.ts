/**
 * Players and team-player relationship schemas
 */
import { sqliteTable, text, integer, index, unique, primaryKey } from "drizzle-orm/sqlite-core";
import { teams } from "./teams";

/**
 * Players table - Player entities
 */
export const players = sqliteTable("players", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  birthdate: integer("birthdate", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

/**
 * Team-players join table - Many-to-many relationship with jersey numbers
 */
export const teamPlayers = sqliteTable(
  "team_players",
  {
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id),
    playerId: text("player_id")
      .notNull()
      .references(() => players.id),
    jerseyNumber: integer("jersey_number"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.teamId, table.playerId] }),
    teamIdx: index("idx_team_players_team").on(table.teamId),
    playerIdx: index("idx_team_players_player").on(table.playerId),
    jerseyUnique: unique("unique_team_players_team_jersey").on(table.teamId, table.jerseyNumber),
  })
);
