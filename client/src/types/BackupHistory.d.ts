type BackupHistory = {
  id: number;
  backup_time: string; // ISO string
  user_id: number;
  backup_path: string;
  note?: string;
};
