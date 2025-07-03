import React, { useEffect, useState, useCallback } from 'react';
import { Button, Spin, Tooltip } from 'antd';
import BackupTable from '../components/BackupTable';
import type { BackupFilterValues } from '../components/BackupFilter';
import BackupFilter from '../components/BackupFilter';
import { getBackups, getUsers, deleteBackup } from '../services/backupService';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const BackupList: React.FC = () => {
    const [backups, setBackups] = useState<BackupHistory[]>([]);
    const [filtered, setFiltered] = useState<BackupHistory[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Lấy dữ liệu backup và user
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [backupRes, userRes] = await Promise.all([
                getBackups(),
                getUsers(),
            ]);
            setBackups(backupRes ?? []);
            setFiltered(backupRes ?? []);
            setUsers(userRes ?? []);
        } catch {
            toast.error('Lỗi khi tải dữ liệu!');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Lọc dữ liệu
    const handleFilter = (values: BackupFilterValues) => {
        let data = backups;
        if (typeof values.date === 'string' && values.date) {
            data = data.filter(b => b.backup_time?.startsWith?.(values.date as string));
        }
        if (values.user_id) {
            data = data.filter(b => b.user_id === values.user_id);
        }
        if (typeof values.note === 'string' && values.note.trim() !== '') {
            const noteFilter = values.note.toLowerCase();
            data = data.filter(b => typeof b.note === 'string' && (b.note as string).toLowerCase().includes(noteFilter));
        }
        setFiltered(data);
    };

    // Xoá backup
    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await deleteBackup(id);
            toast.success('Đã xoá thành công!');
            fetchData();
        } catch {
            toast.error('Lỗi khi xoá bản ghi!');
        } finally {
            setLoading(false);
        }
    };

    // Sửa backup
    const handleEdit = (id: number) => {
        navigate(`/backups/${id}/edit`);
    };

    // Xuất Excel
    const handleExport = () => {
        try {
            const ws = XLSX.utils.json_to_sheet(filtered.map(b => ({
                ID: b.id,
                'Thời gian backup': dayjs(b.backup_time ? String(b.backup_time) : '').format('DD/MM/YYYY - HH:mm:ss'),
                'Người tạo': users.find(u => u.id === b.user_id) ? `${users.find(u => u.id === b.user_id)!.first_name} ${users.find(u => u.id === b.user_id)!.last_name}` : b.user_id,
                'Đường dẫn': b.backup_path,
                'Ghi chú': b.note || '',
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Backups');
            const today = dayjs().format('YYYYMMDD');
            XLSX.writeFile(wb, `backup_history_${today}.xlsx`);
            setTimeout(() => {
                toast.success('Xuất file Excel thành công!');
            }, 100);
        } catch {
            toast.error('Xuất file Excel thất bại!');
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Danh sách bản sao lưu</h1>
            <div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
                <BackupFilter users={users} onFilter={handleFilter} />
                <div style={{ display: 'flex', gap: 8 }}>
                    <Tooltip title="Thêm mới">
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/backups/new')}>
                            Thêm mới
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xuất Excel">
                        <Button icon={<DownloadOutlined />} onClick={handleExport}>
                            Xuất Excel
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <Spin spinning={loading} tip="Đang tải dữ liệu...">
                <BackupTable data={filtered} users={users} onEdit={handleEdit} onDelete={handleDelete} pagination={{ pageSize: 5 }} />
            </Spin>
        </div>
    );
};

export default BackupList; 