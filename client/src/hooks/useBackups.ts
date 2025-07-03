import { useState, useEffect } from "react";
import type { Backup, BackupFormData, FilterOptions } from "../types/backup";

const STORAGE_KEY = "backup-data";

export const useBackups = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load backups from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const backupsWithDates = parsed.map(
          (backup: Record<string, unknown>) => ({
            ...backup,
            createdAt: new Date(backup.createdAt as string),
            updatedAt: new Date(backup.updatedAt as string),
          })
        );
        setBackups(backupsWithDates);
      }
    } catch {
      setError("Failed to load backup data");
    }
  }, []);

  // Save backups to localStorage whenever backups change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(backups));
    } catch {
      setError("Failed to save backup data");
    }
  }, [backups]);

  const addBackup = (formData: BackupFormData) => {
    setLoading(true);
    setError(null);

    try {
      const newBackup: Backup = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "active",
      };

      setBackups((prev) => [...prev, newBackup]);
      return newBackup;
    } catch (err) {
      setError("Failed to add backup");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBackup = (id: string, formData: BackupFormData) => {
    setLoading(true);
    setError(null);

    try {
      setBackups((prev) =>
        prev.map((backup) =>
          backup.id === id
            ? { ...backup, ...formData, updatedAt: new Date() }
            : backup
        )
      );
    } catch (err) {
      setError("Failed to update backup");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBackup = (id: string) => {
    setLoading(true);
    setError(null);

    try {
      setBackups((prev) => prev.filter((backup) => backup.id !== id));
    } catch (err) {
      setError("Failed to delete backup");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const filterBackups = (filters: FilterOptions) => {
    return backups.filter((backup) => {
      if (
        filters.creator &&
        !backup.creator.toLowerCase().includes(filters.creator.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.notes &&
        !backup.notes.toLowerCase().includes(filters.notes.toLowerCase())
      ) {
        return false;
      }
      if (filters.dateFrom && backup.createdAt < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && backup.createdAt > filters.dateTo) {
        return false;
      }
      return true;
    });
  };

  const getBackupById = (id: string) => {
    return backups.find((backup) => backup.id === id);
  };

  return {
    backups,
    loading,
    error,
    addBackup,
    updateBackup,
    deleteBackup,
    filterBackups,
    getBackupById,
    clearError: () => setError(null),
  };
};
