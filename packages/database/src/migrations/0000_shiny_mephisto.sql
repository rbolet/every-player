CREATE TABLE `divisions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`players_count` integer NOT NULL,
	`roster_max` integer NOT NULL,
	`no_gk` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_divisions_players_no_gk` ON `divisions` (`players_count`,`no_gk`);--> statement-breakpoint
CREATE TABLE `leagues` (
	`id` text PRIMARY KEY NOT NULL,
	`division_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`division_id`) REFERENCES `divisions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_leagues_division` ON `leagues` (`division_id`);--> statement-breakpoint
CREATE TABLE `seasons` (
	`id` text PRIMARY KEY NOT NULL,
	`league_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`league_id`) REFERENCES `leagues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_seasons_league` ON `seasons` (`league_id`);--> statement-breakpoint
CREATE TABLE `formation_positions` (
	`formation_id` text NOT NULL,
	`position_id` text NOT NULL,
	`display_order` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`formation_id`) REFERENCES `formations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`position_id`) REFERENCES `positions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_formation_positions_formation` ON `formation_positions` (`formation_id`);--> statement-breakpoint
CREATE INDEX `idx_formation_positions_position` ON `formation_positions` (`position_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_formation_positions_formation_display` ON `formation_positions` (`formation_id`,`display_order`);--> statement-breakpoint
CREATE TABLE `formations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`players_count` integer NOT NULL,
	`no_gk` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_formations_players_no_gk` ON `formations` (`players_count`,`no_gk`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_formations_name_players_no_gk` ON `formations` (`name`,`players_count`,`no_gk`);--> statement-breakpoint
CREATE TABLE `positions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`abbreviation` text NOT NULL,
	`position_type` text NOT NULL,
	`display_order` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `positions_abbreviation_unique` ON `positions` (`abbreviation`);--> statement-breakpoint
CREATE INDEX `idx_positions_type` ON `positions` (`position_type`);--> statement-breakpoint
CREATE TABLE `game_periods` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`period_number` integer NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_game_periods_game` ON `game_periods` (`game_id`);--> statement-breakpoint
CREATE INDEX `idx_game_periods_game_number` ON `game_periods` (`game_id`,`period_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_game_periods_game_number` ON `game_periods` (`game_id`,`period_number`);--> statement-breakpoint
CREATE TABLE `game_player_absences` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`player_id` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_absences_game` ON `game_player_absences` (`game_id`);--> statement-breakpoint
CREATE INDEX `idx_absences_player` ON `game_player_absences` (`player_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_game_player_absences_game_player` ON `game_player_absences` (`game_id`,`player_id`);--> statement-breakpoint
CREATE TABLE `game_player_assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`game_period_id` text NOT NULL,
	`player_id` text,
	`position_id` text,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`game_period_id`) REFERENCES `game_periods`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`position_id`) REFERENCES `positions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_assignments_period` ON `game_player_assignments` (`game_period_id`);--> statement-breakpoint
CREATE INDEX `idx_assignments_player` ON `game_player_assignments` (`player_id`);--> statement-breakpoint
CREATE INDEX `idx_assignments_position` ON `game_player_assignments` (`position_id`);--> statement-breakpoint
CREATE INDEX `idx_assignments_period_player` ON `game_player_assignments` (`game_period_id`,`player_id`);--> statement-breakpoint
CREATE TABLE `games` (
	`id` text PRIMARY KEY NOT NULL,
	`home_team_id` text NOT NULL,
	`away_team_id` text,
	`opponent_name` text,
	`date_time` integer NOT NULL,
	`location` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`home_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`away_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_games_home_team` ON `games` (`home_team_id`);--> statement-breakpoint
CREATE INDEX `idx_games_away_team` ON `games` (`away_team_id`);--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`season_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`color` text NOT NULL,
	`default_formation_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`default_formation_id`) REFERENCES `formations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_teams_season` ON `teams` (`season_id`);--> statement-breakpoint
CREATE INDEX `idx_teams_formation` ON `teams` (`default_formation_id`);--> statement-breakpoint
CREATE TABLE `players` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`birthdate` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `team_players` (
	`team_id` text NOT NULL,
	`player_id` text NOT NULL,
	`jersey_number` integer,
	`created_at` integer NOT NULL,
	PRIMARY KEY(`team_id`, `player_id`),
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_team_players_team` ON `team_players` (`team_id`);--> statement-breakpoint
CREATE INDEX `idx_team_players_player` ON `team_players` (`player_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_team_players_team_jersey` ON `team_players` (`team_id`,`jersey_number`);