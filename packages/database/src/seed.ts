/**
 * Phase 1 seed data
 *
 * Seeded data for initial app install:
 * - U10 Division (7v7, roster_max=10)
 * - U10 Girls League
 * - Fall 2025 Season
 * - 7 Positions (GK x1, DEF x2, MID x3, FWD x1)
 * - 2-3-1 Formation
 * - Teal Penguins Team
 * - 10 Players (ages 8-9 in November 2025)
 * - 1 Future Game vs Violet Vampires
 * - 4 Periods for the game
 * - Empty assignments (all NULL player_id and position_id)
 */

import { randomUUID } from "crypto";

// Generate stable IDs for seeded data
export const SEED_IDS = {
  division: "div_u10",
  league: "league_u10_girls",
  season: "season_fall_2025",
  positions: {
    gk: "pos_gk",
    def1: "pos_def_1",
    def2: "pos_def_2",
    mid1: "pos_mid_1",
    mid2: "pos_mid_2",
    mid3: "pos_mid_3",
    fwd: "pos_fwd",
  },
  formation: "formation_2_3_1",
  team: "team_teal_penguins",
  players: {
    emma: "player_emma",
    olivia: "player_olivia",
    ava: "player_ava",
    sophia: "player_sophia",
    isabella: "player_isabella",
    mia: "player_mia",
    charlotte: "player_charlotte",
    amelia: "player_amelia",
    harper: "player_harper",
    evelyn: "player_evelyn",
  },
  game: "game_future_1",
  periods: {
    period1: "period_1",
    period2: "period_2",
    period3: "period_3",
    period4: "period_4",
  },
};

const now = new Date();

/**
 * Division seed data
 */
export const divisionSeed = {
  id: SEED_IDS.division,
  name: "U10",
  description: "7v7 division for players under 10 years old",
  playersCount: 7,
  rosterMax: 10,
  noGk: false,
  createdAt: now,
  updatedAt: now,
};

/**
 * League seed data
 */
export const leagueSeed = {
  id: SEED_IDS.league,
  divisionId: SEED_IDS.division,
  name: "U10 Girls",
  description: null,
  createdAt: now,
  updatedAt: now,
};

/**
 * Season seed data
 */
export const seasonSeed = {
  id: SEED_IDS.season,
  leagueId: SEED_IDS.league,
  name: "Fall 2025",
  description: null,
  createdAt: now,
  updatedAt: now,
};

/**
 * Position seed data (7 positions for 7v7)
 */
export const positionSeeds = [
  {
    id: SEED_IDS.positions.gk,
    name: "Goalkeeper",
    abbreviation: "GK",
    positionType: "GK" as const,
    displayOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.positions.def1,
    name: "Defender",
    abbreviation: "D",
    positionType: "DEF" as const,
    displayOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.positions.def2,
    name: "Defender",
    abbreviation: "D2",
    positionType: "DEF" as const,
    displayOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.positions.mid1,
    name: "Midfielder",
    abbreviation: "M",
    positionType: "MID" as const,
    displayOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.positions.mid2,
    name: "Midfielder",
    abbreviation: "M2",
    positionType: "MID" as const,
    displayOrder: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.positions.mid3,
    name: "Midfielder",
    abbreviation: "M3",
    positionType: "MID" as const,
    displayOrder: 6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.positions.fwd,
    name: "Forward",
    abbreviation: "F",
    positionType: "FWD" as const,
    displayOrder: 7,
    createdAt: now,
    updatedAt: now,
  },
];

/**
 * Formation seed data (2-3-1)
 */
export const formationSeed = {
  id: SEED_IDS.formation,
  name: "2-3-1",
  description: "2 Defenders, 3 Midfielders, 1 Forward",
  playersCount: 7,
  noGk: false,
  createdAt: now,
  updatedAt: now,
};

/**
 * Formation positions seed data (links formation to positions)
 */
export const formationPositionSeeds = [
  {
    formationId: SEED_IDS.formation,
    positionId: SEED_IDS.positions.gk,
    displayOrder: 1,
    createdAt: now,
  },
  {
    formationId: SEED_IDS.formation,
    positionId: SEED_IDS.positions.def1,
    displayOrder: 2,
    createdAt: now,
  },
  {
    formationId: SEED_IDS.formation,
    positionId: SEED_IDS.positions.def2,
    displayOrder: 3,
    createdAt: now,
  },
  {
    formationId: SEED_IDS.formation,
    positionId: SEED_IDS.positions.mid1,
    displayOrder: 4,
    createdAt: now,
  },
  {
    formationId: SEED_IDS.formation,
    positionId: SEED_IDS.positions.mid2,
    displayOrder: 5,
    createdAt: now,
  },
  {
    formationId: SEED_IDS.formation,
    positionId: SEED_IDS.positions.mid3,
    displayOrder: 6,
    createdAt: now,
  },
  {
    formationId: SEED_IDS.formation,
    positionId: SEED_IDS.positions.fwd,
    displayOrder: 7,
    createdAt: now,
  },
];

/**
 * Team seed data (Teal Penguins)
 */
export const teamSeed = {
  id: SEED_IDS.team,
  seasonId: SEED_IDS.season,
  name: "Teal Penguins",
  description: null,
  color: "cyan",
  defaultFormationId: SEED_IDS.formation,
  createdAt: now,
  updatedAt: now,
};

/**
 * Player seed data (10 players, ages 8-9 in November 2025)
 */
export const playerSeeds = [
  {
    id: SEED_IDS.players.emma,
    name: "Emma Thompson",
    birthdate: new Date("2016-03-15"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.olivia,
    name: "Olivia Martinez",
    birthdate: new Date("2016-07-22"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.ava,
    name: "Ava Johnson",
    birthdate: new Date("2016-11-08"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.sophia,
    name: "Sophia Davis",
    birthdate: new Date("2017-01-30"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.isabella,
    name: "Isabella Garcia",
    birthdate: new Date("2017-05-12"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.mia,
    name: "Mia Rodriguez",
    birthdate: new Date("2016-09-25"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.charlotte,
    name: "Charlotte Wilson",
    birthdate: new Date("2016-12-03"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.amelia,
    name: "Amelia Brown",
    birthdate: new Date("2017-04-17"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.harper,
    name: "Harper Lee",
    birthdate: new Date("2016-08-09"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.players.evelyn,
    name: "Evelyn Taylor",
    birthdate: new Date("2017-02-28"),
    createdAt: now,
    updatedAt: now,
  },
];

/**
 * Team-player relationships (10 players on Teal Penguins with jersey numbers 2-11)
 */
export const teamPlayerSeeds = [
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.emma,
    jerseyNumber: 2,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.olivia,
    jerseyNumber: 3,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.ava,
    jerseyNumber: 4,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.sophia,
    jerseyNumber: 5,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.isabella,
    jerseyNumber: 6,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.mia,
    jerseyNumber: 7,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.charlotte,
    jerseyNumber: 8,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.amelia,
    jerseyNumber: 9,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.harper,
    jerseyNumber: 10,
    createdAt: now,
  },
  {
    teamId: SEED_IDS.team,
    playerId: SEED_IDS.players.evelyn,
    jerseyNumber: 11,
    createdAt: now,
  },
];

/**
 * Game seed data (1 future game on November 15, 2025 at 10:00 AM)
 */
export const gameSeed = {
  id: SEED_IDS.game,
  homeTeamId: SEED_IDS.team,
  awayTeamId: null,
  opponentName: "Violet Vampires",
  dateTime: new Date("2025-11-15T10:00:00"),
  location: "Field 4",
  status: "PROJECTED" as const,
  createdAt: now,
  updatedAt: now,
};

/**
 * Game period seeds (4 periods for the game)
 */
export const gamePeriodSeeds = [
  {
    id: SEED_IDS.periods.period1,
    gameId: SEED_IDS.game,
    periodNumber: 1,
    status: "PROJECTED" as const,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.periods.period2,
    gameId: SEED_IDS.game,
    periodNumber: 2,
    status: "PROJECTED" as const,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.periods.period3,
    gameId: SEED_IDS.game,
    periodNumber: 3,
    status: "PROJECTED" as const,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: SEED_IDS.periods.period4,
    gameId: SEED_IDS.game,
    periodNumber: 4,
    status: "PROJECTED" as const,
    createdAt: now,
    updatedAt: now,
  },
];

/**
 * Generate empty assignments for all periods
 * Each period gets 7 empty field positions + 3 empty bench slots = 10 total assignments
 */
export function generateEmptyAssignments() {
  const assignments: Array<{
    id: string;
    gamePeriodId: string;
    playerId: null;
    positionId: null;
    status: "PROJECTED";
    createdAt: Date;
    updatedAt: Date;
  }> = [];

  const periodIds = [
    SEED_IDS.periods.period1,
    SEED_IDS.periods.period2,
    SEED_IDS.periods.period3,
    SEED_IDS.periods.period4,
  ];

  // For each period, create 10 empty assignments (7 field + 3 bench)
  periodIds.forEach((periodId) => {
    for (let i = 0; i < 10; i++) {
      assignments.push({
        id: randomUUID(),
        gamePeriodId: periodId,
        playerId: null,
        positionId: null,
        status: "PROJECTED",
        createdAt: now,
        updatedAt: now,
      });
    }
  });

  return assignments;
}

/**
 * All seed data in insertion order (respects foreign key constraints)
 */
export const allSeeds = {
  divisions: [divisionSeed],
  leagues: [leagueSeed],
  seasons: [seasonSeed],
  positions: positionSeeds,
  formations: [formationSeed],
  formationPositions: formationPositionSeeds,
  teams: [teamSeed],
  players: playerSeeds,
  teamPlayers: teamPlayerSeeds,
  games: [gameSeed],
  gamePeriods: gamePeriodSeeds,
  gamePlayerAssignments: generateEmptyAssignments(),
};
