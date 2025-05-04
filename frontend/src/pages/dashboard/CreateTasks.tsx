import { useState, useEffect, ChangeEvent } from 'react';
import { useUserStore } from '../../store/userStore';
import { createTask } from '../../api/endpoints/task';
import bgImg from '../../assets/images/formTask.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface TaskData {
  id?: string;
  title: string;
  description: string;
  assignee: string;
}

interface User {
  id: string;
  name: string;
}

const CreateTasks = () => {
  const { users, fetchUsers } = useUserStore();
  const Navigate = useNavigate()

  const [taskData, setTaskData] = useState<TaskData>({
    title: '',
    description: '',
    assignee: '',
  });

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  
  const handleCreateTask = async () => {
    if (!taskData.title || !taskData.assignee) {
      toast.warning('Title and assignee are required!');
      return;
    }

    try {
        await createTask({
          title: taskData.title,
          description: taskData.description,
        assigneeId: Number(taskData.assignee),
        });
        toast.success('Task created successfully!');
      setTaskData({ title: '', description: '', assignee: '' });
      setTimeout(() => {
      Navigate('/tasks');
      }, 1000);
    } catch (error) {
      console.error('Error creating task', error);
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="w-[1000px] max-w-2xl mx-auto flex flex-col justify-center items-center p-[10px] bg-[#697e8e] border">
      <div className="w-[600px] rounded-[12px] backdrop-blur-md shadow-md mb-[10px] p-[32px] pb-[20px] flex flex-col justify-center items-center border-[#] bg-[#1f2d3d] bg-opacity-0.5">
        <img
          src={bgImg}
          alt="form banner"
          className="w-[600px] h-[250px] object-cover rounded-[12px] mb-[24px]"
        />
        

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          className="w-[90%] px-[15px] py-[10px] mb-[10px] border border-[#d1d5db] rounded-[8px] shadow-sm focus:outline-none focus:ring-2 bg-[rgba(255,255,255,0.6)] text-[#11182c] placeholder:text-[#11182c]"
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          className="w-[90%] px-[16px] py-[12px] mb-[10px] border border-[#d1d5db] rounded-[8px] shadow-sm resize-none focus:outline-none focus:ring-2 bg-[rgba(255,255,255,0.6)] text-[#11182c] placeholder:text-[#11182c]"
        />

        <select
          name="assignee"
          value={taskData.assignee}
          onChange={handleChange}
          className="w-[95%] px-[16px] py-[10px] mb-[24px] border border-[#d1d5db] rounded-[8px] shadow-sm focus:outline-none focus:ring-2 bg-[rgba(255,255,255,0.6)] text-[#111827]"
        >
          <option value="" disabled>
            Select Assignee
          </option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateTask}
          className="bg-[#2fbecf] text-[#FFFFFF] px-[35px] py-[10px] rounded-[8px] border-none hover:bg-[#1f7984] transition duration-200 shadow-md cursor-pointer"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default CreateTasks;

