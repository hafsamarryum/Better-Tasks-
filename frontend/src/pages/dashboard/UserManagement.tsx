import { useUserStore } from '../../store/userStore';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../utilities/enum';

export default function UserManagement() {
  const { users, fetchUsers, toggleUserRole, deleteUser } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    // if (user?.role === 'ADMIN') {
      fetchUsers();
    // }
  }, [user]);

  // if (user?.role !== 'ADMIN') {
  //   return <div className="text-red-500 p-4">Access Denied</div>;
  // }

  return (
    <div className="w-[890px] py-[20px] px-[60px] text-[#1e1f1c] flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-between items-center p-[0px] rounded-[15px] tableImg">
      <h1 className="text-2xl mb-[3px] pl-[10px] items-start">User Management</h1>
      <table className="w-[95%] rounded-[12px] p-[15px] pt-[0px] my-[18px]  border-collapse">
        <thead className="bg-[#d6d2de]">
          <tr className="text-left">
            <th className="p-[10px]">Name</th>
            <th className="p-[10px]">Email</th>
            <th className="p-[10px]">Role</th>
            <th className="p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
          .map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-[10px] w-[50%]">{u.name}</td>
              <td className="p-[10px] w-[50%]">{u.email}</td>
              <td className="p-[10px] w-[50%]">
                <select
                  value={u.role}
                  onChange={(e) => toggleUserRole(u.id, e.target.value as UserRole)}
                  className="py-[6px] pr-[0px] pl-[5px] rounded-[5px] border-none bg-[#f3f4f6] text-[10px]"
                >
                  <option value={UserRole.ADMIN}>ADMIN</option>
                  <option value={UserRole.MEMBER}>MEMBER</option>
                </select>
              </td>
              <td className="p-[15px] flex gap-2">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-[#EF4444] px-[15px] py-[5px] text-[#fff] rounded-[5px] border-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
