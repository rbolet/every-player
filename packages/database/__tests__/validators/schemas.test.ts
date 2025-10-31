import {
  insertDivisionSchema,
  selectDivisionSchema,
  insertLeagueSchema,
  insertFormationSchema,
  insertPositionSchema,
  insertTeamSchema,
  insertPlayerSchema,
  insertTeamPlayerSchema,
  insertGameSchema,
  insertGamePeriodSchema,
  insertGamePlayerAssignmentSchema,
} from "../../src/validators";

describe("Division Validators", () => {
  describe("insertDivisionSchema", () => {
    it("should validate valid division data", () => {
      const validData = {
        id: "div_1",
        name: "U10",
        description: "Under 10 division",
        playersCount: 7,
        rosterMax: 10,
        noGk: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertDivisionSchema.parse(validData)).not.toThrow();
    });

    it("should reject negative playersCount", () => {
      const invalidData = {
        id: "div_1",
        name: "U10",
        playersCount: -1,
        rosterMax: 10,
        noGk: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertDivisionSchema.parse(invalidData)).toThrow();
    });

    it("should reject zero playersCount", () => {
      const invalidData = {
        id: "div_1",
        name: "U10",
        playersCount: 0,
        rosterMax: 10,
        noGk: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertDivisionSchema.parse(invalidData)).toThrow();
    });

    it("should allow null description", () => {
      const validData = {
        id: "div_1",
        name: "U10",
        description: null,
        playersCount: 7,
        rosterMax: 10,
        noGk: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertDivisionSchema.parse(validData)).not.toThrow();
    });
  });

  describe("selectDivisionSchema", () => {
    it("should validate complete division data", () => {
      const validData = {
        id: "div_1",
        name: "U10",
        description: "Under 10",
        playersCount: 7,
        rosterMax: 10,
        noGk: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => selectDivisionSchema.parse(validData)).not.toThrow();
    });
  });
});

describe("League Validators", () => {
  describe("insertLeagueSchema", () => {
    it("should validate valid league data", () => {
      const validData = {
        id: "league_1",
        divisionId: "div_1",
        name: "U10 Girls",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertLeagueSchema.parse(validData)).not.toThrow();
    });

    it("should require divisionId", () => {
      const invalidData = {
        id: "league_1",
        name: "U10 Girls",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertLeagueSchema.parse(invalidData)).toThrow();
    });
  });
});

describe("Formation Validators", () => {
  describe("insertFormationSchema", () => {
    it("should validate valid formation data", () => {
      const validData = {
        id: "form_1",
        name: "2-3-1",
        description: "2 Defenders, 3 Midfielders, 1 Forward",
        playersCount: 7,
        noGk: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertFormationSchema.parse(validData)).not.toThrow();
    });

    it("should reject negative playersCount", () => {
      const invalidData = {
        id: "form_1",
        name: "2-3-1",
        playersCount: -1,
        noGk: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertFormationSchema.parse(invalidData)).toThrow();
    });
  });
});

describe("Position Validators", () => {
  describe("insertPositionSchema", () => {
    it("should validate valid position data", () => {
      const validData = {
        id: "pos_1",
        name: "Goalkeeper",
        abbreviation: "GK",
        positionType: "GK" as const,
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertPositionSchema.parse(validData)).not.toThrow();
    });

    it("should validate all position types", () => {
      const types = ["GK", "DEF", "MID", "FWD"] as const;

      types.forEach((type) => {
        const validData = {
          id: `pos_${type}`,
          name: "Position",
          abbreviation: type,
          positionType: type,
          displayOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        expect(() => insertPositionSchema.parse(validData)).not.toThrow();
      });
    });
  });
});

describe("Team Validators", () => {
  describe("insertTeamSchema", () => {
    it("should validate valid team data", () => {
      const validData = {
        id: "team_1",
        seasonId: "season_1",
        name: "Teal Penguins",
        color: "cyan",
        defaultFormationId: "form_1",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertTeamSchema.parse(validData)).not.toThrow();
    });

    it("should allow null description", () => {
      const validData = {
        id: "team_1",
        seasonId: "season_1",
        name: "Teal Penguins",
        description: null,
        color: "cyan",
        defaultFormationId: "form_1",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertTeamSchema.parse(validData)).not.toThrow();
    });
  });
});

describe("Player Validators", () => {
  describe("insertPlayerSchema", () => {
    it("should validate valid player data", () => {
      const validData = {
        id: "player_1",
        name: "Emma Thompson",
        birthdate: new Date("2016-03-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertPlayerSchema.parse(validData)).not.toThrow();
    });

    it("should require all fields", () => {
      const invalidData = {
        id: "player_1",
        name: "Emma Thompson",
      };

      expect(() => insertPlayerSchema.parse(invalidData)).toThrow();
    });
  });

  describe("insertTeamPlayerSchema", () => {
    it("should validate team-player relationship with jersey number", () => {
      const validData = {
        teamId: "team_1",
        playerId: "player_1",
        jerseyNumber: 10,
        createdAt: new Date(),
      };

      expect(() => insertTeamPlayerSchema.parse(validData)).not.toThrow();
    });

    it("should allow null jersey number", () => {
      const validData = {
        teamId: "team_1",
        playerId: "player_1",
        jerseyNumber: null,
        createdAt: new Date(),
      };

      expect(() => insertTeamPlayerSchema.parse(validData)).not.toThrow();
    });

    it("should reject negative jersey number", () => {
      const invalidData = {
        teamId: "team_1",
        playerId: "player_1",
        jerseyNumber: -1,
        createdAt: new Date(),
      };

      expect(() => insertTeamPlayerSchema.parse(invalidData)).toThrow();
    });

    it("should reject zero jersey number", () => {
      const invalidData = {
        teamId: "team_1",
        playerId: "player_1",
        jerseyNumber: 0,
        createdAt: new Date(),
      };

      expect(() => insertTeamPlayerSchema.parse(invalidData)).toThrow();
    });
  });
});

describe("Game Validators", () => {
  describe("insertGameSchema", () => {
    it("should validate valid game data", () => {
      const validData = {
        id: "game_1",
        homeTeamId: "team_1",
        awayTeamId: "team_2",
        opponentName: null,
        dateTime: new Date("2025-11-15T10:00:00"),
        location: "Field 4",
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGameSchema.parse(validData)).not.toThrow();
    });

    it("should allow null awayTeamId with opponentName", () => {
      const validData = {
        id: "game_1",
        homeTeamId: "team_1",
        awayTeamId: null,
        opponentName: "Violet Vampires",
        dateTime: new Date(),
        location: "Field 4",
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGameSchema.parse(validData)).not.toThrow();
    });

    it("should validate all game statuses", () => {
      const statuses = ["PROJECTED", "ACTUAL"] as const;

      statuses.forEach((status) => {
        const validData = {
          id: "game_1",
          homeTeamId: "team_1",
          dateTime: new Date(),
          location: "Field 4",
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        expect(() => insertGameSchema.parse(validData)).not.toThrow();
      });
    });
  });

  describe("insertGamePeriodSchema", () => {
    it("should validate valid game period data", () => {
      const validData = {
        id: "period_1",
        gameId: "game_1",
        periodNumber: 1,
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGamePeriodSchema.parse(validData)).not.toThrow();
    });

    it("should reject negative period number", () => {
      const invalidData = {
        id: "period_1",
        gameId: "game_1",
        periodNumber: -1,
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGamePeriodSchema.parse(invalidData)).toThrow();
    });

    it("should reject zero period number", () => {
      const invalidData = {
        id: "period_1",
        gameId: "game_1",
        periodNumber: 0,
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGamePeriodSchema.parse(invalidData)).toThrow();
    });
  });

  describe("insertGamePlayerAssignmentSchema", () => {
    it("should validate assignment with player and position", () => {
      const validData = {
        id: "assign_1",
        gamePeriodId: "period_1",
        playerId: "player_1",
        positionId: "pos_1",
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGamePlayerAssignmentSchema.parse(validData)).not.toThrow();
    });

    it("should allow null playerId (empty slot)", () => {
      const validData = {
        id: "assign_1",
        gamePeriodId: "period_1",
        playerId: null,
        positionId: "pos_1",
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGamePlayerAssignmentSchema.parse(validData)).not.toThrow();
    });

    it("should allow null positionId (bench)", () => {
      const validData = {
        id: "assign_1",
        gamePeriodId: "period_1",
        playerId: "player_1",
        positionId: null,
        status: "PROJECTED" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(() => insertGamePlayerAssignmentSchema.parse(validData)).not.toThrow();
    });

    it("should validate all assignment statuses", () => {
      const statuses = ["PROJECTED", "ACTUAL", "ABSENT"] as const;

      statuses.forEach((status) => {
        const validData = {
          id: "assign_1",
          gamePeriodId: "period_1",
          playerId: "player_1",
          positionId: "pos_1",
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        expect(() => insertGamePlayerAssignmentSchema.parse(validData)).not.toThrow();
      });
    });
  });
});
