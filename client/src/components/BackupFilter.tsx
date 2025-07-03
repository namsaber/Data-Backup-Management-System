import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';

export interface BackupFilterValues {
    date?: string;
    user_id?: number;
    note?: string;
}

interface BackupFilterProps {
    users: User[];
    onFilter: (values: BackupFilterValues) => void;
}

const BackupFilter: React.FC<BackupFilterProps> = ({ users, onFilter }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onFilter({
            date: values.date ? values.date.format('YYYY-MM-DD') : undefined,
            user_id: values.user_id,
            note: values.note,
        });
    };

    return (
        <Form form={form} layout="inline" onFinish={handleFinish} style={{ marginBottom: 16 }}>
            <Form.Item name="date" label="Ngày">
                <DatePicker />
            </Form.Item>
            <Form.Item name="user_id" label="Người tạo">
                <Select allowClear style={{ width: 150 }}>
                    {users.map(user => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.first_name} {user.last_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="note" label="Ghi chú">
                <Input placeholder="Tìm ghi chú" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Lọc</Button>
            </Form.Item>
        </Form>
    );
};

export default BackupFilter; 