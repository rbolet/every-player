/**
 * Domain entities
 * 
 * Entities encapsulate business logic and rules.
 * Will be expanded based on data structure document.
 */

// Placeholder entity example
export class Team {
  constructor(
    public readonly id: string,
    public name: string,
    public seasonId: string,
    public color: string,
    public defaultFormationId: string,
  ) {}

  // Business methods will be added here
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Team name cannot be empty');
    }
    this.name = newName;
  }
}
