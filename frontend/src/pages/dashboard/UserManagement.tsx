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
    <div className="w-[890px] py-[20px] px-[60px] text-[#1e1f1c] flex flex-col justify-center items-center dashBoardImg">
      <div className="w-[85%] flex flex-col justify-between items-center p-[0px] rounded-[15px] bg-transparent rounded-xl shadow-xl backdrop-blur-[16px]">
      <h1 className="text-2xl mb-[3px] pl-[10px] items-start text-[#1f2d3d]">USER MANAGEMENT</h1>
      <div className="w-[95%] rounded-[12px] p-[15px] pt-[0px] my-[18px] text-[FFF] border-collapse ml-[20px] border-[#223244] overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-[#1f2d3d] text-[#FFF]">
          <tr className="text-left">
            <th className="p-[15px] rounded-tl-[12px] rounded-bl-[12px] w-[30%]">Name</th>
            <th className="p-[15px]">Email</th>
            <th className="p-[15px]">Role</th>
            <th className="p-[15px] rounded-tr-[12px] pl-[2px] rounded-br-[12px]">Actions</th>
          </tr>
        </thead>
        </table>

        <div className="max-h-[300px] overflow-y-auto no-scrollbar ">
        <table className="w-full border-collapse text-[#FFF]">
        <tbody className="text-[#FFF]">
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="py-[10px] w-[30%] pl-[17px]">{u.name}</td>
              <td className="p-[10px] w-[40%]">{u.email}</td>
              <td className="p-[10px] pr-[0px]  w-auto">
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
                  className="bg-[#6b56b2] px-[15px] py-[5px] text-[#FFF] rounded-[5px] border-none hover:bg-[#382b5b]"
                >
                  Delete
                </button>
              )}
                {user?.id === u.id && (
                <button
                    onClick={() => handleEditClick(u)}
                    className="bg-[#6a5ccc] px-[23px] py-[6px] text-[#FFF] rounded-[5px] border-none hover:bg-[#42397e]"
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
            console.log(updatedUser);
            handleCloseModal();
          }}
        />
      )}
    </div>
  </div>
  </div>
  );
};

