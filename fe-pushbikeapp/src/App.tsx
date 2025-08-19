import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ResultLayout from '@/pages/LiveResult';
import ResultList from './pages/LiveResult/ResultList';
import UserForm from '@/pages/LiveResult/ResultForm';
import TambahLomba from './pages/Lomba/TambahLomba'; 

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Redirect default ke /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Nested route di bawah dashboard */}
          <Route path="/dashboard/tambahLomba" element={<TambahLomba />} />

          {/* Nested route untuk Result */}
          <Route path="/result" element={<ResultLayout />}>
            <Route index element={<ResultList />} />
            <Route path="new" element={<UserForm />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
