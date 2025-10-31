/**
 * Value objects
 * 
 * Immutable domain concepts with validation.
 * Will be expanded based on data structure document.
 */

// Placeholder value object example
export class GameStatus {
  private constructor(private readonly value: string) {}

  static readonly PROJECTED = new GameStatus('PROJECTED');
  static readonly ACTUAL = new GameStatus('ACTUAL');

  static fromString(value: string): GameStatus {
    switch (value) {
      case 'PROJECTED':
        return GameStatus.PROJECTED;
      case 'ACTUAL':
        return GameStatus.ACTUAL;
      default:
        throw new Error(`Invalid game status: ${value}`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: GameStatus): boolean {
    return this.value === other.value;
  }
}
