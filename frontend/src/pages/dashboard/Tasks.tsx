import { useEffect, useState } from 'react';
import { deleteTask, getAllTasks, getMyTasks, updateTaskStatus } from '../../api/task';
import { useAuthStore } from '../../store/authStore';

type Task = {
  id: string;
  title: string;
  assignee?: {
    name: string;
  };
  status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
  createdBy: string;
};


const Tasks = () => {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'MINE'>('ALL');

  const fetchData = async () => {
    try {
      const taskRes = filter === 'ALL' ? await getAllTasks() : await getMyTasks();
      if (Array.isArray(taskRes.data.tasks)) {
        setTasks(taskRes.data.tasks);
      } else {
        console.error('Invalid response: tasks data is not an array', taskRes.data.tasks);
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleStatusChange = async (id: string, status: string) => {
    await updateTaskStatus(id, status);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <div>
          <button className="mr-2 px-3 py-1 rounded bg-blue-600 text-white" onClick={() => setFilter('ALL')}>All</button>
          <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={() => setFilter('MINE')}>My Tasks</button>
        </div>
      </div>

      <table className="min-w-full bg-white border rounded-lg mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Assignee</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
        {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.assignee?.name}</td>
                <td className="p-3">
                  <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                    <option value="TO_DO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  {(user?.role === 'ADMIN' || task.createdBy === user?.id) && (
                    <button className="bg-yellow-500 px-3 py-1 text-white rounded">Edit</button>
                  )}
                  {user?.role === 'ADMIN' && (
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 px-3 py-1 text-white rounded"
                    >Delete</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-3 text-center">No tasks available</td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default Tasks;