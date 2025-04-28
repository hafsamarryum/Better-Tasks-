import { Request, Response } from "express";
import prisma from "../DB/db.config";
import { createTaskSchema, updateStatusSchema, updateTaskSchema } from "../validations/taskValidation";
import { Role } from "../generated/prisma";
import { formatDistanceToNow } from 'date-fns';

  // create
export const createTask = async (req:Request, res:Response) =>{
  try {
    const {error} = createTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({msg: error.message})
    }

      const {title, description, assigneeId} =req.body;
      const task = await prisma.task.create({
        data:{ title, description, assigneeId: Number(assigneeId), createdById: req.user.id}
      });
    await prisma.activity.create({
      data: {
        actorId: req.user.id,
        taskId: task.id,   
        action: "create",     
        payload: {},    
      },
    });

      return res.status(201).json({status: 201, msg: "Task created. ", task})
    
  } catch (error: any) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

 // fetch
export const getAllTasks = async (_req:Request, res:Response) => {
  try {
    const tasks =await prisma.task.findMany({ include: {assignee: true, createdBy: true}});
    return res.status(200).json({status:200, msg: "Successfully fetch all the tasks", tasks})
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
}

 // show
export const getMyTasks = async (req:Request, res:Response) => {
  try {
    const tasks =await prisma.task.findMany({ 
      where: {assigneeId: req.user.id},
      include: {createdBy: true}
    });
    return res.status(200).json({status:200, msg: "Successfully fetch the tasks", tasks})
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch your tasks", error: error.message });
  }
}

 // update task
 export const updateTask = async (req:Request, res:Response) => {
  try {
    const {error} = updateTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({msg: error.message})
    }
    
    const {taskId} = req.params;
    const data  = req.body;
      const oldTask = await prisma.task.findUnique({
        where: { id: Number(taskId) },
      });
  
      if (!oldTask) {
        return res.status(404).json({ msg: "Task not found" });
      }

    const updatedTask = await prisma.task.update({ where: {id: Number(taskId)}, data})
    const payload: Record<string, any> = {};

    if (oldTask.status !== updatedTask.status) {
      payload.status = {
        from: oldTask.status,
        to: updatedTask.status,
      };
    }
    if (oldTask.assigneeId !== updatedTask.assigneeId) {
      payload.assignee = {
        from: oldTask.assigneeId,
        to: updatedTask.assigneeId,
      };
    }
    if (oldTask.title !== updatedTask.title) {
      payload.title = {
        from: oldTask.title,
        to: updatedTask.title,
      };
    }
    if (oldTask.description !== updatedTask.description) {
      payload.description = {
        from: oldTask.description,
        to: updatedTask.description,
      };
    }
     if (Object.keys(payload).length > 0) {
      await prisma.activity.create({
        data: {
          actorId: req.user.id,
          taskId: updatedTask.id,
          action: "update",
          payload,
        },
      });
    }

    return res.status(200).json({status:200, msg: "Task updated successfully", updatedTask})
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch your tasks", error: error.message });
  }
}

  // update task status
export const updateTaskStatus = async (req:Request, res:Response) => {
  try {
    const {error} = updateStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({msg: error.message})
    }
  
    const { taskId } = req.params;
    const { status } = req.body;
    const oldTask = await prisma.task.findUnique({
      where: { id: Number(taskId) },
    });

    if (!oldTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const updateTask = await prisma.task.update({
      where:{ id: Number(taskId)},
      data: {status}
    })
    if (oldTask.status !== updateTask.status) {
      await prisma.activity.create({
        data: {
          actorId: req.user.id,
          taskId: updateTask.id,
          action: "update",
          payload: {
            status: { from: oldTask.status, to: updateTask.status },
          },
        },
      });
    }

    return res.status(200).json({status:200, msg: "Task status updated successfully", updateTask})
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch your tasks", error: error.message });
  }
}

 // delete
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);

    if (req.user.role !== Role.ADMIN) {
      return res.status(403).json({ message: "Only admin can delete tasks" });
    }

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
     
    const deletedAt = formatDistanceToNow(new Date(), { addSuffix: true });;
     // Log delete activity
     await prisma.activity.create({
      data: {
        actorId: req.user.id,
        taskId: task.id,
        action: "delete",
        payload: {},
      },
    });

    await prisma.task.delete({ where: { id: taskId } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};

 // fetch tasks by id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { assignee: true, createdBy: true }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch task", error: err.message });
  }
};

 // upadate assignee
export const updateAssignee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { assigneeId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(assigneeId) } });
    if (!user) return res.status(400).json({ message: "Assignee user not found" });

    const oldTask = await prisma.task.findUnique({ where: { id: Number(id) }, include: { assignee: true }, });
    if (!oldTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTaskAssignee = await prisma.task.update({
      where: { id: Number(id) },
      data: { assigneeId: Number(assigneeId) },
    });

     const assigneeName = user.name;
     const actorName = req.user.name;
     const timestamp = formatDistanceToNow(new Date(), { addSuffix: true });;

    if (oldTask?.assigneeId !== updatedTaskAssignee.assigneeId) {
      await prisma.activity.create({
        data: {
          actorId: req.user.id,
          taskId: updatedTaskAssignee.id,
          action: "update",
          payload: {
            assignee: `${actorName} assigned task to ${assigneeName} at ${timestamp}` },
        
        },
      });
    }
  
    res.status(200).json({ message: "Assignee updated successfully", task: updatedTaskAssignee });
  } catch (error) {
    console.error("Update assignee error:", error);
    res.status(500).json({ message: "Failed to update assignee", error });
  }
};

 // task activity log
export const getActivitiesForTask  = async (req: Request, res: Response) => {
  const taskId = Number(req.params.taskId);
  try {
    const activities = await prisma.activity.findMany({
      where: { taskId },
      include: { actor: {
        select: { id: true, name: true, email: true, },
      },},
      orderBy: { createdAt: "desc" },
    });
   return res.status(200).json({data: activities});

  } catch (error) {
    console.error("error",error);
   return res.status(500).json({ message: "Failed to fetch task activity"});
  }
}