import { useState,  FormEvent } from 'react';
import { UserRole } from '../../utilities/enum';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { changeUserRole } from '../../api/endpoints/user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface EditModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: { username: string; email: string; password: string; role: string }) => void;
}


const EditModal: React.FC<EditModalProps> = ({ user, onClose}) => {
  const { updateUserDetails, fetchUsers } = useUserStore();
  const loggedInUserRole = useAuthStore((state) => state.user?.role);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(user?.role || UserRole.MEMBER);

  if (!user) {
    return null; 
  }

  const handleSave = async () => {
    try {
      await updateUserDetails(user.id, { name, email, ...(password && { password }) });

      if (role !== user.role) {
        await changeUserRole(user.id, role);
      }
      await fetchUsers();

      alert('User updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again.');
    }
  };


  return (
    <div className='absolute top-[0px] bottom-[0px] left-[0px] w-[100%] h-[100%] flex justify-center items-center z-50 bg-[#16223080] bg-opacity-[20px] '>
    <div className="fixed w-[100%] h-[100%] inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FFF] rounded-[12px] w-[500px] p-[30px] shadow-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-[#1e1f1c] mb-[20px] text-center">Edit User</h2>
        <form onSubmit={(e: FormEvent) => e.preventDefault()} className="space-y-[20px]">
          <div>
            <label className="block text-[#1e1f1c] text-[14px] mb-[5px]">Username</label>
            <input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-[12px] py-[8px] border border-[#d1d5db] rounded-[8px] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-[#1e1f1c] text-[14px] mb-[5px]">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-[12px] py-[8px] border border-[#d1d5db] rounded-[8px] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-[#1e1f1c] text-[14px] mb-[5px]">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-[12px] py-[8px] border border-[#d1d5db] rounded-[8px] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-[#1e1f1c] text-[14px] mb-[5px]">Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-[12px] py-[8px] border border-[#d1d5db] rounded-[8px] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              disabled={loggedInUserRole !== UserRole.ADMIN}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="flex justify-between mt-[20px]">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#4CAF50] border-none py-[10px] px-[20px] rounded-[8px] shadow-md hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#45a049]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#EF4444] border-none py-[10px] px-[20px] rounded-[8px] shadow-md hover:bg-[#dc2626] focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default EditModal;
