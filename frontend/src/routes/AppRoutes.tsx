import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tasks from '../pages/dashboard/Tasks';
import UserManagement from '../pages/dashboard/UserManagement';
import Layout from '../components/layout/Layout';
import DashboardHome from '../pages/dashboard/DashboardHome';
import CreateTasks from '../pages/dashboard/CreateTasks';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
      <Route path="/" element={<DashboardHome/>} />
      <Route path="/dashboard" element={<DashboardHome/>} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="createTasks" element={<CreateTasks/>} />
        <Route path="users" element={<UserManagement />} />
      </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

