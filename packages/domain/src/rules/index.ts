/**
 * Business rules
 * 
 * Centralized business constraints and validation logic.
 * Will be expanded based on data structure document.
 */

// Placeholder business rules example
export const RosterRules = {
  // Constants defining business constraints
  DEFAULT_PLAYERS_ON_FIELD: 7,
  DEFAULT_PERIODS_PER_GAME: 4,

  // Validation functions
  validateRosterSize(playerCount: number, maxRosterSize: number): boolean {
    return playerCount > 0 && playerCount <= maxRosterSize;
  },

  // Business calculations
  calculatePlayingTimePercentage(periodsPlayed: number, totalPeriods: number): number {
    if (totalPeriods === 0) return 0;
    return (periodsPlayed / totalPeriods) * 100;
  },
};
