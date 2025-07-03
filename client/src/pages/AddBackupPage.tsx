import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { BackupForm } from '../components/BackupForm';
import { useBackups } from '../hooks/useBackups';
import type { BackupFormData } from '../types/backup';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const AddBackupPage: React.FC = () => {
    const navigate = useNavigate();
    const { addBackup, loading, error, clearError } = useBackups();
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async (formData: BackupFormData) => {
        try {
            await addBackup(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Failed to add backup:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Thêm backup thành công!
                    </h2>
                    <p className="text-gray-600">
                        Đang chuyển về trang danh sách...
                    </p>
                </div>
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
                        Thêm Backup mới
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Nhập thông tin để tạo bản backup mới
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
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}; 