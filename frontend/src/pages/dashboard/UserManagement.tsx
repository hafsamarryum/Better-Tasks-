import { useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { useAuthStore } from '../../store/authStore';

export default function UserManagement() {
  const { users, fetchUsers, toggleUserRole, deleteUser } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [user]);

  if (user?.role !== 'ADMIN') {
    return <div className="text-red-500 p-4">Access Denied</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    u.role === 'ADMIN' ? 'bg-blue-600' : 'bg-green-600'
                  }`}
                >
                  {u.role}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => toggleUserRole(u.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Toggle Role
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
