# ROSTER MANAGER - PROJECT PLANNING DOCUMENT

**Purpose**: Technical implementation specification for Phase 1 development with Phase 2 groundwork
**Audience**: Development execution (machine/developer-first, human-readable secondary)
**Last Updated**: 2025-10-29

---

## 1. PROJECT OVERVIEW

### 1.1 Project Description

Youth soccer team roster management system with mobile/web client and future API sync capabilities.

### 1.2 Architecture Philosophy

- **DDD + TDD Hybrid**: Domain-Driven Design principles with Test-Driven Development for features
- **Type-Safe Throughout**: TypeScript strict mode, Zod runtime validation, Drizzle type-safe queries
- **Phase 2 Ready**: All Phase 1 decisions optimize for smooth Phase 2 (REST API) integration
- **Offline-First**: Local data storage in Phase 1, sync architecture patterns embedded for Phase 2

### 1.3 Portfolio Considerations

Technology choices prioritize:

1. Production-readiness and fit for requirements
2. Established/supported/documented tools
3. Trending upward in industry adoption

---

## 2. TECHNOLOGY STACK

### 2.1 Core Framework

| Layer           | Technology          | Version    | Rationale                                                       |
| --------------- | ------------------- | ---------- | --------------------------------------------------------------- |
| Runtime         | React Native + Expo | Latest SDK | Cross-platform (iOS/Android/Web), industry standard             |
| Language        | TypeScript          | 5.x        | Type safety, developer experience                               |
| Package Manager | pnpm                | 8.x+       | Performance, efficient disk usage, strict dependency management |
| Monorepo        | Turborepo           | 1.x        | Build caching, task orchestration, minimal config               |

### 2.2 Frontend Stack

| Component        | Technology            | Rationale                                                               |
| ---------------- | --------------------- | ----------------------------------------------------------------------- |
| UI Library       | Tamagui               | Universal (mobile + web), performance-optimized, trending up, modern DX |
| Navigation       | Expo Router           | File-based, universal routing, Expo recommended                         |
| State Management | Zustand               | Minimal, performant, trending up                                        |
| Forms            | react-hook-form + Zod | Type-safe validation, performance                                       |

### 2.3 Data Layer

| Component     | Technology  | Rationale                                          |
| ------------- | ----------- | -------------------------------------------------- |
| Database      | expo-sqlite | Native SQLite, relational, mirrors Phase 2         |
| ORM           | Drizzle ORM | Type-safe, TypeScript-first, excellent DX          |
| Validation    | Zod         | Runtime type validation, API boundary protection   |
| Schema Bridge | drizzle-zod | Auto-generate Zod schemas from Drizzle definitions |

### 2.4 Testing & Quality

| Type              | Technology                          | Coverage Target               |
| ----------------- | ----------------------------------- | ----------------------------- |
| Unit Tests        | Jest                                | Critical/complex units only   |
| Integration Tests | Jest + React Native Testing Library | All features                  |
| E2E Tests         | Detox                               | Critical user flows           |
| Component Dev     | Storybook (React Native)            | All presentational components |
| Linting           | ESLint + TypeScript ESLint          | 100%                          |
| Formatting        | Prettier                            | 100%                          |
| Git Hooks         | Husky + lint-staged                 | Pre-commit enforcement        |

### 2.5 Build & Deployment

| Component          | Technology                      | Notes                                            |
| ------------------ | ------------------------------- | ------------------------------------------------ |
| Build Service      | EAS (Expo Application Services) | Cloud builds, OTA updates, professional workflow |
| CI/CD              | EAS Build + GitHub Actions      | Automated testing and builds                     |
| Environment Config | expo-constants + dotenv         | Type-safe environment variables                  |

---

## 3. MONOREPO STRUCTURE

```
roster-manager/
├── apps/
│   ├── mobile/                          # Expo application (iOS/Android/Web)
│   │   ├── app/                         # Expo Router pages (file-based routing)
│   │   │   ├── (tabs)/                  # Tab navigation group
│   │   │   │   ├── index.tsx            # Home/Dashboard
│   │   │   │   ├── [feature].tsx        # Feature pages (per data structure doc)
│   │   │   │   └── _layout.tsx
│   │   │   ├── _layout.tsx              # Root layout
│   │   │   └── +not-found.tsx
│   │   ├── src/
│   │   │   ├── components/              # Presentational components
│   │   │   ├── features/                # Feature modules (per data structure doc)
│   │   │   │   └── [feature]/       # One directory per feature
│   │   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── db/                      # Database initialization & access
│   │   │   ├── stores/                  # Zustand stores
│   │   │   ├── utils/
│   │   │   └── constants/
│   │   ├── assets/
│   │   ├── .storybook/                  # Storybook configuration
│   │   ├── app.json                     # Expo configuration
│   │   ├── eas.json                     # EAS Build configuration
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                             # [PHASE 2 PLACEHOLDER]
│       ├── README.md                    # "Phase 2: Laravel REST API"
│       └── .gitkeep
│
├── packages/
│   ├── types/                           # Shared TypeScript interfaces
│   │   ├── src/
│   │   │   ├── index.ts                 # Re-exports
│   │   │   ├── entities.ts              # Entity type definitions (per data structure doc)
│   │   │   ├── api.ts                   # [Phase 2] API request/response types
│   │   │   └── common.ts                # Utility types
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── database/                        # Database schemas & migrations
│   │   ├── src/
│   │   │   ├── schema/                  # Drizzle schema definitions (per data structure doc)
│   │   │   │   ├── [entity].ts          # One file per entity
│   │   │   │   └── index.ts
│   │   │   ├── migrations/              # SQL migration files
│   │   │   ├── validators/              # Zod schemas (generated from Drizzle)
│   │   │   └── index.ts
│   │   ├── drizzle.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── domain/                          # Domain logic (DDD lightweight)
│   │   ├── src/
│   │   │   ├── entities/                # Business entities (per data structure doc)
│   │   │   │   └── [Entity].ts          # One file per entity
│   │   │   ├── value-objects/           # Immutable domain concepts (per data structure doc)
│   │   │   │   └── [ValueObject].ts     # Domain-specific value objects
│   │   │   ├── rules/                   # Business rules & validators (per data structure doc)
│   │   │   │   └── [rule-set].ts        # Grouped business rules
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                          # Shared configurations
│       ├── eslint-config/
│       │   ├── index.js
│       │   └── package.json
│       ├── typescript-config/
│       │   ├── base.json
│       │   ├── expo.json
│       │   └── package.json
│       └── prettier-config/
│           ├── index.js
│           └── package.json
│
├── .github/
│   └── workflows/
│       ├── test.yml                     # Run tests on PR
│       └── eas-build.yml                # EAS build triggers
│
├── .husky/                              # Git hooks
│   ├── pre-commit
│   └── pre-push
│
├── turbo.json                           # Turborepo pipeline config
├── pnpm-workspace.yaml                  # pnpm workspace config
├── package.json                         # Root package.json
├── .eslintrc.js
├── .prettierrc.js
├── tsconfig.json                        # Root TypeScript config
├── .gitignore
└── README.md
```

---

## 4. PHASE 1 DEVELOPMENT SETUP

### 4.1 Initial Setup Commands

```bash
# Initialize monorepo
pnpm init

# Create workspace structure
mkdir -p apps/mobile apps/api
mkdir -p packages/types packages/database packages/domain packages/config

# Initialize Expo app
cd apps/mobile
npx create-expo-app@latest . --template blank-typescript

# Install Turborepo
pnpm add -Dw turbo

# Install workspace dependencies
pnpm install
```

### 4.2 Package Installation Matrix

#### Root (workspace-level)

```json
{
  "devDependencies": {
    "turbo": "^1.x",
    "prettier": "^3.x",
    "husky": "^8.x",
    "lint-staged": "^15.x"
  }
}
```

#### apps/mobile

```json
{
  "dependencies": {
    "expo": "~50.x",
    "expo-router": "~3.x",
    "expo-sqlite": "~13.x",
    "tamagui": "^1.x",
    "@tamagui/config": "^1.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-screens": "~3.x",
    "react-native-svg": "^14.x",
    "zustand": "^4.x",
    "react-hook-form": "^7.x",
    "drizzle-orm": "^0.29.x",
    "zod": "^3.x",
    "@every-player/types": "workspace:*",
    "@every-player/database": "workspace:*",
    "@every-player/domain": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "~18.x",
    "typescript": "^5.x",
    "jest": "^29.x",
    "@testing-library/react-native": "^12.x",
    "detox": "^20.x",
    "@storybook/react-native": "^7.x",
    "@tamagui/babel-plugin": "^1.x"
  }
}
```

#### packages/database

```json
{
  "dependencies": {
    "drizzle-orm": "^0.29.x",
    "drizzle-zod": "^0.5.x",
    "zod": "^3.x",
    "@every-player/types": "workspace:*"
  },
  "devDependencies": {
    "drizzle-kit": "^0.20.x"
  }
}
```

#### packages/domain

```json
{
  "dependencies": {
    "zod": "^3.x",
    "@every-player/types": "workspace:*"
  },
  "devDependencies": {
    "jest": "^29.x"
  }
}
```

### 4.3 Configuration Files

#### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".expo/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {},
    "type-check": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

#### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

#### Root tsconfig.json

```json
{
  "extends": "@every-player/typescript-config/base.json"
}
```

**Note**: Uses workspace package reference strategy for consistent, maintainable configuration across all packages at any directory depth.

---

## 5. DATABASE ARCHITECTURE

### 5.1 Schema Design Principles

1. **Phase 2 Compatibility**: Schema mirrors expected Laravel MySQL/PostgreSQL structure
2. **Normalization**: 3NF minimum, balance between normalization and query performance
3. **Sync-Ready**: Include metadata columns for future sync (created_at, updated_at, deleted_at)
4. **UUID vs Auto-Increment**: Use UUIDs for client-generated IDs, supports offline creation

### 5.2 Core Entities

**Note**: Specific data entities, fields, and relationships will be defined in a separate data structure document.

Core entity schemas will be created in `packages/database/src/schema/` following this pattern:

```typescript
// Example structure for entity schemas
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const exampleEntity = sqliteTable("example_entity", {
  id: text("id").primaryKey(), // UUID
  // ... entity-specific fields defined in data structure document
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }), // Soft delete for sync
});
```

**Required metadata columns for all entities**:

- `id`: UUID primary key (client-generated)
- `createdAt`: Timestamp (for sync)
- `updatedAt`: Timestamp (for conflict resolution)
- `deletedAt`: Timestamp nullable (for soft deletes and sync)

### 5.3 Migration Strategy

- **Drizzle Kit**: Generate migrations from schema changes
- **Versioning**: Sequential numbering (0001_init.sql, 0002_add_games.sql)
- **Phase 2 Sync**: Migrations tracked in sync metadata table for API coordination

### 5.4 Zod Integration (drizzle-zod)

```typescript
// packages/database/src/validators/index.ts
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { exampleEntity } from "../schema";

// Auto-generated from Drizzle schema
export const insertExampleSchema = createInsertSchema(exampleEntity);
export const selectExampleSchema = createSelectSchema(exampleEntity);

// Custom refinements for business rules can be added
export const createExampleSchema = insertExampleSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    // Add custom validation rules here
  });
```

**Note**: Specific validators will be created for each entity defined in the data structure document.

---

## 6. DOMAIN-DRIVEN DESIGN APPROACH

### 6.1 Domain Package Philosophy

**Lightweight DDD**: Business logic separated from infrastructure, reusable in Phase 2 API

### 6.2 Entity Structure

**Note**: Specific domain entities will be defined based on the data structure document.

Domain entities follow this pattern:

```typescript
// packages/domain/src/entities/ExampleEntity.ts
import { z } from "zod";

export class ExampleEntity {
  constructor(
    public readonly id: string
    // ... entity-specific properties defined in data structure document
  ) {}

  // Business methods that enforce domain rules
  businessMethod(): Result<void, DomainError> {
    // Business rule validation
    if (!this.validateBusinessRule()) {
      return err(new DomainError("BUSINESS_RULE_VIOLATED"));
    }

    // Business logic
    return ok(undefined);
  }

  private validateBusinessRule(): boolean {
    // Domain validation logic
    return true;
  }
}
```

Domain entities encapsulate:

- Business logic and rules
- Entity-specific methods
- Validation beyond schema constraints
- Domain behavior

### 6.3 Value Objects

**Note**: Specific value objects will be defined based on domain concepts in the data structure document.

Value objects follow this pattern:

```typescript
// packages/domain/src/value-objects/ExampleValueObject.ts
export class ExampleValueObject {
  private constructor(private readonly value: string) {}

  static readonly CONSTANT_A = new ExampleValueObject("A");
  static readonly CONSTANT_B = new ExampleValueObject("B");

  static fromString(value: string): Result<ExampleValueObject, ValidationError> {
    // Validation logic
    if (!isValid(value)) {
      return err(new ValidationError("INVALID_VALUE"));
    }
    return ok(new ExampleValueObject(value));
  }

  toString(): string {
    return this.value;
  }

  equals(other: ExampleValueObject): boolean {
    return this.value === other.value;
  }
}
```

Value objects represent:

- Immutable domain concepts
- Type-safe enumerations
- Validated domain primitives

### 6.4 Business Rules

**Note**: Specific business rules will be defined based on domain requirements in the data structure document.

Business rules follow this pattern:

```typescript
// packages/domain/src/rules/example-rules.ts
export const ExampleRules = {
  // Constants defining business constraints
  MAX_EXAMPLE_VALUE: 100,
  MIN_EXAMPLE_VALUE: 1,

  // Validation functions
  validateBusinessRule(entity: ExampleEntity): ValidationResult {
    // Centralized business rule validation
    if (!meetsRequirement(entity)) {
      return { valid: false, error: "REQUIREMENT_NOT_MET" };
    }
    return { valid: true };
  },

  // Business calculations
  calculateDerivedValue(input: SomeValue): DerivedValue {
    // Business logic calculation
    return computeValue(input);
  },
};
```

Business rules provide:

- Centralized domain constraints
- Reusable validation logic
- Domain calculations
- Cross-entity business logic

---

## 7. TESTING STRATEGY

### 7.1 Test Pyramid

```
        E2E (Detox)           <- Critical user flows only
       /                \
    Integration Tests         <- Feature-level coverage (PRIMARY FOCUS)
   /                      \
Unit Tests                   <- Complex domain logic only
```

### 7.2 Coverage Targets

| Layer       | Tool        | Target                  | Focus                                 |
| ----------- | ----------- | ----------------------- | ------------------------------------- |
| Unit        | Jest        | 80%+ for domain package | Business rules, value objects         |
| Integration | Jest + RNTL | 90%+ feature coverage   | User interactions, data flow          |
| E2E         | Detox       | 100% critical paths     | Critical user flows, data persistence |
| Components  | Storybook   | 100% presentational     | UI states, accessibility              |

### 7.3 Test Structure

```
apps/mobile/
├── __tests__/
│   ├── integration/              # Feature tests
│   │   └── [feature].test.tsx    # Tests for each feature
│   └── e2e/                      # Detox tests
│       └── critical-flows.e2e.ts
packages/domain/
└── __tests__/                    # Unit tests
    ├── entities/
    │   └── [Entity].test.ts      # Tests for each entity
    └── rules/
        └── [rule-set].test.ts    # Tests for each rule set
```

**Note**: Specific test files will be created based on entities and features defined in the data structure document.

### 7.4 Storybook Configuration

```typescript
// apps/mobile/.storybook/main.ts
module.exports = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-react-native-web"],
};
```

### 7.5 Testing Limitations & Future Improvements

**Current Limitation (Phase 1)**:

- React Native 0.81.5 (required by Expo SDK 54) has ESM/Flow type syntax incompatibility with modern testing libraries
- Using `react-test-renderer` (deprecated in React 19) with simple snapshot tests
- Limited ability to test Tamagui component internals (components render to `null` in test environment)
- Tests verify component construction and snapshot consistency only

**Current Test Coverage**:

- Component rendering without crashes ✅
- Snapshot testing for regression detection ✅
- Business logic unit tests (domain package) ✅

**Future Solution (Phase 2 or Expo SDK 55+)**:
When upgrading to Expo SDK 55+ with React Native 0.82+:

- Migrate to `@testing-library/react-native` for proper DOM queries
- Add user interaction testing with `fireEvent`
- Test component props, state, and accessibility
- Query by text, role, and testID
- Full integration test coverage with React Native Testing Library matchers

**Migration Path**:

```bash
# After React Native 0.82+ upgrade:
pnpm add -D @testing-library/react-native @testing-library/jest-native
pnpm remove react-test-renderer @types/react-test-renderer

# Update jest.config.js to use @testing-library/react-native
# Write robust tests with proper queries and assertions
```

**Workaround Strategy**:

- Keep snapshot tests for UI regression detection
- Focus Phase 1 testing on domain logic (business rules, value objects)
- Use Storybook for visual component testing
- Plan for comprehensive integration tests after RN upgrade

### 7.6 Testing Commands (turbo.json)

```json
{
  "pipeline": {
    "test:unit": {
      "command": "jest --testPathPattern=__tests__/unit"
    },
    "test:integration": {
      "command": "jest --testPathPattern=__tests__/integration"
    },
    "test:e2e": {
      "command": "detox test"
    },
    "storybook": {
      "command": "storybook dev"
    }
  }
}
```

---

## 8. TYPE SAFETY & VALIDATION

### 8.1 Type Flow Architecture

```
Drizzle Schema (source of truth)
    ↓
TypeScript Types (inferred)
    ↓
Zod Schemas (runtime validation via drizzle-zod)
    ↓
React Hook Form (form validation)
    ↓
Domain Entities (business logic)
```

### 8.2 Implementation Pattern

```typescript
// 1. Define Drizzle schema
// packages/database/src/schema/example-entity.ts
export const exampleEntity = sqliteTable("example_entity", {
  /* fields defined per data structure */
});

// 2. Infer TypeScript types
export type ExampleEntity = typeof exampleEntity.$inferSelect;
export type NewExampleEntity = typeof exampleEntity.$inferInsert;

// 3. Generate Zod schemas
// packages/database/src/validators/example-entity.ts
import { createInsertSchema } from "drizzle-zod";
export const insertExampleSchema = createInsertSchema(exampleEntity);

// 4. Use in forms
// apps/mobile/src/features/example/ExampleForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertExampleSchema } from "@every-player/database/validators";

const form = useForm({
  resolver: zodResolver(insertExampleSchema),
});
```

**Note**: Actual implementation will follow this pattern for entities defined in the data structure document.

### 8.3 Validation Boundaries

- **Database Layer**: Schema constraints (NOT NULL, UNIQUE, etc.)
- **Zod Layer**: Input validation (format, range, business constraints)
- **Domain Layer**: Business rules (roster limits, eligibility)

### 8.4 Type Safety Enforcement

```json
// tsconfig.json (strict settings)
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  }
}
```

---

## 9. PHASE 2 PREPARATION

### 9.1 Phase 2 Overview

**Timeline**: TBD after Phase 1 completion
**Technology**: Laravel (PHP) REST API
**Database**: MySQL or PostgreSQL (relational)

### 9.2 Phase 1 Decisions Supporting Phase 2

| Decision             | Phase 1 Implementation          | Phase 2 Benefit                                     |
| -------------------- | ------------------------------- | --------------------------------------------------- |
| Shared Types Package | TypeScript interfaces           | Generate PHP types or maintain parallel definitions |
| Domain Package       | Business logic in pure TS       | Port to PHP Laravel services                        |
| Drizzle Schema       | SQLite schema with sync columns | Mirror as Laravel migrations                        |
| Zod Validators       | Client-side validation          | Match Laravel validation rules                      |
| UUID Primary Keys    | Client-generated IDs            | Offline creation, merge conflict resolution         |
| Soft Deletes         | `deleted_at` column             | Sync deleted records                                |
| Timestamps           | `created_at`, `updated_at`      | Conflict resolution, last-write-wins                |

### 9.3 API Package Placeholder

```
apps/api/
├── README.md
│   Content:
│   # Phase 2: Laravel REST API
│
│   ## Prerequisites from Phase 1
│   - Database schema matches packages/database/src/schema/* (defined in data structure doc)
│   - Validation rules match packages/database/src/validators/*
│   - Business logic ports from packages/domain/* (entities, rules, value objects)
│
│   ## Setup (when Phase 2 begins)
│   - Laravel 11.x
│   - API Resources for responses
│   - Repository pattern matching domain entities
│   - Sanctum for authentication
│
└── .gitkeep
```

### 9.4 Sync Architecture Preparation

```typescript
// packages/database/src/schema/sync-metadata.ts
// Phase 1: Create table, unused
// Phase 2: Track sync state

export const syncMetadata = sqliteTable("sync_metadata", {
  id: text("id").primaryKey(),
  lastSyncAt: integer("last_sync_at", { mode: "timestamp" }),
  entityType: text("entity_type").notNull(), // 'teams', 'players', etc.
  entityId: text("entity_id").notNull(),
  action: text("action").notNull(), // 'create', 'update', 'delete'
  syncStatus: text("sync_status").notNull(), // 'pending', 'synced', 'conflict'
});
```

### 9.5 Migration Path (Phase 1 → Phase 2)

1. **API Development**: Build Laravel API mirroring local schema
2. **Sync Service**: Add sync package to handle API communication
3. **Conflict Resolution**: Implement strategy (last-write-wins, manual, etc.)
4. **Authentication**: Add auth package (Phase 1b), integrate with API
5. **Migration Script**: One-time upload of local data to API
6. **Hybrid Mode**: App works offline with periodic sync

---

## 10. DEVELOPMENT WORKFLOW

### 10.1 Git Workflow

```
main (protected)
  ↓
develop (integration branch)
  ↓
feature/feature-name
```

**Branch Naming**:

- `feature/add-player-form`
- `fix/roster-validation`
- `test/e2e-team-creation`
- `refactor/domain-entities`

### 10.2 Commit Standards

**Format**: `type(scope): message`

**Types**: feat, fix, test, refactor, docs, chore

**Examples**:

```
feat(roster): add player to team functionality
test(domain): unit tests for Team entity
fix(db): migration for soft delete column
```

### 10.3 Pre-commit Hooks

```javascript
// .husky/pre-commit
#!/usr/bin/env sh
pnpm turbo lint
pnpm turbo type-check
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

### 10.4 EAS Configuration

```json
// apps/mobile/eas.json
{
  "cli": {
    "version": ">= 5.x"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

**EAS Workflow**:

1. **Development Builds**: `eas build --profile development --platform ios`
2. **Preview Builds**: Internal testing builds with OTA updates
3. **Production Builds**: App store submissions

**OTA Updates**: Push JS bundle updates without app store review

### 10.5 Environment Variables

```typescript
// apps/mobile/src/config/env.ts
import Constants from "expo-constants";

export const env = {
  APP_ENV: Constants.expoConfig?.extra?.appEnv ?? "development",
  API_URL: Constants.expoConfig?.extra?.apiUrl ?? "", // Phase 2
  // Phase 1: API_URL unused, placeholder for future
};
```

```json
// app.json
{
  "expo": {
    "extra": {
      "appEnv": "development",
      "apiUrl": ""
    }
  }
}
```

### 10.6 CI/CD Pipeline

```yaml
# .github/workflows/test.yml
name: Test
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm turbo lint
      - run: pnpm turbo type-check
      - run: pnpm turbo test:unit
      - run: pnpm turbo test:integration
```

```yaml
# .github/workflows/eas-build.yml
name: EAS Build
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --platform all --non-interactive
```

---

## 11. IMPLEMENTATION PHASES

### 11.1 Phase 1: Mobile/Web Client (Current)

**Phase 1a: Core Functionality** (Local Storage Only)

- Monorepo setup (Turborepo + pnpm)
- Database layer (Drizzle + expo-sqlite + Zod)
- Domain package (entities, value objects, rules)
- UI foundation (Tamagui, Expo Router)
- Core features (TBD based on data requirements discussion)
- Testing infrastructure (Jest, Detox, Storybook)
- EAS build pipeline

**Phase 1b: Authentication Preparation** (Future)

- Local user profiles (placeholder for API auth)
- Multi-team support per user
- Auth package structure (Phase 2 ready)

### 11.2 Phase 2: REST API (Future - Placeholder Only)

**Placeholder Structure Created**:

- `apps/api/` directory with README
- Shared types package prepared for API integration
- Domain package ready for porting to PHP
- Database schema designed for sync

**Phase 2 Implementation** (when started):

- Laravel API setup
- Database migrations mirroring Phase 1 schema
- API endpoints matching domain operations
- Authentication (Laravel Sanctum)
- Sync service package
- Conflict resolution strategy

---

## 12. NEXT STEPS TO BEGIN PHASE 1

### 12.1 Immediate Actions

1. ✅ Review and approve this planning document
2. ⬜ Discuss data requirements (entities, relationships, fields)
3. ⬜ Initialize monorepo structure
4. ⬜ Set up shared configuration packages
5. ⬜ Initialize Expo app with Expo Router
6. ⬜ Configure Turborepo pipeline
7. ⬜ Set up testing infrastructure
8. ⬜ Create database schema (based on data requirements)
9. ⬜ Implement domain package structure
10. ⬜ Build first feature (TDD approach)

### 12.2 Data Structure Document

A separate data structure document will be created to define:

- Core entities and their fields
- Entity relationships (one-to-many, many-to-many, etc.)
- Value objects and enumerations
- Business rules and constraints
- Feature requirements

This document will inform the implementation of:

- `packages/database/src/schema/` - Drizzle schemas
- `packages/domain/src/entities/` - Domain entities
- `packages/domain/src/value-objects/` - Value objects
- `packages/domain/src/rules/` - Business rules
- `apps/mobile/src/features/` - Feature modules

---

## 13. DOCUMENTATION MAINTENANCE

This planning document should be updated when:

- Technology decisions change
- New packages added to monorepo
- Phase 2 implementation begins
- Major architectural changes

**Version History**:

- v1.0 (2025-10-29): Initial planning document created
- v1.1 (2025-10-29): Changed UI library from React Native Paper to Tamagui
- v1.2 (2025-10-29): Removed specific data entity examples, references separate data structure document

---

## 14. APPENDIX

### 14.1 Key Dependencies Reference

```json
{
  "expo": "~50.x",
  "drizzle-orm": "^0.29.x",
  "drizzle-kit": "^0.20.x",
  "drizzle-zod": "^0.5.x",
  "zod": "^3.x",
  "zustand": "^4.x",
  "tamagui": "^1.x",
  "expo-router": "~3.x",
  "turbo": "^1.x"
}
```

### 14.2 Useful Commands

```bash
# Development
pnpm dev              # Start all dev servers
pnpm turbo build      # Build all packages
pnpm turbo test       # Run all tests
pnpm turbo lint       # Lint all packages

# Mobile specific
cd apps/mobile
pnpm start            # Start Expo dev server
pnpm ios              # Run iOS simulator
pnpm android          # Run Android emulator
pnpm web              # Run web browser

# Database
pnpm drizzle-kit generate  # Generate migrations
pnpm drizzle-kit push      # Push schema changes

# Testing
pnpm test:unit        # Unit tests only
pnpm test:integration # Integration tests
pnpm test:e2e         # Detox E2E tests
pnpm storybook        # Start Storybook

# EAS
eas build --profile development --platform ios
eas update --branch production  # OTA update
```

---

**END OF PLANNING DOCUMENT**
