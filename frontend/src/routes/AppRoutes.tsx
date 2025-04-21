import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardHome from '../pages/dashboard/DashboardHome';
import Tasks from '../pages/dashboard/Tasks';
import UserManagement from '../pages/dashboard/UserManagement';

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index element={<DashboardHome />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="users" element={<UserManagement />} />
    </Routes>
  );
};

export default AppRoutes;
