/**
 * Formation and position schemas
 */
import { sqliteTable, text, integer, index, unique } from "drizzle-orm/sqlite-core";

/**
 * Position types enum
 */
export const positionTypes = ["GK", "DEF", "MID", "FWD"] as const;
export type PositionType = (typeof positionTypes)[number];

/**
 * Formations table - Formation definitions (e.g., "2-3-1")
 */
export const formations = sqliteTable(
  "formations",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    playersCount: integer("players_count").notNull(),
    noGk: integer("no_gk", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    playersNoGkIdx: index("idx_formations_players_no_gk").on(table.playersCount, table.noGk),
    namePlayersNoGkUnique: unique("unique_formations_name_players_no_gk").on(
      table.name,
      table.playersCount,
      table.noGk
    ),
  })
);

/**
 * Positions table - Position definitions (e.g., "Striker", "Center Mid")
 */
export const positions = sqliteTable(
  "positions",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    abbreviation: text("abbreviation").notNull().unique(),
    positionType: text("position_type", { enum: positionTypes }).notNull(),
    displayOrder: integer("display_order").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    typeIdx: index("idx_positions_type").on(table.positionType),
  })
);

/**
 * Formation positions join table - Defines which positions belong to which formations
 */
export const formationPositions = sqliteTable(
  "formation_positions",
  {
    formationId: text("formation_id")
      .notNull()
      .references(() => formations.id),
    positionId: text("position_id")
      .notNull()
      .references(() => positions.id),
    displayOrder: integer("display_order").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    formationIdx: index("idx_formation_positions_formation").on(table.formationId),
    positionIdx: index("idx_formation_positions_position").on(table.positionId),
    displayOrderUnique: unique("unique_formation_positions_formation_display").on(
      table.formationId,
      table.displayOrder
    ),
  })
);
