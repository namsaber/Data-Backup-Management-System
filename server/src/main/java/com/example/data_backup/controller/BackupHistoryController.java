package com.example.data_backup.controller;

import com.example.data_backup.model.BackupHistory;
import com.example.data_backup.repository.BackupHistoryRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/backups")
@CrossOrigin(origins = "http://localhost:5173")
public class BackupHistoryController {

    @Autowired
    private BackupHistoryRepository backupHistoryRepository;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @GetMapping
    public ResponseEntity<List<BackupHistory>> getAllBackups() {
        List<BackupHistory> backups = backupHistoryRepository.findAll();
        return new ResponseEntity<>(backups, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BackupHistory> getBackupById(@PathVariable int id) {
        return backupHistoryRepository.findById(id)
                .map(backup -> new ResponseEntity<>(backup, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<BackupHistory> createBackup(@RequestBody BackupHistory backup) {
        backup.setBackup_time(LocalDateTime.now());
        BackupHistory savedBackup = backupHistoryRepository.save(backup);
        return new ResponseEntity<>(savedBackup, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BackupHistory> updateBackup(@PathVariable int id, @RequestBody BackupHistory backup) {
        return backupHistoryRepository.findById(id)
                .map(existingBackup -> {
                    backup.setId(id);
                    backup.setBackup_time(existingBackup.getBackup_time()); // Giữ nguyên thời gian của bản ghi cũ
                    BackupHistory updatedBackup = backupHistoryRepository.save(backup);
                    return new ResponseEntity<>(updatedBackup, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBackup(@PathVariable int id) {
        return backupHistoryRepository.findById(id)
                .map(backup -> {
                    backupHistoryRepository.delete(backup);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/export")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        List<BackupHistory> backups = backupHistoryRepository.findAll();
        
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Backup History");

            // Tạo style cho header
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);

            // Tạo header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Backup Time", "User ID", "Backup Path", "Note", "User Name"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Tạo style cho data
            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setWrapText(true);
            dataStyle.setBorderTop(BorderStyle.THIN);
            dataStyle.setBorderBottom(BorderStyle.THIN);
            dataStyle.setBorderLeft(BorderStyle.THIN);
            dataStyle.setBorderRight(BorderStyle.THIN);
            dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);

            // Điền dữ liệu
            int rowNum = 1;
            for (BackupHistory backup : backups) {
                Row row = sheet.createRow(rowNum++);
                
                row.createCell(0).setCellValue(backup.getId());
                row.createCell(1).setCellValue(backup.getBackup_time().format(dateFormatter));
                row.createCell(2).setCellValue(backup.getUser_id());
                row.createCell(3).setCellValue(backup.getBackup_path());
                row.createCell(4).setCellValue(backup.getNote() != null ? backup.getNote() : "");
                
                // Thêm tên user nếu có - đã chỉnh sửa để sử dụng tên biến mới
                String userName = backup.getUser() != null ? 
                    backup.getUser().getFirst_name() + " " + backup.getUser().getLast_name() : "";
                row.createCell(5).setCellValue(userName);

                // Áp dụng style cho các cell
                for (int i = 0; i < headers.length; i++) {
                    Cell cell = row.getCell(i);
                    if (cell != null) {
                        cell.setCellStyle(dataStyle);
                    }
                }
            }

            // Auto size các cột
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Cấu hình response
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=backup_history.xlsx");

            // Ghi workbook vào response
            workbook.write(response.getOutputStream());
        }
    }
}