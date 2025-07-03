import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { BackupFilter } from '../components/BackupFilter';
import { BackupTable } from '../components/BackupTable';
import { Modal } from '../components/Modal';
import { useBackups } from '../hooks/useBackups';
import { exportToExcel } from '../utils/excelExport';
import type { Backup, FilterOptions } from '../types/backup';
import { Plus, AlertCircle } from 'lucide-react';

export const BackupListPage: React.FC = () => {
    const navigate = useNavigate();
    const { backups, loading, error, deleteBackup, filterBackups, clearError } = useBackups();
    const [filteredBackups, setFilteredBackups] = useState<Backup[]>(backups);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; backupId: string | null }>({
        isOpen: false,
        backupId: null
    });


    const handleFilter = (filters: FilterOptions) => {
        const filtered = filterBackups(filters);
        setFilteredBackups(filtered);
    };

    const handleClearFilter = () => {
        setFilteredBackups(backups);
    };

    const handleEdit = (backup: Backup) => {
        navigate(`/edit/${backup.id}`);
    };

    const handleDelete = (id: string) => {
        setDeleteModal({ isOpen: true, backupId: id });
    };

    const confirmDelete = async () => {
        if (deleteModal.backupId) {
            try {
                await deleteBackup(deleteModal.backupId);
                setDeleteModal({ isOpen: false, backupId: null });
            } catch (error) {
                console.error('Failed to delete backup:', error);
            }
        }
    };

    const handleExport = async () => {
        try {
            const filename = await exportToExcel(filteredBackups, 'backup-data');
            alert(`Đã xuất file thành công: ${filename}`);
        } catch {
            alert('Có lỗi xảy ra khi xuất file Excel');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Quản lý Backup
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Hệ thống quản lý các bản sao lưu dữ liệu
                            </p>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/add')}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm Backup mới
                        </Button>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Có lỗi xảy ra
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                                <div className="mt-4">
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={clearError}
                                    >
                                        Đóng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filter */}
                <div className="mb-6">
                    <BackupFilter
                        onFilter={handleFilter}
                        onClear={handleClearFilter}
                    />
                </div>

                {/* Table */}
                <div className="mb-6">
                    <BackupTable
                        backups={filteredBackups}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onExport={handleExport}
                        loading={loading}
                    />
                </div>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false, backupId: null })}
                    title="Xác nhận xóa"
                    size="sm"
                >
                    <div className="p-6">
                        <p className="text-gray-700 mb-6">
                            Bạn có chắc chắn muốn xóa backup này không? Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <Button
                                variant="secondary"
                                onClick={() => setDeleteModal({ isOpen: false, backupId: null })}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="danger"
                                onClick={confirmDelete}
                                loading={loading}
                            >
                                Xóa
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}; 