import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import type { FilterOptions } from '../types/backup';
import { Search, X } from 'lucide-react';

interface BackupFilterProps {
    onFilter: (filters: FilterOptions) => void;
    onClear: () => void;
}

export const BackupFilter: React.FC<BackupFilterProps> = ({
    onFilter,
    onClear
}) => {
    const [filters, setFilters] = useState<FilterOptions>({});
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = (field: keyof FilterOptions, value: string | Date | undefined) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const handleClear = () => {
        setFilters({});
        onClear();
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Bộ lọc</h3>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <Search className="h-4 w-4 mr-1" />
                        {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                    </Button>
                    {hasActiveFilters && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleClear}
                        >
                            <X className="h-4 w-4 mr-1" />
                            Xóa bộ lọc
                        </Button>
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                        label="Người tạo"
                        value={filters.creator || ''}
                        onChange={(e) => handleFilterChange('creator', e.target.value || undefined)}
                        placeholder="Tìm theo người tạo..."
                    />

                    <Input
                        label="Ghi chú"
                        value={filters.notes || ''}
                        onChange={(e) => handleFilterChange('notes', e.target.value || undefined)}
                        placeholder="Tìm trong ghi chú..."
                    />

                    <Input
                        label="Từ ngày"
                        type="date"
                        value={filters.dateFrom ? filters.dateFrom.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleFilterChange('dateFrom', e.target.value ? new Date(e.target.value) : undefined)}
                    />

                    <Input
                        label="Đến ngày"
                        type="date"
                        value={filters.dateTo ? filters.dateTo.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleFilterChange('dateTo', e.target.value ? new Date(e.target.value) : undefined)}
                    />
                </div>
            )}

            {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {filters.creator && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Người tạo: {filters.creator}
                            </span>
                        )}
                        {filters.notes && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Ghi chú: {filters.notes}
                            </span>
                        )}
                        {filters.dateFrom && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Từ: {filters.dateFrom.toLocaleDateString('vi-VN')}
                            </span>
                        )}
                        {filters.dateTo && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Đến: {filters.dateTo.toLocaleDateString('vi-VN')}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}; 