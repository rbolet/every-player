# ROSTER MANAGER - FEATURE PLANNING DOCUMENT

**Purpose**: Machine-readable feature specification for Phase 1a and 1b development
**Audience**: Development execution (70% machine, 30% human)
**Scope**: Feature definitions, priorities, acceptance criteria, technical notes
**Last Updated**: 2025-10-29

**Note**: This document does NOT include data structure definitions. See separate DATA_STRUCTURE.md for entities, fields, and relationships.

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [Phase 1a: Auto-Assignment Demo](#phase-1a-auto-assignment-demo)
3. [Phase 1b: Local CRUD MVP](#phase-1b-local-crud-mvp)
4. [Future Phases Summary](#future-phases-summary)
5. [Technical Architecture Notes](#technical-architecture-notes)

---

## OVERVIEW

### Project Context
Youth soccer roster management system focusing on automatic equal playing time distribution.

### Phase Strategy
- **Phase 1a**: Demo of core auto-assignment feature (hard cutoff for first demo)
- **Phase 1b**: Complete local CRUD operations for MVP
- **Phase 2**: REST API + authentication + data sync
- **Phase 3**: Multi-role + league management
- **Phase 4**: Advanced configuration (formations, player preferences)

### Phase 1 Constraints
- **Single user role**: Coach/Manager of a team
- **Seeded data**: Initial team/roster/games hardcoded or seeded at install
- **Hardcoded settings**: 7v7 soccer, 2-3-1 formation, 4 quarters per game
- **Local storage only**: No server, no authentication, no sync
- **Offline-first**: Full functionality without network

### Key Technical Decisions
- Auto-assignment logic: `packages/domain/src/services/` (domain services)
- Equal playing time: Always calculated per-game basis
- Quarter mechanics: 4 quarters, substitutions only at quarter boundaries
- Formation: Fixed 2-3-1 (GK + 2 DEF + 3 MID + 1 FWD) for Phase 1
- Balance monitoring: Real-time calculation with always-on indicator

---

## PHASE 1A: AUTO-ASSIGNMENT DEMO

**Purpose**: Demonstrate core automatic roster management feature
**User Role**: Coach/Manager (single user, single team)

---

### PA1-001: View Team Summary

**User Story**: As a coach, I can view my team's summary information so that I understand the current season context.

**Priority**: P0 (Critical - Entry point)

**Dependencies**: None (seeded data)

**Key Behaviors**:
- Display team metadata: League name, season
- Show roster/players list with count
- Display default formation (2-3-1 for Phase 1)
- Show games list with count and navigation

**Acceptance Criteria**:
```
Given the app is opened for the first time
When the team summary loads
Then I see the seeded team name, league, and season

Given the team has players
When viewing the team summary
Then I see the complete roster list with player count

Given the team has games scheduled
When viewing the team summary
Then I see the games list sorted chronologically
```

**Technical Notes**:
- Entry screen/home screen
- Read from seeded team entity
- Navigation to games list
- UI: Team header, roster section, games section

**Edge Cases**:
- No players on roster → Display empty state with message
- No games scheduled → Display empty state with message
- Loading state for data fetch

---

### PA1-002: Navigate to Game

**User Story**: As a coach, I can select and navigate to a game so that I can view and manage game details.

**Priority**: P0 (Critical)

**Dependencies**: PA1-001 (View Team Summary)

**Key Behaviors**:
- Display clickable/tappable game list items
- Navigate to game detail screen on selection
- Show back navigation to return to team summary

**Acceptance Criteria**:
```
Given I am viewing the team summary
When I tap on a game in the games list
Then I navigate to that game's detail screen

Given I am viewing a game detail screen
When I tap the back button
Then I return to the team summary screen
```

**Technical Notes**:
- Stack navigation (Team → Game Detail)
- Game entity as navigation parameter
- UI: List item with tap handler

**Edge Cases**:
- Navigation state preservation on app background/foreground

---

### PA1-003: View Game Summary

**User Story**: As a coach, I can view game summary information so that I understand the game context and current assignment status.

**Priority**: P0 (Critical)

**Dependencies**: PA1-002 (Navigate to Game)

**Key Behaviors**:
- Display game metadata: Start date/time, home or away
- Show result if game is past/completed
- Display formation (2-3-1)
- Show roster with % of game assigned (future) or played (past) per player
- Calculate and display % time based on current assignments

**Acceptance Criteria**:
```
Given I am viewing a future game
When the game summary loads
Then I see start date/time, home/away indicator, formation, and % assigned per player

Given I am viewing a past completed game
When the game summary loads
Then I see the game result and % played per player

Given a game has incomplete assignments
When viewing the game summary
Then I see partial % values and balance indicator shows imbalance

Given a player is marked absent
When viewing the game summary
Then that player shows "Absent" status instead of % time
```

**Technical Notes**:
- Read game entity + assignments
- Calculation service: sum quarters per player / total quarters
- Distinguish past vs future games by date comparison
- UI: Game header, formation display, roster table with % column

**Edge Cases**:
- Game with no assignments → Show 0% for all players
- Game with only partial assignments → Show calculated % so far
- Timezone handling for game start time display

---

### PA1-004: View Game Details by Quarter

**User Story**: As a coach, I can view game details divided by quarters so that I can see and manage position assignments per quarter.

**Priority**: P0 (Critical)

**Dependencies**: PA1-003 (View Game Summary)

**Key Behaviors**:
- Display quarters as tabs (Q1, Q2, Q3, Q4)
- Show player position assignments per quarter
- Include bench assignments per quarter
- Navigate between quarters via tabs

**Acceptance Criteria**:
```
Given I am viewing a game detail screen
When the screen loads
Then I see 4 quarter tabs (Q1, Q2, Q3, Q4)

Given I am viewing a quarter tab
When I tap a different quarter tab
Then I see the position assignments for that quarter

Given a quarter has completed assignments
When viewing that quarter
Then I see all positions filled with player names

Given a quarter has empty positions
When viewing that quarter
Then I see empty position slots
```

**Technical Notes**:
- Tab navigation within game screen
- Read assignments filtered by quarter
- Formation defines positions: 1 GK, 2 DEF, 3 MID, 1 FWD, bench
- UI: Tab bar, position grid/list, bench section

**Edge Cases**:
- Quarter with no assignments → Show all empty positions
- Completed quarter → Visual indicator (locked icon, greyed out)
- Active quarter editing state

---

### PA1-005: View Player Position Assignments Per Quarter

**User Story**: As a coach, I can view detailed player position assignments for each quarter so that I understand who is playing where.

**Priority**: P0 (Critical)

**Dependencies**: PA1-004 (View Game Details by Quarter)

**Key Behaviors**:
- Display formation positions visually or as list (GK, DEF, MID, FWD)
- Show player name assigned to each position
- Display bench section with benched players
- Show locked positions with visual indicator

**Acceptance Criteria**:
```
Given I am viewing a quarter
When viewing the positions
Then I see GK position, 2 DEF positions, 3 MID positions, 1 FWD position, and bench

Given a position has a player assigned
When viewing that position
Then I see the player's name

Given a position is empty
When viewing that position
Then I see an empty slot placeholder

Given a position is locked
When viewing that position
Then I see a lock icon or visual indicator
```

**Technical Notes**:
- Read assignments for quarter + game
- Map assignments to formation positions
- Distinguish on-field vs bench
- UI: Formation visual (grid/field layout) or list, bench section

**Edge Cases**:
- More players than positions → Bench handles overflow
- Fewer players than positions → Some positions empty
- Player assigned multiple times (data integrity error) → Show warning

---

### PA1-006: Update Player Position Assignments Per Quarter

**User Story**: As a coach, I can manually update player position assignments for a quarter so that I can customize assignments before or after auto-assignment.

**Priority**: P0 (Critical)

**Dependencies**: PA1-005 (View Player Position Assignments)

**Key Behaviors**:
- Drag-and-drop or tap-to-assign players to positions
- Move players between positions and bench
- Swap players between positions
- Prevent editing of completed quarters

**Acceptance Criteria**:
```
Given I am viewing an incomplete quarter
When I drag a player to an empty position
Then that player is assigned to that position

Given I am viewing an incomplete quarter
When I drag a player to an occupied position
Then the players swap positions

Given I am viewing an incomplete quarter
When I move a player to the bench
Then that player is removed from their position and added to bench

Given a quarter is marked as completed
When I try to edit assignments
Then I see a message that the quarter is locked and cannot be edited
```

**Technical Notes**:
- Update assignment entities
- Validation: one player per position per quarter
- Real-time balance calculation update
- UI: Drag-and-drop or modal selection, disabled state for completed quarters

**Edge Cases**:
- Player marked absent → Cannot be assigned, show warning
- Locked position → Cannot be modified, show lock indicator
- Network/save failure → Rollback UI state, show error

---

### PA1-007: Auto-Assign Empty Positions for Game

**User Story**: As a coach, I can auto-assign all empty positions across all quarters for a game so that I can quickly balance playing time without manual assignment.

**Priority**: P0 (Critical - Core feature)

**Dependencies**: PA1-006 (Update Player Position Assignments)

**Key Behaviors**:
- Trigger auto-assignment for entire game (all quarters)
- Assign players to empty positions only (preserve existing assignments)
- Calculate equal playing time per player across 4 quarters
- Respect locked positions and absent players

**Acceptance Criteria**:
```
Given a game has empty positions
When I trigger auto-assign for the game
Then all empty positions are filled with players achieving balanced playing time

Given a game has some manual assignments
When I trigger auto-assign for the game
Then only empty positions are filled, manual assignments are preserved

Given some positions are locked
When I trigger auto-assign for the game
Then locked positions are not changed, algorithm balances around them

Given the algorithm cannot balance due to locks
When I trigger auto-assign for the game
Then I see a warning with problematic locks listed and assignment is cancelled
```

**Technical Notes**:
- Call domain service: `RosterAssignmentService.autoAssignGame()`
- Algorithm: equal playing time per game (see constraints below)
- Input: game, players, existing assignments, locked positions, absent players
- Output: new assignments or error with lock conflicts
- Transaction: all-or-nothing (rollback on failure)

**Edge Cases**:
- Mathematically impossible to perfectly balance (e.g., 8 players, 7 positions, 4 quarters) → Best possible outcome, minimize max difference
- Player cannot sit out twice before all others sit once → Hard constraint
- Locked positions make balance impossible → Show warning, list conflicts, cancel
- No empty positions → Show message "All positions assigned"
- No available players → Show error

---

### PA1-008: Mark Player as Absent for Game

**User Story**: As a coach, I can mark a player as absent for a game so that they are excluded from assignments.

**Priority**: P0 (Critical)

**Dependencies**: PA1-007 (Auto-Assign Empty Positions)

**Key Behaviors**:
- Mark player as absent for entire game
- Automatically remove player from all existing assignments for that game
- Offer to auto-adjust remaining assignments after removal
- Update balance indicator after removal

**Acceptance Criteria**:
```
Given a player is assigned to positions in a game
When I mark that player as absent
Then they are removed from all position assignments for that game

Given a player is marked as absent
When I mark them absent
Then I see a prompt asking if I want to auto-adjust remaining positions

Given I accept the auto-adjust prompt
When marking a player absent
Then the algorithm reassigns positions to balance playing time among remaining players

Given I decline the auto-adjust prompt
When marking a player absent
Then assignments remain as-is with empty positions where the player was removed
```

**Technical Notes**:
- Update player game status: absent = true
- Delete existing assignments for that player + game
- Optional: call `RosterAssignmentService.autoAdjustGame()`
- UI: Player list with absent toggle/checkbox, confirmation modal

**Edge Cases**:
- Player already absent → Toggle back to available
- Marking absent after quarters are completed → Only affects future quarters
- All players marked absent → Show warning

---

### PA1-009: Auto-Replace Absent Players for Game

**User Story**: As a coach, I can auto-replace absent players for a game so that remaining players are reassigned with balanced playing time.

**Priority**: P0 (Critical)

**Dependencies**: PA1-008 (Mark Player as Absent)

**Key Behaviors**:
- Remove absent player from all assignments
- Recalculate assignments to equalize playing time among remaining players
- Respect locked positions and completed quarters
- Minimal changes to existing assignments

**Acceptance Criteria**:
```
Given a player is marked absent with assignments
When I trigger auto-replace
Then that player's assignments are redistributed among remaining players

Given some positions are locked
When I trigger auto-replace
Then locked positions are preserved, algorithm works around them

Given some quarters are completed
When I trigger auto-replace
Then completed quarters are not changed, only future quarters are adjusted

Given locks make balanced replacement impossible
When I trigger auto-replace
Then I see a warning with problematic locks and option to override or cancel
```

**Technical Notes**:
- Call domain service: `RosterAssignmentService.autoReplaceAbsent()`
- Algorithm: redistribute absent player's time equally
- Minimal adjustment strategy: change as few assignments as possible
- UI: Confirm action button, warning modal for conflicts

**Edge Cases**:
- Multiple players absent → Recalculate for all absences
- No remaining players to fill positions → Show error
- Override option: allow manual adjustment despite imbalance warning

---

### PA1-010: Lock Player Position Assignment for Quarter

**User Story**: As a coach, I can lock a player's position assignment (including bench) for a quarter so that auto-assignment preserves that assignment.

**Priority**: P0 (Critical)

**Dependencies**: PA1-006 (Update Player Position Assignments)

**Key Behaviors**:
- Toggle lock on a specific player-position-quarter assignment
- Visual indicator showing locked status
- Auto-assignment algorithms respect locked assignments
- Locks persist until manually unlocked or quarter completed

**Acceptance Criteria**:
```
Given a player is assigned to a position in a quarter
When I lock that assignment
Then a lock icon appears on that position

Given a position is locked
When I trigger auto-assignment
Then that locked position is not changed

Given multiple positions are locked
When I trigger auto-assignment
Then all locked positions are preserved

Given a quarter is marked complete
When viewing that quarter
Then all assignments are implicitly locked
```

**Technical Notes**:
- Update assignment entity: locked = true
- Locks passed to auto-assignment algorithms as constraints
- UI: Lock icon button per position, visual locked state

**Edge Cases**:
- Lock bench assignment → Player guaranteed to sit that quarter
- Too many locks → Algorithm may fail, show warning
- Unlock requires manual action (tap lock icon again)
- Completed quarters are implicitly locked (cannot be unlocked)

---

### PA1-011: Auto-Assign All Unlocked Positions for Quarter

**User Story**: As a coach, I can auto-assign all unlocked positions for a single quarter so that I can quickly fill one quarter while preserving locked assignments.

**Priority**: P1 (Important)

**Dependencies**: PA1-010 (Lock Player Position)

**Key Behaviors**:
- Auto-assign only the selected quarter
- Respect locked positions in that quarter
- Consider playing time balance across the entire game
- Minimal changes to existing assignments

**Acceptance Criteria**:
```
Given a quarter has empty positions
When I trigger auto-assign for that quarter
Then empty positions are filled balancing for the entire game

Given a quarter has locked positions
When I trigger auto-assign for that quarter
Then locked positions are not changed

Given a quarter is marked complete
When I try to auto-assign that quarter
Then I see an error that the quarter is locked
```

**Technical Notes**:
- Call domain service: `RosterAssignmentService.autoAssignQuarter()`
- Algorithm: balance across game considering this quarter + others
- Input: quarter, game, locked positions, existing assignments
- UI: Auto-assign button per quarter tab

**Edge Cases**:
- Quarter already fully assigned → Show message
- Locks prevent valid assignment → Show warning with lock details
- First quarter auto-assigned → Influences future quarter suggestions

---

### PA1-012: Auto-Assign All Unlocked Positions for Game

**User Story**: As a coach, I can auto-assign all unlocked positions across all quarters for a game so that I can balance playing time while preserving specific locked assignments.

**Priority**: P1 (Important)

**Dependencies**: PA1-010 (Lock Player Position)

**Key Behaviors**:
- Auto-assign all quarters simultaneously
- Respect all locked positions across all quarters
- Calculate balanced playing time with locks as constraints
- Replace all unlocked assignments (not additive)

**Acceptance Criteria**:
```
Given a game has locked positions in multiple quarters
When I trigger auto-assign for the game
Then all unlocked positions are assigned while preserving locks

Given locks make balanced assignment impossible
When I trigger auto-assign for the game
Then I see a warning listing problematic locks and assignment is cancelled

Given some quarters are completed
When I trigger auto-assign for the game
Then completed quarters are not changed, only incomplete quarters are assigned
```

**Technical Notes**:
- Call domain service: `RosterAssignmentService.autoAssignGameWithLocks()`
- Algorithm: constraint satisfaction with locked positions as fixed
- Transaction: all unlocked positions or rollback
- UI: Auto-assign button at game level, warning modal for conflicts

**Edge Cases**:
- All positions locked → Show message "No positions to assign"
- Locks distributed across quarters → Complex constraint solving
- Override option → Allow coach to proceed despite imbalance warning

---

### PA1-013: Mark Quarter as Completed

**User Story**: As a coach, I can mark a quarter as completed so that those assignments are locked and used for compensating adjustments in future quarters.

**Priority**: P0 (Critical)

**Dependencies**: PA1-004 (View Game Details by Quarter)

**Key Behaviors**:
- Mark a quarter as completed (real-time game event)
- Lock all assignments in that quarter (cannot be edited)
- Use completed quarter assignments in future auto-adjust calculations
- Visual indicator showing quarter is completed

**Acceptance Criteria**:
```
Given a quarter has assignments
When I mark that quarter as completed
Then all positions in that quarter are locked

Given a quarter is marked as completed
When I try to edit assignments in that quarter
Then I see a message that completed quarters cannot be edited

Given a quarter is marked as completed
When I trigger auto-adjust for remaining quarters
Then the algorithm compensates for actual playing time in completed quarters
```

**Technical Notes**:
- Update quarter status: completed = true
- Assignments in completed quarters are immutable
- Completed quarters used as inputs to auto-adjust algorithm
- UI: Complete button per quarter, visual completed state (checkmark, grey overlay)

**Edge Cases**:
- Mark quarter complete with empty positions → Show warning, allow proceed
- Undo complete (edge case for mistakes) → Out of scope for Phase 1
- All quarters completed → Equivalent to game complete (see Phase 1b)

---

### PA1-014: Auto-Adjust Remaining Quarters

**User Story**: As a coach, I can auto-adjust remaining quarters after marking a quarter complete so that future assignments compensate for actual playing time in completed quarters.

**Priority**: P0 (Critical - Core feature)

**Dependencies**: PA1-013 (Mark Quarter as Completed)

**Key Behaviors**:
- Recalculate assignments for all incomplete quarters
- Compensate for playing time imbalances from completed quarters
- Respect locked positions in incomplete quarters
- Attempt to equalize total game playing time

**Acceptance Criteria**:
```
Given Q1 is marked complete and playing time is imbalanced
When I trigger auto-adjust remaining quarters
Then Q2, Q3, Q4 assignments are recalculated to compensate

Given a player played more than expected in Q1
When I trigger auto-adjust remaining quarters
Then that player sits more in future quarters to balance

Given a player sat Q1 and others played
When I trigger auto-adjust remaining quarters
Then that player plays more in future quarters to balance

Given locks in future quarters prevent perfect balance
When I trigger auto-adjust remaining quarters
Then I see a warning and option to override or cancel
```

**Technical Notes**:
- Call domain service: `RosterAssignmentService.autoAdjustRemainingQuarters()`
- Algorithm: calculate target % per player, compare to actual from completed quarters, adjust future to compensate
- Input: completed quarters, incomplete quarters, locked positions
- Output: new assignments for incomplete quarters or warning
- UI: Auto-adjust button appears after marking quarter complete, warning modal

**Edge Cases**:
- Perfect balance impossible with remaining time → Minimize max difference, show warning
- All future quarters locked → Show error "Cannot adjust, all positions locked"
- Override option → Allow coach to accept best-effort result
- Q4 is last quarter → No future quarters to adjust, show message

---

### PA1-015: Always-On Balance Indicator

**User Story**: As a coach, I can see at a glance whether current position assignments are balanced so that I know when manual intervention or auto-assignment is needed.

**Priority**: P0 (Critical - Core feature)

**Dependencies**: PA1-003 (View Game Summary)

**Key Behaviors**:
- Real-time calculation of playing time balance
- Visual indicator (icon, badge, traffic light) showing balance status
- Continuously updated as assignments change
- Present on game summary and quarter detail screens

**Acceptance Criteria**:
```
Given current assignments result in equal playing time
When viewing the game
Then the balance indicator shows green/balanced state

Given current assignments result in imbalanced playing time
When viewing the game
Then the balance indicator shows red/warning state

Given I manually change an assignment
When the assignment is saved
Then the balance indicator updates immediately

Given I add or remove a player assignment
When the change is applied
Then the balance indicator recalculates and updates
```

**Technical Notes**:
- Domain service: `RosterAssignmentService.calculateBalance()`
- Algorithm: calculate % per player, check if within threshold (e.g., ±5%)
- Reactive calculation on assignment changes
- UI: Persistent indicator (header badge, floating button, status bar)

**Edge Cases**:
- No assignments yet → Show neutral/empty state
- Mathematically impossible to balance → Show "best possible" threshold
- Calculation performance → Debounce on rapid changes

---

### PA1-016: View Detailed Playing Time Breakdown (On-Demand)

**User Story**: As a coach, I can view a detailed breakdown of playing time per player for the current game so that I can understand exactly how time is distributed before committing assignments.

**Priority**: P0 (Critical - Core feature)

**Dependencies**: PA1-015 (Always-On Balance Indicator)

**Key Behaviors**:
- Button/action to open detailed breakdown modal
- Show % of game per player based on current assignments
- Include completed and planned assignments
- Highlight imbalances visually

**Acceptance Criteria**:
```
Given I am viewing a game
When I tap the balance indicator or "View Breakdown" button
Then a modal opens showing % time per player for this game

Given the breakdown modal is open
When viewing the data
Then I see each player's name with their calculated % time

Given a player has 0% time
When viewing the breakdown
Then that player is highlighted as not playing

Given playing time is imbalanced
When viewing the breakdown
Then players with higher/lower % are highlighted
```

**Technical Notes**:
- Domain service: `RosterAssignmentService.calculateDetailedBreakdown()`
- Calculation: (quarters playing / total quarters) * 100 per player
- UI: Modal/popup with table or list, visual highlights for imbalance

**Edge Cases**:
- Absent players → Show "Absent" instead of 0%
- Partial assignments → Show current calculated % with "incomplete" indicator
- Future vs past games → Show "planned" vs "actual" label

---

### PA1-017: View % Time at GK Per Game

**User Story**: As a coach, I can view the percentage of time each player has spent at goalkeeper for the current game so that I can ensure GK rotation is fair.

**Priority**: P1 (Important)

**Dependencies**: PA1-016 (View Detailed Playing Time Breakdown)

**Key Behaviors**:
- Show % time at GK position per player for the game
- Include in detailed breakdown modal or separate view
- Calculate from current assignments (planned or actual)

**Acceptance Criteria**:
```
Given a game has GK assignments
When viewing the detailed breakdown
Then I see a column showing % time at GK per player

Given a player played GK for 2 out of 4 quarters
When viewing the breakdown
Then that player shows 50% at GK

Given a player did not play GK at all
When viewing the breakdown
Then that player shows 0% at GK
```

**Technical Notes**:
- Domain service: calculate position-specific % time
- Filter assignments by position = GK
- UI: Additional column in breakdown table, or separate section

**Edge Cases**:
- No GK assignments → Show 0% for all players
- Multiple players at GK per quarter (data integrity error) → Show warning

---

## PHASE 1B: LOCAL CRUD MVP

**Purpose**: Complete local roster management with create/edit/delete operations
**User Role**: Coach/Manager (single user, single team)

---

### PB1-001: Create Team

**User Story**: As a coach, I can create a new team so that I can start managing a roster from scratch.

**Priority**: P0 (Critical)

**Dependencies**: None

**Key Behaviors**:
- Input team name, league, season
- Validate required fields
- Create team entity in local database
- Navigate to team summary after creation

**Acceptance Criteria**:
```
Given I am on the create team screen
When I enter team name, league, season and submit
Then a new team is created and I navigate to the team summary

Given I try to create a team without a name
When I submit the form
Then I see a validation error for the required field

Given I successfully create a team
When I navigate back to team list
Then I see the newly created team
```

**Technical Notes**:
- Domain entity: Team
- Validation: required fields, name length limits
- UUID generation for team ID
- UI: Form screen with inputs and submit button

**Edge Cases**:
- Duplicate team names → Allow (no uniqueness constraint for Phase 1)
- Save failure → Show error, preserve form input

---

### PB1-002: Edit Team Summary Information

**User Story**: As a coach, I can edit team summary information (league, season) so that I can correct or update team details.

**Priority**: P0 (Critical)

**Dependencies**: PB1-001 (Create Team)

**Key Behaviors**:
- Navigate to edit team screen
- Pre-fill form with existing team data
- Update league and season fields
- Save changes to database

**Acceptance Criteria**:
```
Given I am viewing team summary
When I tap edit team button
Then I navigate to edit team screen with pre-filled data

Given I am editing team information
When I change league or season and save
Then the team summary updates with new values

Given I cancel editing
When I navigate back without saving
Then no changes are applied
```

**Technical Notes**:
- Update team entity
- Validation: same as create
- UI: Edit form screen, save/cancel actions

**Edge Cases**:
- Edit while assignments exist → Allow (no dependencies)
- Save failure → Show error, preserve changes in form

---

### PB1-003: Create/Add Players to Team

**User Story**: As a coach, I can add players to my team roster so that I can build my team.

**Priority**: P0 (Critical)

**Dependencies**: PB1-001 (Create Team)

**Key Behaviors**:
- Input player details (fields per data structure doc)
- Validate required fields
- Add player to team roster
- Update roster list immediately

**Acceptance Criteria**:
```
Given I am viewing team summary
When I tap add player button
Then I navigate to create player form

Given I enter player details and submit
When the form is valid
Then the player is added to the roster

Given I try to add a player without required fields
When I submit the form
Then I see validation errors
```

**Technical Notes**:
- Domain entity: Player
- Foreign key: team ID
- Validation: required fields per data structure
- UI: Player form screen, roster list updates

**Edge Cases**:
- Duplicate player names → Allow (no uniqueness constraint)
- Maximum roster size → No limit for Phase 1
- Save failure → Show error, preserve form input

---

### PB1-004: Edit Player Details

**User Story**: As a coach, I can edit player details so that I can correct or update player information.

**Priority**: P1 (Important)

**Dependencies**: PB1-003 (Create/Add Players)

**Key Behaviors**:
- Navigate to edit player screen
- Pre-fill form with existing player data
- Update player fields
- Save changes to database

**Acceptance Criteria**:
```
Given I am viewing the roster
When I tap a player and select edit
Then I navigate to edit player screen with pre-filled data

Given I am editing a player
When I change fields and save
Then the player details are updated

Given a player has existing game assignments
When I edit their details
Then assignments are preserved (no cascading changes)
```

**Technical Notes**:
- Update player entity
- Validation: same as create
- UI: Edit form screen, save/cancel actions

**Edge Cases**:
- Edit player currently assigned to games → Allow (no impact on assignments)
- Save failure → Show error, preserve changes in form

---

### PB1-005: Delete Player from Team

**User Story**: As a coach, I can delete a player from the roster so that I can remove players who are no longer on the team.

**Priority**: P1 (Important)

**Dependencies**: PB1-003 (Create/Add Players)

**Key Behaviors**:
- Confirm deletion action
- Remove player from roster
- Handle existing game assignments (soft delete vs hard delete)
- Update roster list immediately

**Acceptance Criteria**:
```
Given I am viewing the roster
When I select a player and tap delete
Then I see a confirmation prompt

Given I confirm player deletion
When the deletion is processed
Then the player is removed from the roster

Given a player has existing game assignments
When I delete that player
Then I see a warning about existing assignments
```

**Technical Notes**:
- Soft delete: set deleted_at timestamp (preserve historical data)
- Hard delete: remove entity (simpler, no historical data needed for Phase 1)
- Recommendation: Soft delete for Phase 2 sync compatibility
- UI: Delete confirmation modal, warning for assignments

**Edge Cases**:
- Player with future game assignments → Show warning, require confirmation
- Player with past game assignments → Show warning about historical data loss
- Delete fails → Show error, preserve player in roster

---

### PB1-006: Create/Add Future Games to Team

**User Story**: As a coach, I can create and add future games to my team schedule so that I can plan assignments.

**Priority**: P0 (Critical)

**Dependencies**: PB1-001 (Create Team)

**Key Behaviors**:
- Input game details: start date/time, home or away
- Validate required fields and future date
- Create game entity in database
- Add game to games list

**Acceptance Criteria**:
```
Given I am viewing team summary
When I tap add game button
Then I navigate to create game form

Given I enter game details and submit
When the form is valid
Then the game is added to the schedule

Given I try to create a game in the past
When I submit the form
Then I see a validation error

Given I create a game
When I navigate to the games list
Then the new game appears in chronological order
```

**Technical Notes**:
- Domain entity: Game
- Foreign key: team ID
- Validation: required fields, future date
- Initialize 4 quarters per game (empty assignments)
- UI: Game form screen with date/time picker

**Edge Cases**:
- Date/time in the past → Show validation error
- Duplicate game times → Allow (no uniqueness constraint)
- Save failure → Show error, preserve form input

---

### PB1-007: Edit Game Details

**User Story**: As a coach, I can edit game details (date/time, home/away) so that I can correct or update game information.

**Priority**: P1 (Important)

**Dependencies**: PB1-006 (Create/Add Future Games)

**Key Behaviors**:
- Navigate to edit game screen
- Pre-fill form with existing game data
- Update date/time and home/away fields
- Save changes to database

**Acceptance Criteria**:
```
Given I am viewing a game
When I tap edit game button
Then I navigate to edit game screen with pre-filled data

Given I am editing a game
When I change date/time or home/away and save
Then the game details are updated

Given a game has existing assignments
When I edit game details
Then assignments are preserved
```

**Technical Notes**:
- Update game entity
- Validation: same as create
- UI: Edit form screen, save/cancel actions

**Edge Cases**:
- Edit game with completed quarters → Allow (only metadata change)
- Change date to past → Show warning if game wasn't complete
- Save failure → Show error, preserve changes in form

---

### PB1-008: Delete Game from Team

**User Story**: As a coach, I can delete a game from the schedule so that I can remove cancelled or incorrect games.

**Priority**: P1 (Important)

**Dependencies**: PB1-006 (Create/Add Future Games)

**Key Behaviors**:
- Confirm deletion action
- Remove game and all associated assignments
- Update games list immediately

**Acceptance Criteria**:
```
Given I am viewing the games list
When I select a game and tap delete
Then I see a confirmation prompt

Given I confirm game deletion
When the deletion is processed
Then the game and all assignments are removed

Given a game has completed quarters
When I delete that game
Then I see a warning about deleting historical data
```

**Technical Notes**:
- Soft delete: set deleted_at timestamp (preserve historical data)
- Cascade delete assignments (or soft delete)
- UI: Delete confirmation modal, warning for completed games

**Edge Cases**:
- Game with completed quarters → Show strong warning about historical data
- Delete fails → Show error, preserve game in list

---

### PB1-009: Record Game Result and Mark Game Complete

**User Story**: As a coach, I can record the game result and mark a game as complete so that it is locked and counted in historical statistics.

**Priority**: P0 (Critical)

**Dependencies**: PA1-013 (Mark Quarter as Completed)

**Key Behaviors**:
- Input game result (score, win/loss/tie)
- Mark all quarters as completed (if not already)
- Lock all assignments (prevent further editing)
- Update game status to complete

**Acceptance Criteria**:
```
Given a game has occurred
When I tap mark game complete
Then I see a form to enter the game result

Given I enter the result and submit
When the form is valid
Then the game is marked complete and all assignments are locked

Given not all quarters are marked complete
When I mark the game complete
Then I see a prompt to confirm completing all quarters

Given a game is marked complete
When I try to edit assignments
Then I see a message that completed games cannot be edited
```

**Technical Notes**:
- Update game entity: completed = true, result fields
- Update all quarters: completed = true
- Lock all assignments
- UI: Result form screen, confirmation modal

**Edge Cases**:
- Mark complete with empty assignments → Show warning, allow proceed
- Mark complete before game date → Show warning (edge case for retroactive entry)
- Undo complete (edge case) → Out of scope for Phase 1

---

### PB1-010: View Roster Game Time Details (Actual)

**User Story**: As a coach, I can view roster-level game time statistics showing % total and by position per player for actual completed games so that I can see historical playing time distribution.

**Priority**: P1 (Important)

**Dependencies**: PB1-009 (Record Game Result)

**Key Behaviors**:
- Display roster-level dashboard/report
- Show per-player statistics across completed games
- Calculate % total playing time per player
- Break down % time by position (GK, DEF, MID, FWD, Bench)

**Acceptance Criteria**:
```
Given the team has completed games
When I navigate to roster statistics
Then I see a table with player names and their % total playing time

Given a player has played multiple games
When viewing roster statistics
Then I see their average % across completed games

Given a player has played different positions
When viewing roster statistics
Then I see breakdown: % at GK, % at DEF, % at MID, % at FWD

Given a player was absent for a game
When viewing roster statistics
Then that game is excluded from their % calculation
```

**Technical Notes**:
- Aggregate assignments across completed games
- Calculate: (quarters played / total quarters in completed games) * 100
- Group by position for breakdown
- UI: Dashboard/report screen with table, sortable columns

**Edge Cases**:
- No completed games → Show empty state message
- Player added mid-season → Calculate from their first game only
- Absent games excluded from denominator

---

### PB1-011: View Roster Game Time Details (Projected + Actual Total)

**User Story**: As a coach, I can view roster-level game time statistics showing projected playing time from future games combined with actual playing time from completed games so that I can see season-long trends.

**Priority**: P2 (Nice-to-have)

**Dependencies**: PB1-010 (View Roster Game Time Details Actual)

**Key Behaviors**:
- Include both completed and future games in calculation
- Show projected % for incomplete games
- Show combined total % (actual + projected)
- Distinguish between actual and projected visually

**Acceptance Criteria**:
```
Given the team has both completed and future games
When I navigate to roster statistics
Then I see combined % showing actual + projected time

Given a player has assignments in future games
When viewing roster statistics
Then I see their projected % included in totals

Given I toggle between views
When I select "actual only" or "actual + projected"
Then the statistics update accordingly
```

**Technical Notes**:
- Aggregate: completed games (actual) + incomplete games (projected)
- Calculate: same formula but include future assignments
- UI: Toggle or tabs for "actual only" vs "actual + projected"

**Edge Cases**:
- Future game with no assignments → Count as 0% for projected
- Future games change frequently → Projected % is estimate only

---

## FUTURE PHASES SUMMARY

### Phase 2: REST API + Authentication + Sync
**Purpose**: Enable multi-device access and data persistence via server

**Key Features** (High-Level):
- Laravel REST API backend
- User authentication (login/logout/register)
- Data sync between local database and API
- Conflict resolution for offline changes
- Multi-device support for same user

**Dependencies**: Phase 1 complete with proper sync-ready schemas (UUID, timestamps, soft deletes)

---

### Phase 3: Multi-Role + League Management
**Purpose**: Support league administration and multiple coaches

**Key Features** (High-Level):
- Role-based access: League Admin, Coach/Manager
- League admin configures leagues, divisions, schedules
- Multiple teams per league
- League-level reporting and statistics
- Game assignments across multiple teams

**Dependencies**: Phase 2 authentication and multi-user support

---

### Phase 4: Advanced Configuration
**Purpose**: Full MVP with customizable formations and player preferences

**Key Features** (High-Level):
- Select and assign formations (not hardcoded)
- Player position preferences/capabilities
- Advanced auto-assignment considering preferences
- Custom game divisions (not just quarters)
- Free substitutions (time-based, not just quarter boundaries)

**Dependencies**: Phase 3 complete, solid foundation for complex rules

---

## TECHNICAL ARCHITECTURE NOTES

### Auto-Assignment Algorithm Location
**Package**: `packages/domain/src/services/RosterAssignmentService`

**Key Methods**:
- `autoAssignGame(game, players, existingAssignments, locks, absentPlayers): Result<Assignment[], Error>`
- `autoAssignQuarter(quarter, game, players, locks): Result<Assignment[], Error>`
- `autoAssignGameWithLocks(game, players, locks, completedQuarters): Result<Assignment[], Error>`
- `autoReplaceAbsent(game, absentPlayer, locks, completedQuarters): Result<Assignment[], Error>`
- `autoAdjustRemainingQuarters(game, completedQuarters, locks): Result<Assignment[], Error>`
- `calculateBalance(game, assignments): BalanceResult`
- `calculateDetailedBreakdown(game, assignments): PlayerBreakdown[]`

**Algorithm Constraints** (Phase 1):
- Equal playing time per game basis
- No player sits twice before others sit once (hard constraint)
- Minimal changes to existing assignments
- Respect locked positions
- Respect completed quarters (immutable)
- Exclude absent players

**Algorithm Complexity**: Constraint satisfaction problem, potentially NP-hard with many locks. Use heuristics for Phase 1:
- Greedy approach: assign players with least time first
- Backtracking if constraints violated
- Timeout with best-effort result if taking too long

---

### Balance Calculation Logic
**Package**: `packages/domain/src/services/RosterAssignmentService.calculateBalance()`

**Algorithm**:
1. Calculate quarters played per player
2. Calculate % time per player: (quarters / 4) * 100
3. Find min and max % across all players
4. Balance status:
   - Balanced: max - min <= threshold (e.g., 5%)
   - Warning: max - min <= warning threshold (e.g., 15%)
   - Imbalanced: max - min > warning threshold

**Threshold Configuration**:
- Ideal: 0% difference (rarely achievable)
- Balanced: ≤5% difference
- Warning: ≤15% difference
- Imbalanced: >15% difference

**Edge Cases**:
- Mathematically impossible to be perfect (e.g., 8 players, 7 positions, 4 quarters): best possible = 25% difference (1 player plays 3 quarters, others play 4). Threshold should account for this.

---

### Quarter Completion State Machine
**States**:
1. **Empty**: No assignments
2. **Partial**: Some assignments, not complete
3. **Full**: All positions assigned (may still be imbalanced)
4. **Completed**: Marked as completed (real-time event), locked

**Transitions**:
- Empty → Partial: Add assignment
- Partial → Full: Fill all positions
- Full → Completed: Mark quarter complete action
- Partial → Completed: Mark quarter complete (with warning)
- Completed → (immutable): No transitions out

**Implications**:
- Only incomplete quarters can be edited
- Completed quarters used in auto-adjust calculations
- All quarters completed ≈ game completed

---

### Game Completion Logic
**Trigger**: Mark game complete action

**Preconditions**:
- Game date/time has passed (optional warning if not)
- Result entered (score, win/loss/tie)

**Actions**:
1. Mark all quarters as completed (if not already)
2. Lock all assignments in all quarters
3. Update game entity: completed = true
4. Prevent further editing of assignments

**Implications**:
- Completed games counted in historical statistics
- Locked assignments used for season-long reporting
- No undo for Phase 1 (future enhancement)

---

### Data Validation Layers
1. **Schema Layer** (Drizzle): NOT NULL, foreign keys, data types
2. **Zod Layer**: Input validation, format checks, range validation
3. **Domain Layer**: Business rules, constraints, cross-entity validation

**Example: Assign Player to Position**
- Schema: player_id exists, position valid enum
- Zod: player_id is UUID, position is string
- Domain: player not absent, position not locked, quarter not completed

---

### UI State Management (Zustand)
**Stores**:
- `useTeamStore`: Team data, roster
- `useGameStore`: Games list, selected game
- `useAssignmentStore`: Current game assignments, locks, balance status
- `useUIStore`: Navigation, modals, loading states

**Derived State**:
- Balance status: computed from assignments
- % time per player: computed from assignments
- Locked positions: stored in assignment entities
- Completed quarters: stored in quarter entities

---

### Testing Strategy for Auto-Assignment
**Unit Tests** (Domain Package):
- Algorithm correctness: equal distribution with various player/position/quarter combinations
- Constraint satisfaction: locks respected, absent players excluded
- Edge cases: impossible scenarios, minimal roster, maximal locks

**Integration Tests** (Mobile App):
- User flow: manual assign → auto-assign → verify balance
- Lock behavior: lock positions → auto-assign → verify locks preserved
- Quarter completion: mark complete → auto-adjust → verify compensation

**E2E Tests** (Detox):
- Full game management: create game → assign quarters → mark complete
- Auto-assignment workflow: game with empty positions → auto-assign → verify assignments
- Balance monitoring: assign players → check indicator → view breakdown

---

## VERSION HISTORY

- v1.0 (2025-10-29): Initial feature planning document created
- Phase 1a: 17 features defined
- Phase 1b: 11 features defined
- Future phases: High-level summary

---

**END OF FEATURE PLANNING DOCUMENT**
