import * as XLSX from "xlsx";
import type { Backup } from "../types/backup";

export const exportToExcel = (
  backups: Backup[],
  filename: string = "backup-data"
) => {
  try {
    // Prepare data for Excel
    const excelData = backups.map((backup) => ({
      ID: backup.id,
      "Người tạo": backup.creator,
      "Đường dẫn file": backup.filePath,
      "Ghi chú": backup.notes,
      "Ngày tạo": backup.createdAt.toLocaleDateString("vi-VN"),
      "Ngày cập nhật": backup.updatedAt.toLocaleDateString("vi-VN"),
      "Trạng thái": backup.status === "active" ? "Hoạt động" : "Đã xóa",
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 15 }, // ID
      { wch: 20 }, // Người tạo
      { wch: 40 }, // Đường dẫn file
      { wch: 30 }, // Ghi chú
      { wch: 15 }, // Ngày tạo
      { wch: 15 }, // Ngày cập nhật
      { wch: 12 }, // Trạng thái
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Backup Data");

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const fullFilename = `${filename}-${timestamp}.xlsx`;

    // Write to file
    XLSX.writeFile(workbook, fullFilename);

    return fullFilename;
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw new Error("Không thể xuất file Excel");
  }
};
