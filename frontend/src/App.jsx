import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Teams from './pages/Teams';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard - Any logged-in user */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Panel - Only Admin role */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />

        {/* Public Registration Route */}
        <Route 
          path="/register" 
          element={
            <Register />
          } 
        />

      </Routes>
    </Router>
  );

  {/* Protected Teams Route - Any logged-in user */}
  <Route 
    path="/teams" 
    element={
      <ProtectedRoute>
      <Teams />
      </ProtectedRoute>
    } 
  />
}

export default App;