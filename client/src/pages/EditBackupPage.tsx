import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { BackupForm } from '../components/BackupForm';
import { useBackups } from '../hooks/useBackups';
import type { BackupFormData } from '../types/backup';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export const EditBackupPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { getBackupById, updateBackup, loading, error, clearError } = useBackups();
    const [backup, setBackup] = useState<BackupFormData | null>(null);
    const [success, setSuccess] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (id) {
            const backupData = getBackupById(id);
            if (backupData) {
                setBackup({
                    creator: backupData.creator,
                    filePath: backupData.filePath,
                    notes: backupData.notes,
                });
            } else {
                setNotFound(true);
            }
        }
    }, [id, getBackupById]);

    const handleSubmit = async (formData: BackupFormData) => {
        if (!id) return;

        try {
            await updateBackup(id, formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Failed to update backup:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (notFound) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Không tìm thấy backup
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Backup với ID {id} không tồn tại hoặc đã bị xóa.
                    </p>
                    <Button
                        variant="primary"
                        onClick={handleCancel}
                    >
                        Quay về trang chủ
                    </Button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Cập nhật backup thành công!
                    </h2>
                    <p className="text-gray-600">
                        Đang chuyển về trang danh sách...
                    </p>
                </div>
            </div>
        );
    }

    if (!backup) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCancel}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Chỉnh sửa Backup
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Cập nhật thông tin backup
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
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

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <BackupForm
                        initialData={backup}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}; 