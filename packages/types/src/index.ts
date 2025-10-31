/**
 * Shared TypeScript types for EveryPlayer
 * 
 * This package contains type definitions that are used across
 * the mobile app, API, and other packages.
 */

// Common types
export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Placeholder entity types - to be expanded based on data structure
export interface Team extends Entity {
  name: string;
  seasonId: string;
  color: string;
  defaultFormationId: string;
}

export interface Player extends Entity {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
}

export interface Game extends Entity {
  dateTime: Date;
  location: string | null;
  opponentName: string | null;
  homeTeamId: string | null;
  awayTeamId: string | null;
  status: 'PROJECTED' | 'ACTUAL';
}

// API types (Phase 2 placeholder)
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Common utility types
export type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E };
