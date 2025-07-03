import React from 'react';
import { Table, Button, Popconfirm, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


interface BackupTableProps {
    data: BackupHistory[];
    users: User[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    pagination?: object;
}

const BackupTable: React.FC<BackupTableProps> = ({ data, users, onEdit, onDelete, pagination }) => {
    const columns: ColumnsType<BackupHistory> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Thời gian backup',
            dataIndex: 'backup_time',
            key: 'backup_time',
            render: (backup_time: string) => dayjs(backup_time).format('DD/MM/YYYY - HH:mm:ss'),
        },
        {
            title: 'Người tạo',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (user_id: number) => {
                const user = users.find(u => u.id === user_id);
                return user ? `${user.first_name} ${user.last_name}` : user_id;
            },
        },
        {
            title: 'Đường dẫn',
            dataIndex: 'backup_path',
            key: 'backup_path',
            render: (text: string) => (
                <Tooltip title={text}>
                    <div style={{
                        maxWidth: 200,
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-line',
                        overflowWrap: 'break-word',
                        display: 'inline-block',
                    }}>
                        {text && text.length > 40 ? text.slice(0, 40) + '...' : text}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            render: (text: string) => (
                <Tooltip title={text}>
                    <div style={{
                        maxWidth: 200,
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-line',
                        overflowWrap: 'break-word',
                        display: 'inline-block',
                    }}>
                        {text && text.length > 20 ? text.slice(0, 20) + '...' : text}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Tooltip title="Sửa">
                        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record.id)} />
                    </Tooltip>
                    <Tooltip title="Xoá">
                        <Popconfirm title="Bạn có chắc muốn xoá?" onConfirm={() => onDelete(record.id)}>
                            <Button type="link" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </>
            ),
        },
    ];

    return <Table rowKey="id" columns={columns} dataSource={data} pagination={pagination} />;
};

export default BackupTable; 