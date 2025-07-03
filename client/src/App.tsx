import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import BackupList from './pages/BackupList';
import BackupForm from './pages/BackupForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0, lineHeight: '64px' }}>
          Data Backup Management System
        </Title>
      </Header>
      <Content style={{ padding: '24px 8px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BackupList />} />
            <Route path="/backups/new" element={<BackupForm />} />
            <Route path="/backups/:id/edit" element={<BackupForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </Content>
      <Footer style={{ textAlign: 'center', color: '#888' }}>
        © {new Date().getFullYear()} Data Backup Management System
      </Footer>
    </Layout>
  );
};

export default App;
