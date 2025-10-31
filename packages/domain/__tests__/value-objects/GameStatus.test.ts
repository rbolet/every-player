import { GameStatus } from "../../src/value-objects";

describe("GameStatus Value Object", () => {
  describe("static instances", () => {
    it("should provide PROJECTED status", () => {
      expect(GameStatus.PROJECTED).toBeDefined();
      expect(GameStatus.PROJECTED.toString()).toBe("PROJECTED");
    });

    it("should provide ACTUAL status", () => {
      expect(GameStatus.ACTUAL).toBeDefined();
      expect(GameStatus.ACTUAL.toString()).toBe("ACTUAL");
    });

    it("should reuse same instances (singleton pattern)", () => {
      expect(GameStatus.PROJECTED).toBe(GameStatus.PROJECTED);
      expect(GameStatus.ACTUAL).toBe(GameStatus.ACTUAL);
    });
  });

  describe("fromString", () => {
    it("should create PROJECTED status from string", () => {
      const status = GameStatus.fromString("PROJECTED");
      expect(status.equals(GameStatus.PROJECTED)).toBe(true);
    });

    it("should create ACTUAL status from string", () => {
      const status = GameStatus.fromString("ACTUAL");
      expect(status.equals(GameStatus.ACTUAL)).toBe(true);
    });

    it("should throw error for invalid status string", () => {
      expect(() => GameStatus.fromString("INVALID")).toThrow("Invalid game status: INVALID");
    });

    it("should throw error for empty string", () => {
      expect(() => GameStatus.fromString("")).toThrow("Invalid game status: ");
    });

    it("should throw error for lowercase status", () => {
      expect(() => GameStatus.fromString("projected")).toThrow("Invalid game status: projected");
    });

    it("should be case-sensitive", () => {
      expect(() => GameStatus.fromString("Projected")).toThrow();
      expect(() => GameStatus.fromString("actual")).toThrow();
    });
  });

  describe("toString", () => {
    it("should return string representation of PROJECTED", () => {
      expect(GameStatus.PROJECTED.toString()).toBe("PROJECTED");
    });

    it("should return string representation of ACTUAL", () => {
      expect(GameStatus.ACTUAL.toString()).toBe("ACTUAL");
    });

    it("should return consistent string for instance created from string", () => {
      const status = GameStatus.fromString("PROJECTED");
      expect(status.toString()).toBe("PROJECTED");
    });
  });

  describe("equals", () => {
    it("should return true when comparing same static instances", () => {
      expect(GameStatus.PROJECTED.equals(GameStatus.PROJECTED)).toBe(true);
      expect(GameStatus.ACTUAL.equals(GameStatus.ACTUAL)).toBe(true);
    });

    it("should return false when comparing different statuses", () => {
      expect(GameStatus.PROJECTED.equals(GameStatus.ACTUAL)).toBe(false);
      expect(GameStatus.ACTUAL.equals(GameStatus.PROJECTED)).toBe(false);
    });

    it("should return true when comparing instances created from same string", () => {
      const status1 = GameStatus.fromString("PROJECTED");
      const status2 = GameStatus.fromString("PROJECTED");
      expect(status1.equals(status2)).toBe(true);
    });

    it("should work correctly with instances from fromString factory", () => {
      const fromString = GameStatus.fromString("ACTUAL");
      const staticInstance = GameStatus.ACTUAL;
      expect(fromString.equals(staticInstance)).toBe(true);
    });
  });

  describe("immutability", () => {
    it("should maintain same reference for static instances", () => {
      const ref1 = GameStatus.PROJECTED;
      const ref2 = GameStatus.PROJECTED;
      expect(ref1).toBe(ref2);
    });

    it("should maintain value integrity across operations", () => {
      const status = GameStatus.PROJECTED;
      expect(status.toString()).toBe("PROJECTED");
      // Value remains consistent even after multiple operations
      expect(status.toString()).toBe("PROJECTED");
      expect(status.equals(GameStatus.PROJECTED)).toBe(true);
    });
  });
});
