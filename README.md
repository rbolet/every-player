# EveryPlayer

Youth Soccer Roster Management App

## Project Overview

EveryPlayer is a mobile-first application designed to help youth soccer coaches manage team rosters, create balanced playing time assignments, and track player statistics. Built with React Native/Expo and following Domain-Driven Design principles.

## Architecture

This is a monorepo using:
- **pnpm** for package management
- **Turborepo** for build orchestration
- **React Native/Expo** for the mobile app
- **TypeScript** throughout for type safety

## Structure

```
every-player/
├── apps/
│   ├── mobile/          # Expo React Native app
│   └── api/             # Phase 2: Laravel API (placeholder)
├── packages/
│   ├── types/           # Shared TypeScript types
│   ├── database/        # Drizzle ORM schemas
│   ├── domain/          # Business logic (DDD)
│   └── config/          # Shared configs (ESLint, TypeScript, Prettier)
├── turbo.json           # Turborepo configuration
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── package.json         # Root package.json
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- iOS Simulator (for iOS development) or Android Emulator

### Installation

```bash
# Install dependencies
pnpm install

# Start the mobile app
cd apps/mobile
pnpm start
```

### Development

```bash
# Run all apps in dev mode
pnpm dev

# Lint all packages
pnpm lint

# Type check all packages
pnpm type-check

# Build all packages
pnpm build
```

## Phase 1: Local MVP

Phase 1 focuses on local-only roster management with:
- Team and player CRUD
- Game scheduling
- Position assignments by quarter
- Auto-assignment algorithms for balanced playing time
- Real-time balance indicators

See `~/repos/docs/PROJECT_PLAN.md` for full technical specifications.

## Documentation

- Project Plan: `~/repos/docs/PROJECT_PLAN.md`
- Data Structure: `~/repos/docs/DATA_STRUCTURE.md`
- Features Plan: `~/repos/docs/FEATURES_PLAN.md`

## Tech Stack

- **Mobile**: React Native, Expo, Expo Router
- **UI**: Tamagui (planned)
- **State**: Zustand (planned)
- **Database**: expo-sqlite with Drizzle ORM
- **Validation**: Zod
- **Testing**: Jest, React Native Testing Library, Detox (planned)

## License

Private - All Rights Reserved
