export interface Backup {
  id: string;
  creator: string;
  filePath: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  fileSize?: number;
  status: "active" | "deleted";
}

export interface BackupFormData {
  creator: string;
  filePath: string;
  notes: string;
}

export interface FilterOptions {
  dateFrom?: Date;
  dateTo?: Date;
  creator?: string;
  notes?: string;
}
