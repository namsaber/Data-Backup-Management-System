package com.example.data_backup.repository;

import com.example.data_backup.model.BackupHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackupHistoryRepository extends JpaRepository<BackupHistory, Integer> {
}