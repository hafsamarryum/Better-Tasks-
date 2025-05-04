import { useState,  FormEvent } from 'react';
import { UserRole } from '../../utilities/enum';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { changeUserRole } from '../../api/endpoints/user';
import { toast } from 'react-toastify';

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
  showDeleteButton: boolean;
}


const EditModal: React.FC<EditModalProps> = ({ user, onClose, showDeleteButton}) => {
  const { updateUserDetails, fetchUsers, deleteUser } = useUserStore();
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

      toast.success('User updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Failed to update user. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };


  return (
    <div className='absolute top-[0px] bottom-[0px] left-[0px] w-[100%] h-[100%] flex justify-center items-center z-50 bg-[#16223080] bg-opacity-[20px] '>
    <div className="fixed w-[100%] h-[100%] inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2992dc] rounded-[12px] w-[350px] p-[20px] shadow-lg text-[#1f2d3d]">
        <h2 className="text-2xl font-semibold text-[#1f2d3d] my-[5px] text-center">Edit User</h2>
        <form onSubmit={(e: FormEvent) => e.preventDefault()} className="space-y-[15px]">
          <div className='flex flex-col gap-[5px]'>
            <label className="block text-[#1f2d3d] text-[16px] mb-[0px] pl-[4px]"><b>Username</b></label>
            <input
              type="text"     
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[325px] px-[12px] py-[8px] border border-[#d1d5db] rounded-[8px] bg-[#d6d2de] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <label className="block text-[#1f2d3d] text-[16px] mb-[0px] pl-[4px]"><b>Email</b></label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[325px] px-[12px] py-[8px] border border-[#d1d5db] bg-[#d6d2de] rounded-[8px] bg-[#] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <label className="block text-[#1f2d3d] text-[16px] mb-[0px] pl-[4px]"><b>Password</b></label>
            <input
              type="password"
              name="password"
              placeholder='******'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[325px] px-[12px] py-[8px] border border-[#d1d5db] rounded-[8px] bg-[#d6d2de] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <label className="block text-[#1f2d3d] text-[16px] mb-[0px] pl-[4px]"><b>Role</b></label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-[350px] px-[12px] py-[8px] border border-[#d1d5db] rounded-[8px] bg-[#d6d2de] text-[#1e1f1c] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              disabled={loggedInUserRole !== UserRole.ADMIN}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="flex justify-between mt-[20px]">
            <div className='flex gap-[4px]'>
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#1f2d3d] border-none py-[10px] text-[#FFF] px-[10px] rounded-[8px] shadow-md hover:bg-[#17222e] focus:outline-none"
            >
              Save Changes
            </button>
            {showDeleteButton && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-[#1f2d3d] border-none py-[10px] px-[20px] text-[#FFF] rounded-[8px] shadow-md hover:bg-[#17222e] focus:outline-none"
                >
                  Delete
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#88569d] border-none py-[10px] px-[20px] text-[#FFF] rounded-[8px] shadow-md hover:bg-[#462c50] focus:outline-none"
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
