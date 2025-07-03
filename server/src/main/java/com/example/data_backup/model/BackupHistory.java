package com.example.data_backup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Backup_History")
public class BackupHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(nullable = false)
    private LocalDateTime backup_time;
    
    @Column(nullable = false)
    private int user_id;
    
    @Column(nullable = false)
    private String backup_path;
    
    private String note;
    
    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private Users user;
}