import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Spin } from 'antd';
import { getUsers, createBackup, updateBackup, getBackups } from '../services/backupService';
import { useNavigate, useParams } from 'react-router-dom';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

interface BackupFormValues {
    user_id: number;
    backup_path: string;
    note: string;
}

const BackupForm: React.FC = () => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    // Lấy danh sách user và nếu là edit thì lấy dữ liệu backup
    useEffect(() => {
        const fetchData = async () => {
            setInitLoading(true);
            try {
                const userRes = await getUsers();
                setUsers(userRes ?? []);
                if (id) {
                    // Lấy dữ liệu backup để fill form
                    const backups = await getBackups() ?? [];
                    const backup = backups.find(b => b.id === Number(id));
                    if (backup) {
                        form.setFieldsValue({
                            user_id: backup.user_id,
                            backup_path: backup.backup_path,
                            note: backup.note,
                        });
                    } else {
                        toast.error('Không tìm thấy bản ghi!');
                        navigate('/');
                    }
                }
            } catch {
                toast.error('Lỗi khi tải dữ liệu!');
            } finally {
                setInitLoading(false);
            }
        };
        fetchData();
    }, [id, form, navigate]);

    // Xử lý submit
    const onFinish = async (values: BackupFormValues) => {
        if (!values.backup_path || typeof values.backup_path !== 'string' || values.backup_path.trim() === '') {
            toast.error('Đường dẫn file .bak không được để trống!');
            return;
        }
        setLoading(true);
        try {
            if (id) {
                await updateBackup(Number(id), values);
                toast.success('Cập nhật thành công!');
            } else {
                await createBackup(values);
                toast.success('Thêm mới thành công!');
            }
            navigate('/');
        } catch {
            toast.error('Lỗi khi lưu dữ liệu!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={initLoading} tip="Đang tải dữ liệu...">
            <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #f0f1f2' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 24 }}>{id ? 'Chỉnh sửa' : 'Thêm mới'} bản sao lưu</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{ width: '100%' }}
                >
                    <Form.Item
                        name="user_id"
                        label="Người tạo"
                        rules={[{ required: true, message: 'Vui lòng chọn người tạo!' }]}
                    >
                        <Select placeholder="Chọn người tạo" showSearch optionFilterProp="children">
                            {users.map(user => (
                                <Select.Option key={user.id} value={user.id}>
                                    {user.first_name} {user.last_name} ({user.email})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="backup_path"
                        label="Đường dẫn file .bak"
                        rules={[
                            { required: true, message: 'Vui lòng nhập đường dẫn file .bak!' },
                            { max: 255, message: 'Đường dẫn không được vượt quá 255 ký tự!' },
                            {
                                validator: (_, value) => {
                                    const regex = /^[A-Za-z]:\\(?:[^\\/:*?"<>|]+\\)*[^\\/:*?"<>|]+\.bak$/;
                                    if (!value || regex.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(`Đường dẫn phải có định dạng như: D:\\backup\\mydb.bak hoặc D:\\folder1\\folder2\\mydb.bak`);
                                },
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Ví dụ: D:\backup\mydb.bak" maxLength={255} autoSize={{ minRows: 1, maxRows: 4 }} />
                    </Form.Item>
                    <Form.Item
                        name="note"
                        label="Ghi chú"
                        rules={[
                            { required: true, message: 'Vui lòng nhập ghi chú!' },
                            { max: 255, message: 'Ghi chú không được vượt quá 255 ký tự!' },
                        ]}
                    >
                        <Input.TextArea placeholder="Nhập ghi chú cho bản backup này" rows={3} maxLength={255} />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 8 }}>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />} style={{ width: '100%' }}>
                            {id ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button icon={<RollbackOutlined />} onClick={() => navigate('/')} style={{ width: '100%' }}>
                            Quay lại danh sách
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button htmlType="button" onClick={() => form.resetFields()} style={{ width: '100%' }}>
                            Đặt lại form
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default BackupForm; 