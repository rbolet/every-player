# ROSTER MANAGER - DATA STRUCTURE DOCUMENT

**Purpose**: Machine-readable database schema specification for Drizzle ORM implementation
**Audience**: Development execution (primarily machine-readable)
**Scope**: Complete table definitions, relationships, constraints, enums
**Last Updated**: 2025-10-29

**IMPORTANT**: This document describes the intended schema. The Drizzle ORM schema definitions in `packages/database/src/schema/` are the **source of truth**. If this document drifts from the Drizzle implementation, the Drizzle code is authoritative.

---

## TABLE OF CONTENTS

1. [Schema Conventions](#schema-conventions)
2. [Enums](#enums)
3. [Auth & Users (Phase 2)](#auth--users-phase-2)
4. [League Structure](#league-structure)
5. [Formations & Positions](#formations--positions)
6. [Teams & Players](#teams--players)
7. [Games & Assignments](#games--assignments)
8. [Relationships Summary](#relationships-summary)
9. [Indexes](#indexes)
10. [Phase 1 Seeded Data](#phase-1-seeded-data)

---

## SCHEMA CONVENTIONS

### Primary Keys
- **Type**: UUID (text/string)
- **Generation**: Client-generated using UUID v4
- **Rationale**: Offline creation support, Phase 2 sync compatibility

### Timestamps
- **created_at**: timestamp, NOT NULL, all tables
- **updated_at**: timestamp, NOT NULL, all non-join tables
- **Join tables**: Only `created_at`, no `updated_at` (relationships are created or deleted, not updated)

### Soft Deletes
- **Status**: NOT IMPLEMENTED for Phase 1
- All deletes are hard deletes
- Can be added in future if needed

### Naming Conventions
- **Tables**: snake_case, plural (e.g., `teams`, `game_player_assignments`)
- **Join tables**: `table1_table2` or descriptive name (e.g., `user_teams`, `role_permissions`)
- **Foreign keys**: `{table}_id` (e.g., `team_id`, `league_id`)
- **Enums**: SCREAMING_SNAKE_CASE (e.g., `PROJECTED`, `ACTUAL`)

### NULL vs NOT NULL
- Foreign keys: Nullable when optional relationship
- Primary keys: Always NOT NULL
- Timestamps: Always NOT NULL (except deleted_at if implemented later)

---

## ENUMS

### GameStatus
```typescript
enum GameStatus {
  PROJECTED = 'PROJECTED',  // Future/planned game
  ACTUAL = 'ACTUAL'         // Completed/past game
}
```

### PeriodStatus
```typescript
enum PeriodStatus {
  PROJECTED = 'PROJECTED',  // Future/planned period
  ACTUAL = 'ACTUAL'         // Completed period (marked complete in real-time)
}
```

### AssignmentStatus
```typescript
enum AssignmentStatus {
  PROJECTED = 'PROJECTED',  // Planned assignment (future)
  ACTUAL = 'ACTUAL',        // Actual assignment (period completed)
  ABSENT = 'ABSENT'         // Player marked absent
}
```

### PositionType
```typescript
enum PositionType {
  GK = 'GK',     // Goalkeeper
  DEF = 'DEF',   // Defender
  MID = 'MID',   // Midfielder
  FWD = 'FWD'    // Forward
}
```

### PermissionFunction (Phase 2)
```typescript
enum PermissionFunction {
  ROSTER = 'ROSTER',
  GAME = 'GAME',
  STATS = 'STATS',
  TEAM = 'TEAM',
  LEAGUE = 'LEAGUE',
  USER = 'USER'
}
```

### PermissionLevel (Phase 2)
```typescript
enum PermissionLevel {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  CREATE = 'CREATE'
}
```

---

## AUTH & USERS (PHASE 2)

### users
**Purpose**: User accounts for authentication and authorization

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| email | string | UNIQUE, NOT NULL | Used for login |
| password_hash | string | NOT NULL | Hashed password |
| name | string | NOT NULL | User's full name |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Indexes**:
- `idx_users_email` on `email`

**Phase Notes**: Table structure defined now, but not used until Phase 2

---

### roles
**Purpose**: Fixed role definitions (LEAGUE_ADMIN, COACH, etc.)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| name | string | UNIQUE, NOT NULL | e.g., "LEAGUE_ADMIN", "COACH" |
| description | string | NULL | Human-readable description |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Phase Notes**: Seeded with fixed roles in Phase 2

---

### permissions
**Purpose**: Granular permissions (function + level combinations)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| function | PermissionFunction | NOT NULL | e.g., ROSTER, GAME |
| level | PermissionLevel | NOT NULL | e.g., EDIT, VIEW |
| description | string | NULL | e.g., "Edit roster assignments" |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Constraints**:
- UNIQUE(function, level)

**Indexes**:
- `idx_permissions_function_level` on `(function, level)`

**Phase Notes**: Seeded with permission matrix in Phase 2

---

### role_permissions
**Purpose**: Join table for roles to permissions (M:M)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| role_id | UUID | FK → roles.id, NOT NULL | |
| permission_id | UUID | FK → permissions.id, NOT NULL | |
| created_at | timestamp | NOT NULL | |

**Constraints**:
- PRIMARY KEY (role_id, permission_id)

**Indexes**:
- `idx_role_permissions_role` on `role_id`
- `idx_role_permissions_permission` on `permission_id`

---

### user_roles
**Purpose**: Join table for users to roles (M:M - users can have multiple roles)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| user_id | UUID | FK → users.id, NOT NULL | |
| role_id | UUID | FK → roles.id, NOT NULL | |
| created_at | timestamp | NOT NULL | |

**Constraints**:
- PRIMARY KEY (user_id, role_id)

**Indexes**:
- `idx_user_roles_user` on `user_id`
- `idx_user_roles_role` on `role_id`

---

### user_teams
**Purpose**: Join table for coaches to teams (M:M - multiple coaches per team)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| user_id | UUID | FK → users.id, NOT NULL | |
| team_id | UUID | FK → teams.id, NOT NULL | |
| created_at | timestamp | NOT NULL | |

**Constraints**:
- PRIMARY KEY (user_id, team_id)

**Indexes**:
- `idx_user_teams_user` on `user_id`
- `idx_user_teams_team` on `team_id`

**Phase Notes**: Phase 2+ for multi-coach support

---

### user_leagues
**Purpose**: Join table for league admins to leagues (M:M - multiple admins per league)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| user_id | UUID | FK → users.id, NOT NULL | |
| league_id | UUID | FK → leagues.id, NOT NULL | |
| created_at | timestamp | NOT NULL | |

**Constraints**:
- PRIMARY KEY (user_id, league_id)

**Indexes**:
- `idx_user_leagues_user` on `user_id`
- `idx_user_leagues_league` on `league_id`

**Phase Notes**: Phase 3+ for league management

---

## LEAGUE STRUCTURE

### divisions
**Purpose**: Division rulesets (e.g., U10, U12) defining field size, player counts, rules

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| name | string | NOT NULL | e.g., "U10", "U12" |
| description | string | NULL | Human-readable description |
| players_count | integer | NOT NULL | Number of players on field (e.g., 7 for 7v7) |
| roster_max | integer | NOT NULL | Maximum roster size (e.g., 10) |
| no_gk | boolean | NOT NULL | True if no goalkeeper position |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Constraints**:
- `players_count > 0`
- `roster_max >= players_count`

**Indexes**:
- `idx_divisions_players_no_gk` on `(players_count, no_gk)` (for formation filtering)

**Phase Notes**: Phase 1 seeded with U10 (7v7, roster_max=10, no_gk=false)

---

### leagues
**Purpose**: Leagues within divisions (e.g., "U10 Boys LA County")

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| division_id | UUID | FK → divisions.id, NOT NULL | M:1 relationship |
| name | string | NOT NULL | e.g., "U10 Boys LA County" |
| description | string | NULL | |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Indexes**:
- `idx_leagues_division` on `division_id`

**Phase Notes**: Phase 1 seeded with "U10 Girls" league

---

### seasons
**Purpose**: Seasons within leagues (e.g., "Fall 2025")

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| league_id | UUID | FK → leagues.id, NOT NULL | M:1 relationship |
| name | string | NOT NULL | e.g., "Fall 2025", "Spring 2026" |
| description | string | NULL | |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Indexes**:
- `idx_seasons_league` on `league_id`

**Phase Notes**: Phase 1 seeded with single season

---

## FORMATIONS & POSITIONS

### formations
**Purpose**: Formation definitions (e.g., "2-3-1") scoped by players_count and no_gk

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| name | string | NOT NULL | e.g., "2-3-1", "3-2-1" |
| description | string | NULL | Detailed description |
| players_count | integer | NOT NULL | Number of field players (matches division) |
| no_gk | boolean | NOT NULL | True if formation has no GK |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Constraints**:
- UNIQUE(name, players_count, no_gk)

**Indexes**:
- `idx_formations_players_no_gk` on `(players_count, no_gk)`

**Phase Notes**: Phase 1 seeded with "2-3-1" formation for 7v7

**Query Pattern**: To get formations for a division:
```sql
SELECT * FROM formations
WHERE players_count = division.players_count
AND no_gk = division.no_gk
```

---

### positions
**Purpose**: Position definitions (e.g., "Striker", "Center Mid")

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| name | string | NOT NULL | e.g., "Striker", "Center Midfielder" |
| abbreviation | string | NOT NULL | e.g., "ST", "CM" |
| position_type | PositionType | NOT NULL | GK, DEF, MID, FWD |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Constraints**:
- UNIQUE(abbreviation)

**Indexes**:
- `idx_positions_type` on `position_type`

**Phase Notes**: Phase 1 seeded with 7 positions: GK (x1), DEF (x2), MID (x3), FWD (x1)

---

### formation_positions
**Purpose**: Join table defining which positions belong to which formations (M:M)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| formation_id | UUID | FK → formations.id, NOT NULL | |
| position_id | UUID | FK → positions.id, NOT NULL | |
| display_order | integer | NOT NULL | For visual rendering (1, 2, 3...) |
| created_at | timestamp | NOT NULL | |

**Constraints**:
- PRIMARY KEY (formation_id, position_id)
- UNIQUE(formation_id, display_order)

**Indexes**:
- `idx_formation_positions_formation` on `formation_id`
- `idx_formation_positions_position` on `position_id`

**Phase Notes**: Phase 1 seeded with 2-3-1 positions (7 total: 1 GK, 2 DEF, 3 MID, 1 FWD)

---

## TEAMS & PLAYERS

### teams
**Purpose**: Team entities within seasons

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| season_id | UUID | FK → seasons.id, NOT NULL | M:1 relationship |
| name | string | NOT NULL | Team name |
| description | string | NULL | |
| color | string | NOT NULL | CSS color (hex, hsl, named) |
| default_formation_id | UUID | FK → formations.id, NOT NULL | Team's default formation |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Indexes**:
- `idx_teams_season` on `season_id`
- `idx_teams_formation` on `default_formation_id`

**Phase Notes**: Phase 1 seeded with "Teal Penguins" team

**Relationship**: Teams belong to one season. If team continues across seasons, copy/create new team entity for new season.

---

### players
**Purpose**: Player entities (not scoped to single team, can move across teams)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| first_name | string | NOT NULL | |
| last_name | string | NOT NULL | |
| date_of_birth | date | NULL | For age calculations |
| emergency_contact_name | string | NULL | |
| emergency_contact_phone | string | NULL | |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Indexes**:
- `idx_players_name` on `(last_name, first_name)`

**Phase Notes**: Phase 1 seeded with 10 players (randomized girl names, ages 8-9)

---

### team_players
**Purpose**: Join table for teams to players (M:M) with jersey number

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| team_id | UUID | FK → teams.id, NOT NULL | |
| player_id | UUID | FK → players.id, NOT NULL | |
| jersey_number | integer | NULL | Player's jersey number on this team |
| created_at | timestamp | NOT NULL | |

**Constraints**:
- PRIMARY KEY (team_id, player_id)
- UNIQUE(team_id, jersey_number) - unique per team

**Indexes**:
- `idx_team_players_team` on `team_id`
- `idx_team_players_player` on `player_id`

**Phase Notes**: Phase 1 seeded with 10 players on Teal Penguins roster (jersey numbers 2-11)

---

## GAMES & ASSIGNMENTS

### games
**Purpose**: Game/match entities

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| date_time | timestamp | NOT NULL | Game start date/time |
| location | string | NULL | Game location/field |
| opponent_name | string | NULL | For external opponent not in system |
| home_team_id | UUID | FK → teams.id, NULL | Home team (nullable) |
| away_team_id | UUID | FK → teams.id, NULL | Away team (nullable) |
| status | GameStatus | NOT NULL | PROJECTED or ACTUAL |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Constraints**:
- At least one of home_team_id or away_team_id must be NOT NULL (application logic)

**Indexes**:
- `idx_games_date_time` on `date_time`
- `idx_games_status` on `status`
- `idx_games_home_team` on `home_team_id`
- `idx_games_away_team` on `away_team_id`

**Phase Notes**:
- Phase 1: Teal Penguins as home_team_id, away_team_id NULL, opponent_name = "Violet Vampires"
- Future: Both team IDs set when league admin assigns teams, opponent_name may be redundant

**Home/Away Determination**: Check if team_id matches home_team_id (home) or away_team_id (away)

**Game Results**: Not implemented in Phase 1. Can add `game_results` table later with scores, win/loss/tie.

---

### game_periods
**Purpose**: Period entities within games (4 periods/quarters per game for Phase 1)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| game_id | UUID | FK → games.id, NOT NULL | M:1 relationship |
| period_number | integer | NOT NULL | 1, 2, 3, 4 for Phase 1 |
| status | PeriodStatus | NOT NULL | PROJECTED or ACTUAL |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Constraints**:
- UNIQUE(game_id, period_number)
- `period_number > 0`

**Indexes**:
- `idx_game_periods_game` on `game_id`
- `idx_game_periods_game_number` on `(game_id, period_number)`

**Phase Notes**:
- Phase 1: Always 4 periods (quarters), created when game is created
- Future (Phase 4): Variable periods (halves, thirds, quarters) determined by division rules, free substitutions

**Period Status**:
- PROJECTED: Future/planned, assignments can be edited
- ACTUAL: Marked complete (real-time), assignments locked

---

### game_player_absences
**Purpose**: Track player absences at game level (entire game)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| game_id | UUID | FK → games.id, NOT NULL | |
| player_id | UUID | FK → players.id, NOT NULL | |
| created_at | timestamp | NOT NULL | |

**Constraints**:
- PRIMARY KEY (game_id, player_id)

**Indexes**:
- `idx_game_absences_game` on `game_id`
- `idx_game_absences_player` on `player_id`

**Phase Notes**:
- When player marked absent for game, create record here
- Auto-remove player from all period assignments
- Exclude player from auto-assignment algorithms for this game

---

### game_player_assignments
**Purpose**: Player position assignments for periods (core assignment data)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, NOT NULL | |
| game_period_id | UUID | FK → game_periods.id, NOT NULL | Period reference |
| player_id | UUID | FK → players.id, NULL | Nullable if position empty |
| position_id | UUID | FK → positions.id, NULL | NULL = bench |
| status | AssignmentStatus | NOT NULL | PROJECTED, ACTUAL, ABSENT |
| created_at | timestamp | NOT NULL | |
| updated_at | timestamp | NOT NULL | |

**Constraints**:
- UNIQUE(game_period_id, player_id) WHERE player_id IS NOT NULL - one player per period
- UNIQUE(game_period_id, position_id) WHERE position_id IS NOT NULL - one position per period

**Indexes**:
- `idx_assignments_period` on `game_period_id`
- `idx_assignments_player` on `player_id`
- `idx_assignments_position` on `position_id`

**Phase Notes**:
- Phase 1: Assignments tied directly to period records (4 per game)
- `position_id` NULL = player on bench for that period
- `player_id` NULL = position not yet assigned (empty slot)
- **Locked assignments**: Handled in frontend application logic only, not stored in database
- `status`:
  - PROJECTED: Planned/future assignment
  - ACTUAL: Period marked complete, assignment happened
  - ABSENT: Player marked absent (redundant with game_player_absences but useful for queries)

**Future Fields** (not implemented Phase 1):
- `start_time` timestamp NULL (for free substitutions)
- `end_time` timestamp NULL (for free substitutions)

---

## RELATIONSHIPS SUMMARY

### M:1 (Many-to-One)
- leagues → divisions (many leagues per division)
- seasons → leagues (many seasons per league)
- teams → seasons (many teams per season)
- teams → formations (many teams using same default formation)
- games → teams (home_team_id, away_team_id FKs on games table)
- game_periods → games (many periods per game)
- game_player_assignments → game_periods (many assignments per period)
- game_player_assignments → players
- game_player_assignments → positions

### M:M (Many-to-Many via Join Tables)
- users ↔ roles (user_roles)
- roles ↔ permissions (role_permissions)
- users ↔ teams (user_teams)
- users ↔ leagues (user_leagues)
- teams ↔ players (team_players)
- formations ↔ positions (formation_positions)

---

## INDEXES

### Performance Indexes
Primary indexes listed in table definitions above. Additional composite indexes for common queries:

```sql
-- Assignments by period (most common query)
CREATE INDEX idx_assignments_period_player
ON game_player_assignments(game_period_id, player_id);

-- Players on team with jersey numbers
CREATE INDEX idx_team_players_team_jersey
ON team_players(team_id, jersey_number);

-- Games by team (home and away separately indexed in table definition)
-- idx_games_home_team and idx_games_away_team

-- Formations for division
CREATE INDEX idx_formations_division_attrs
ON formations(players_count, no_gk);
```

---

## PHASE 1 SEEDED DATA

### Data to Seed on App Install

**Division**:
- Name: "U10"
- players_count: 7
- roster_max: 10
- no_gk: false

**League**:
- Name: "U10 Girls"
- division_id: U10 division

**Season**:
- Name: "Fall 2025"
- league_id: U10 Girls league

**Positions** (7 total):
1. GK: name="Goalkeeper", abbreviation="GK", position_type=GK, display_order=1
2. DEF: name="Defender", abbreviation="D", position_type=DEF, display_order=2
3. DEF: name="Defender", abbreviation="D", position_type=DEF, display_order=3
4. MID: name="Midfielder", abbreviation="M", position_type=MID, display_order=4
5. MID: name="Midfielder", abbreviation="M", position_type=MID, display_order=5
6. MID: name="Midfielder", abbreviation="M", position_type=MID, display_order=6
7. FWD: name="Forward", abbreviation="F", position_type=FWD, display_order=7

**Note**: Defenders are not assigned left/right - distinguished only by ID and display_order

**Formation**:
- Name: "2-3-1"
- Description: "2 Defenders, 3 Midfielders, 1 Forward"
- players_count: 7
- no_gk: false
- Linked to 7 positions via formation_positions with display_order

**Team**:
- Name: "Teal Penguins"
- Color: "cyan" (CSS named color)
- season_id: Fall 2025 season
- default_formation_id: 2-3-1 formation

**Players** (10 players, ages 8-9 in November 2025):
1. Emma (DOB: 2017-03-15, jersey: 2)
2. Sophia (DOB: 2016-11-22, jersey: 3)
3. Olivia (DOB: 2017-01-08, jersey: 4)
4. Ava (DOB: 2016-09-30, jersey: 5)
5. Isabella (DOB: 2017-05-18, jersey: 6)
6. Mia (DOB: 2016-12-05, jersey: 7)
7. Charlotte (DOB: 2017-02-14, jersey: 8)
8. Amelia (DOB: 2016-10-11, jersey: 9)
9. Harper (DOB: 2017-04-27, jersey: 10)
10. Evelyn (DOB: 2016-08-19, jersey: 11)

All players linked to Teal Penguins via team_players with respective jersey numbers.

**Game** (1 future game):
- date_time: 2025-11-15 10:00:00
- location: "Field 4"
- opponent_name: "Violet Vampires"
- home_team_id: Teal Penguins team ID
- away_team_id: NULL
- status: PROJECTED

**Game Periods** (4 periods for the game):
- Period 1: game_id, period_number=1, status=PROJECTED
- Period 2: game_id, period_number=2, status=PROJECTED
- Period 3: game_id, period_number=3, status=PROJECTED
- Period 4: game_id, period_number=4, status=PROJECTED

**Assignments**:
- All assignments for Teal Penguins only
- All assignments have NULL player_id and NULL position_id (empty/unassigned)
- All assignments have status=PROJECTED
- No absent players

---

## DRIZZLE IMPLEMENTATION NOTES

### Schema File Organization
```
packages/database/src/schema/
├── index.ts                    # Re-exports
├── users.ts                    # users, roles, permissions, joins
├── divisions.ts                # divisions, leagues, seasons
├── formations.ts               # formations, positions, formation_positions
├── teams.ts                    # teams
├── players.ts                  # players, team_players
└── games.ts                    # games, game_periods, assignments, absences
```

### Example Drizzle Schema (games.ts)
```typescript
import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const games = sqliteTable('games', {
  id: text('id').primaryKey(),
  dateTime: integer('date_time', { mode: 'timestamp' }).notNull(),
  location: text('location'),
  opponentName: text('opponent_name'),
  homeTeamId: text('home_team_id').references(() => teams.id),
  awayTeamId: text('away_team_id').references(() => teams.id),
  status: text('status', { enum: ['PROJECTED', 'ACTUAL'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  dateTimeIdx: index('idx_games_date_time').on(table.dateTime),
  statusIdx: index('idx_games_status').on(table.status),
  homeTeamIdx: index('idx_games_home_team').on(table.homeTeamId),
  awayTeamIdx: index('idx_games_away_team').on(table.awayTeamId),
}));

export const gamePeriods = sqliteTable('game_periods', {
  id: text('id').primaryKey(),
  gameId: text('game_id').notNull().references(() => games.id),
  periodNumber: integer('period_number').notNull(),
  status: text('status', { enum: ['PROJECTED', 'ACTUAL'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  gameIdx: index('idx_game_periods_game').on(table.gameId),
  gameNumberIdx: index('idx_game_periods_game_number').on(table.gameId, table.periodNumber),
}));

export const gamePlayerAssignments = sqliteTable('game_player_assignments', {
  id: text('id').primaryKey(),
  gamePeriodId: text('game_period_id').notNull().references(() => gamePeriods.id),
  playerId: text('player_id').references(() => players.id),
  positionId: text('position_id').references(() => positions.id),
  status: text('status', { enum: ['PROJECTED', 'ACTUAL', 'ABSENT'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  periodIdx: index('idx_assignments_period').on(table.gamePeriodId),
  playerIdx: index('idx_assignments_player').on(table.playerId),
  positionIdx: index('idx_assignments_position').on(table.positionId),
}));

// ... game_player_absences
```

### Zod Schema Generation
```typescript
// packages/database/src/validators/games.ts
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { games, gamePeriods, gamePlayerAssignments } from '../schema/games';

export const insertGameSchema = createInsertSchema(games);
export const selectGameSchema = createSelectSchema(games);

export const insertGamePeriodSchema = createInsertSchema(gamePeriods);
export const selectGamePeriodSchema = createSelectSchema(gamePeriods);

export const insertAssignmentSchema = createInsertSchema(gamePlayerAssignments);
export const selectAssignmentSchema = createSelectSchema(gamePlayerAssignments);

// Custom refinements
export const createGameSchema = insertGameSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  dateTime: z.date().min(new Date(), 'Game must be in the future'),
});
```

### Type Exports
```typescript
// packages/types/src/entities.ts
import { games, gamePeriods, players, teams, gamePlayerAssignments } from '@every-player/database/schema';

export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;

export type GamePeriod = typeof gamePeriods.$inferSelect;
export type NewGamePeriod = typeof gamePeriods.$inferInsert;

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;

export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;

export type Assignment = typeof gamePlayerAssignments.$inferSelect;
export type NewAssignment = typeof gamePlayerAssignments.$inferInsert;

// ... more types
```

---

## VERSION HISTORY

- v1.0 (2025-10-29): Initial data structure document created
- v1.1 (2025-10-29): Major schema updates:
  - Changed users table: single `name` field (removed first_name/last_name)
  - Removed game_teams table: moved home_team_id and away_team_id to games table
  - Renamed quarters → game_periods, quarter_number → period_number
  - Changed game_player_assignments: replaced quarter_number with game_period_id FK, removed locked column
  - Updated Phase 1 seeded data: U10 Girls league, 10 players (roster_max=10), Teal Penguins team, specific player names/birthdates, 1 future game vs Violet Vampires
  - Updated all indexes and relationships accordingly

---

**END OF DATA STRUCTURE DOCUMENT**
