import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import type { BackupFormData } from '../types/backup';

interface BackupFormProps {
    initialData?: BackupFormData;
    onSubmit: (data: BackupFormData) => void;
    onCancel: () => void;
    loading?: boolean;
}

export const BackupForm: React.FC<BackupFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    loading = false
}) => {
    const [formData, setFormData] = useState<BackupFormData>({
        creator: '',
        filePath: '',
        notes: '',
    });

    const [errors, setErrors] = useState<Partial<BackupFormData>>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const validateForm = (): boolean => {
        const newErrors: Partial<BackupFormData> = {};

        if (!formData.creator.trim()) {
            newErrors.creator = 'Vui lòng nhập tên người tạo';
        }

        if (!formData.filePath.trim()) {
            newErrors.filePath = 'Vui lòng nhập đường dẫn file .bak';
        } else if (!formData.filePath.toLowerCase().endsWith('.bak')) {
            newErrors.filePath = 'File phải có định dạng .bak';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleInputChange = (field: keyof BackupFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Người tạo *"
                value={formData.creator}
                onChange={(e) => handleInputChange('creator', e.target.value)}
                error={errors.creator}
                placeholder="Nhập tên người tạo backup"
                required
            />

            <Input
                label="Đường dẫn file .bak *"
                value={formData.filePath}
                onChange={(e) => handleInputChange('filePath', e.target.value)}
                error={errors.filePath}
                placeholder="C:\path\to\backup.bak"
                helperText="Đường dẫn đến file backup (.bak)"
                required
            />

            <Textarea
                label="Ghi chú"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                error={errors.notes}
                placeholder="Nhập ghi chú cho backup này..."
                rows={3}
            />

            <div className="flex justify-end space-x-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Hủy
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                >
                    {initialData ? 'Cập nhật' : 'Thêm mới'}
                </Button>
            </div>
        </form>
    );
}; 