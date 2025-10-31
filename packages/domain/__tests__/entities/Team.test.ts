import { Team } from "../../src/entities";

describe("Team Entity", () => {
  describe("constructor", () => {
    it("should create a team with valid properties", () => {
      const team = new Team("123", "Warriors", "season-1", "#FF0000", "formation-1");

      expect(team.id).toBe("123");
      expect(team.name).toBe("Warriors");
      expect(team.seasonId).toBe("season-1");
      expect(team.color).toBe("#FF0000");
      expect(team.defaultFormationId).toBe("formation-1");
    });
  });

  describe("updateName", () => {
    it("should update team name with valid input", () => {
      const team = new Team("1", "Original", "s1", "#000", "f1");

      team.updateName("New Name");

      expect(team.name).toBe("New Name");
    });

    it("should throw error when name is empty string", () => {
      const team = new Team("1", "Original", "s1", "#000", "f1");

      expect(() => team.updateName("")).toThrow("Team name cannot be empty");
    });

    it("should throw error when name is only whitespace", () => {
      const team = new Team("1", "Original", "s1", "#000", "f1");

      expect(() => team.updateName("   ")).toThrow("Team name cannot be empty");
    });

    it("should throw error when name is null", () => {
      const team = new Team("1", "Original", "s1", "#000", "f1");

      // @ts-expect-error Testing runtime validation
      expect(() => team.updateName(null)).toThrow("Team name cannot be empty");
    });

    it("should throw error when name is undefined", () => {
      const team = new Team("1", "Original", "s1", "#000", "f1");

      // @ts-expect-error Testing runtime validation
      expect(() => team.updateName(undefined)).toThrow("Team name cannot be empty");
    });

    it("should allow name with leading/trailing spaces", () => {
      const team = new Team("1", "Original", "s1", "#000", "f1");

      team.updateName("  Spaced Name  ");

      expect(team.name).toBe("  Spaced Name  ");
    });
  });
});
