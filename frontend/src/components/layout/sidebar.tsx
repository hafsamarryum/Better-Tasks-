import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-64 bg-white h-screen p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Better Tasks</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/dashboard/tasks">Tasks</Link></li>
        {user?.role === 'ADMIN' && <li><Link to="/dashboard/users">User Management</Link></li>}
      </ul>
    </div>
  );
};

export default Sidebar;
