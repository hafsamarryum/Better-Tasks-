import { useState, useEffect, ChangeEvent } from 'react';
import { useUserStore } from '../../store/userStore';
import { createTask } from '../../api/endpoints/task';
import bgImg from '../../assets/images/formBg.jpeg';

interface TaskData {
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
      alert('Title and assignee are required!');
      return;
    }

    try {
      await createTask({
        title: taskData.title,
        description: taskData.description,
        assigneeId: taskData.assignee,
      });
      alert('Task created successfully!');
      setTaskData({ title: '', description: '', assignee: '' });
       console.log("Task Data:", taskData)
    } catch (error) {
      console.error('Error creating task', error);
      alert('Failed to create task');
    }
  };

  return (
    <div className="w-[890px] max-w-2xl mx-auto flex flex-col justify-center items-center p-[10px] bg-[#fefefe]">
      <div className="w-[600px] rounded-[12px] backdrop-blur-md shadow-md mb-[10px] p-[32px] pb-[20px] flex flex-col justify-center items-center border-[#e5e7eb] border-[1px] bg-[rgba(255,255,255,0.6)]">
        <img
          src={bgImg}
          alt="form banner"
          className="w-[600px] h-[200px] object-cover rounded-[12px] mb-[24px]"
        />
        <h1 className="text-[30px] mt-[0px] mb-[24px] text-[#1f2937]">Create a Task</h1>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          className="w-[90%] px-[15px] py-[10px] mb-[10px] border border-[#d1d5db] rounded-[8px] shadow-sm focus:outline-none focus:ring-2 bg-[#ffffff] text-[#111827]"
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          className="w-[90%] px-[16px] py-[12px] mb-[10px] border border-[#d1d5db] rounded-[8px] shadow-sm resize-none focus:outline-none focus:ring-2 bg-[#ffffff] text-[#111827]"
        />

        <select
          name="assignee"
          value={taskData.assignee}
          onChange={handleChange}
          className="w-[95%] px-[16px] py-[10px] mb-[24px] border border-[#d1d5db] rounded-[8px] shadow-sm focus:outline-none focus:ring-2 bg-[#ffffff] text-[#111827]"
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
          className="bg-[#16aa52] text-[#FFFFFF] px-[35px] py-[10px] rounded-[8px] border-none hover:bg-[#0c5d2d] transition duration-200 shadow-md cursor-pointer"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default CreateTasks;

