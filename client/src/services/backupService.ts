import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = "http://localhost:8080/api";

export const getBackups = async (): Promise<BackupHistory[] | null> => {
  try {
    const res = await axios.get(`${API_BASE}/backups`);
    return res.data;
  } catch (error) {
    console.log(`Lỗi getBackups: ${error}`);
    toast.error("Lỗi khi lấy danh sách sao lưu");
    return null;
  }
};

export const getUsers = async (): Promise<User[] | null> => {
  try {
    const res = await axios.get(`${API_BASE}/users`);
    return res.data;
  } catch (error) {
    console.log(`Lỗi getUsers: ${error}`);
    toast.error("Lỗi khi lấy danh sách người dùng");
    return null;
  }
};

export const createBackup = async (
  data: Omit<BackupHistory, "id" | "backup_time">
): Promise<BackupHistory | null> => {
  try {
    const res = await axios.post(`${API_BASE}/backups`, data);
    return res.data;
  } catch (error) {
    console.log(`Lỗi createBackup: ${error}`);
    toast.error("Lỗi khi tạo bản sao lưu");
    return null;
  }
};

export const updateBackup = async (
  id: number,
  data: Partial<BackupHistory>
): Promise<BackupHistory | null> => {
  try {
    const res = await axios.put(`${API_BASE}/backups/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(`Lỗi updateBackup: ${error}`);
    toast.error("Lỗi khi cập nhật bản sao lưu");
    return null;
  }
};

export const deleteBackup = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE}/backups/${id}`);
  } catch (error) {
    console.log(`Lỗi deleteBackup: ${error}`);
    toast.error("Lỗi khi xoá bản sao lưu");
  }
};
