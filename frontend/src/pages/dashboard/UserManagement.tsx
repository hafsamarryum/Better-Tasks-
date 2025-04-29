import { useUserStore } from '../../store/userStore';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../utilities/enum';
import EditModal from './EditModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function UserManagement() {
  const { users, fetchUsers, toggleUserRole, deleteUser } = useUserStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
      fetchUsers();
  }, [user]);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
          {users.map((u) => (
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
              <td>
              {user?.id !== u.id && (
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-[#EF4444] px-[15px] py-[5px] text-[#fff] rounded-[5px] border-none"
                >
                  Delete
                </button>
              )}
                {user?.id === u.id && (
                <button
                    onClick={() => handleEditClick(u)}
                    className="bg-[#4CAF50] px-[23px] py-[6px] text-[#fff] rounded-[5px] border-none"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {isModalOpen &&selectedUser &&(
        <EditModal
          user={selectedUser}
          onClose={handleCloseModal}
          showDeleteButton={user?.id === selectedUser.id}
          onSave={(updatedUser) => {
            // handle save logic, e.g., make an API call to update the user
            console.log(updatedUser);
            handleCloseModal();
          }}
        />
      )}
     
  </div>
  );
}
