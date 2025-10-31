// Type declarations for migrations
export interface MigrationJournal {
  version: string;
  dialect: string;
  entries: Array<{
    idx: number;
    version: string;
    when: number;
    tag: string;
    breakpoints: boolean;
  }>;
}

export interface MigrationMeta {
  journal: MigrationJournal;
  migrations: Record<string, string>;
}
