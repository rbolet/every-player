/**
 * Teams schema
 */
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { seasons } from "./divisions";
import { formations } from "./formations";

/**
 * Teams table - Team entities within seasons
 */
export const teams = sqliteTable(
  "teams",
  {
    id: text("id").primaryKey(),
    seasonId: text("season_id")
      .notNull()
      .references(() => seasons.id),
    name: text("name").notNull(),
    description: text("description"),
    color: text("color").notNull(),
    defaultFormationId: text("default_formation_id")
      .notNull()
      .references(() => formations.id),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    seasonIdx: index("idx_teams_season").on(table.seasonId),
    formationIdx: index("idx_teams_formation").on(table.defaultFormationId),
  })
);
