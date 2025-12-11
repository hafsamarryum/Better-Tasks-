import { useEffect, useState } from "react";
import {deleteTask,getAllTasks,getMyTasks,updateTaskAssignee,updateTaskStatus,} from "../../api/endpoints/task";
import { FilterType, TaskStatus } from "../../utilities/enum";
import axios from "axios";
import "../../index.css";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import TaskDrawer, { Activity } from "./TaskDrawer";
import { UserRole } from "../../utilities/enum";
import { toast } from 'react-toastify';

export type Task = {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assignee?: {  name: string; };
  status?: TaskStatus;
  createdBy: string;
  activities?: Activity[];
};

interface User {
  id: string;
  name: string;
}

const Tasks = () => {
  const {users, fetchUsers } = useUserStore();
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchData = async () => {
    try {
      const taskRes =
        filter === FilterType.ALL ? await getAllTasks() : await getMyTasks();
      if (Array.isArray(taskRes.data.tasks)) {
        setTasks(taskRes.data.tasks);
      } else {
        console.error(
          "Invalid response: tasks data is not an array",
          taskRes.data.tasks
        );
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to fetch tasks. "+ error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  },[users]);

  const handleEdit = (task: Task) => setEditingTask(task);
  const closeDrawer = () => {
    setEditingTask(null);
    fetchData();
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      await updateTaskStatus(id, status);
      fetchData();
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating status:", error.response?.data || error.message);
        toast.error("Failed to update task status.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTask(id);
      toast.success(res.data.message || "Task deleted successfully.");
      fetchData(); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Network error or server is not responding. Please try again later.");
      }
      console.error("Failed to delete task", error);
    }
  };

  const handleAssigneeChange = async (taskId: string, newAssigneeId: string) => {
    try {
      await updateTaskAssignee(taskId, newAssigneeId);
      fetchData(); 
      toast.success("Assignee updated successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update assignee.");
      } else {
        toast.error("Unexpected error while updating assignee.");
      }
      console.error("Assignee update error:", error);
    }
  };
  

  return (
    <div className="w-[890px] py-[20px] px-[60px] flex flex-col justify-center items-center dashBoardImg ">
    <div className="w-full flex flex-col justify-between items-center p-[0px] rounded-[15px] bg-transparent bg-opacity-[0.5] rounded-xl shadow-xl backdrop-blur-[10px]">
      <div className="w-full flex justify-between items-center bg-[#fff5] rounded-tl-[8px] rounded-tr-[8px]">
        <div className="w-[640px] flex justify-center items-center">
        <h1 className="text-2xl mt-[8px] mb-[3px] pl-[10px] text-[#1f2d3d]">TASKS</h1>
        </div>
        <div className="flex gap-[6px] mr-[15px]">
          <button
            className="px-[16px] py-[8px] rounded-[8px] border-none bg-[#6a5ccc] text-[#FFF] hover:bg-[#42397e]"
            onClick={() => setFilter(FilterType.ALL)}
          >
            All Tasks
          </button>
          <button
            className="px-[16px] py-[8px] rounded-[8px] border-none bg-[#6b56b2] text-[#FFF] hover:bg-[#382b5b]"
            onClick={() => setFilter(FilterType.MINE)}
          >
            My Tasks
          </button>
        </div>
      </div>
      <div className="w-[95%] rounded-[12px] p-[15px] pt-[0px] my-[18px] text-[FFF] border-collapse ml-[20px] border-[#223244] overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-[#223244] text-[#FFF]"> 
          <tr className=" text-left">
          <th className="p-[15px] rounded-tl-[12px] rounded-bl-[12px]">Id</th>
            <th className="p-[15px] w-[46%]">Title</th>
            <th className="p-[15px]">Assignee</th>
            <th className="p-[15px]">Status</th>
            <th className="p-[15px] rounded-tr-[12px] rounded-br-[12px]">Actions</th>
          </tr>
        </thead>
        </table>

        <div className="max-h-[300px] overflow-y-auto no-scrollbar">
        <table className="w-full border-collapse text-[#FFF]">
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-[10px] w-[10%] pl-[16px]">{task.id}</td>
                <td className="p-[10px] w-[40%]">{task.title}</td>
                <td className="p-[10px] w-[10%]">
            <select
                name="assigneeId"
                value={task.assigneeId}
                onChange={(e) => handleAssigneeChange(task.id, e.target.value)}
                className="py-[5px] pr-[0px] pl-[5px] rounded-[5px] border-none bg-[#f3f4f6] text-[FFF]"
              >
                <option value="" disabled>Select Assignee</option>
                {users.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </td>

                <td className="p-[10px] w-[10%]">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id,e.target.value as TaskStatus)
                    }
                    className="py-[5px] pr-[0px] pl-[5px] rounded-[5px] border-none bg-[#f3f4f6]"
                  >
                    <option value={TaskStatus.TO_DO}>To Do</option>
                    <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                    <option value={TaskStatus.DONE}>Done</option>
                  </select>
                </td>
                <td className="w-[12%] p-[10px]">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-[20px] py-[5px] rounded-[5px] border-none mr-[6px] border-none bg-[#6a5ccc] text-[#FFF] hover:bg-[#42397e]">
                    Edit
                  </button>
                  {user?.role === UserRole.ADMIN && (
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-[15px] mt-[6px] py-[5px] rounded-[5px] border-none bg-[#6b56b2] text-[#FFF] hover:bg-[#382b5b]">
                      Delete
                    </button>
                   )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-[16px] text-center">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </div>
      </div>
      {editingTask && (
        <TaskDrawer task={editingTask} onClose={closeDrawer} />
      )}
  </div>
  );
};

export default Tasks;
