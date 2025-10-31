import { RosterRules } from "../../src/rules";

describe("RosterRules", () => {
  describe("constants", () => {
    it("should define default players on field", () => {
      expect(RosterRules.DEFAULT_PLAYERS_ON_FIELD).toBe(7);
    });

    it("should define default periods per game", () => {
      expect(RosterRules.DEFAULT_PERIODS_PER_GAME).toBe(4);
    });
  });

  describe("validateRosterSize", () => {
    it("should return true for valid roster size", () => {
      expect(RosterRules.validateRosterSize(10, 20)).toBe(true);
    });

    it("should return true when player count equals max roster size", () => {
      expect(RosterRules.validateRosterSize(20, 20)).toBe(true);
    });

    it("should return true for minimum valid roster (1 player)", () => {
      expect(RosterRules.validateRosterSize(1, 20)).toBe(true);
    });

    it("should return false when player count is zero", () => {
      expect(RosterRules.validateRosterSize(0, 20)).toBe(false);
    });

    it("should return false when player count is negative", () => {
      expect(RosterRules.validateRosterSize(-1, 20)).toBe(false);
    });

    it("should return false when player count exceeds max roster size", () => {
      expect(RosterRules.validateRosterSize(21, 20)).toBe(false);
    });

    it("should handle edge case of max roster size 1", () => {
      expect(RosterRules.validateRosterSize(1, 1)).toBe(true);
      expect(RosterRules.validateRosterSize(2, 1)).toBe(false);
    });
  });

  describe("calculatePlayingTimePercentage", () => {
    it("should calculate correct percentage for full participation", () => {
      expect(RosterRules.calculatePlayingTimePercentage(4, 4)).toBe(100);
    });

    it("should calculate correct percentage for half participation", () => {
      expect(RosterRules.calculatePlayingTimePercentage(2, 4)).toBe(50);
    });

    it("should calculate correct percentage for quarter participation", () => {
      expect(RosterRules.calculatePlayingTimePercentage(1, 4)).toBe(25);
    });

    it("should return 0 when player has not played", () => {
      expect(RosterRules.calculatePlayingTimePercentage(0, 4)).toBe(0);
    });

    it("should return 0 when total periods is zero", () => {
      expect(RosterRules.calculatePlayingTimePercentage(5, 0)).toBe(0);
    });

    it("should handle decimal percentages correctly", () => {
      expect(RosterRules.calculatePlayingTimePercentage(1, 3)).toBeCloseTo(33.33, 2);
    });

    it("should handle periods played greater than total (overtime scenario)", () => {
      // This might happen if overtime periods are added
      expect(RosterRules.calculatePlayingTimePercentage(5, 4)).toBe(125);
    });

    it("should work with default periods per game constant", () => {
      const result = RosterRules.calculatePlayingTimePercentage(
        2,
        RosterRules.DEFAULT_PERIODS_PER_GAME
      );
      expect(result).toBe(50);
    });
  });
});
