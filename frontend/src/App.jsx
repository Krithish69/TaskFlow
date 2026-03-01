import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Teams from './pages/Teams';
import KanbanBoard from './pages/KanbanBoard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard - Any logged-in user */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
              <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/project/:projectId" 
          element={
            <ProtectedRoute>
              <Layout>
                <KanbanBoard />
              </Layout>
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
         {/* Protected Teams Route - Any logged-in user */}
  <Route 
    path="/teams" 
    element={
      <ProtectedRoute>
      <Layout>
      <Teams />
      </Layout>
      </ProtectedRoute>
    } 
  />


      </Routes>
    </Router>
  );
} 

export default App;