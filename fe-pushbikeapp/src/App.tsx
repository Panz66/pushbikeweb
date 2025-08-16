import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ResultList from './pages/LiveResult/ResultList';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/liveResult" element={<ResultList />} />
          <Route path="/users" element={<ResultList />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;


