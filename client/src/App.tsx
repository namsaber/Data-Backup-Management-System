
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BackupListPage } from './pages/BackupListPage';
import { AddBackupPage } from './pages/AddBackupPage';
import { EditBackupPage } from './pages/EditBackupPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BackupListPage />} />
          <Route path="/add" element={<AddBackupPage />} />
          <Route path="/edit/:id" element={<EditBackupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
