import { Request, Response } from "express";
import prisma from "../DB/db.config";
import { createTaskSchema, updateTaskSchema } from "../validations/taskValidation";
import { Role } from "../generated/prisma";

  // create
export const createTask = async (req:Request, res:Response) =>{
  try {
    const {error} = createTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({msg: error.message})
    }

      const {title, description, assigneeId} =req.body;
      const task = await prisma.task.create({
        data:{ title, description, assigneeId, createdById: req.user.id}
      });
      return res.status(201).json({status: 201, msg: "Task created. ", task})
    
  } catch (error: any) {
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

    const updated = await prisma.task.update({ where: {id: Number(taskId)}, data})
    return res.status(200).json({status:200, msg: "Task updated successfully", updated})
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch your tasks", error: error.message });
  }
}

  // update task status
export const updateTaskStatus = async (req:Request, res:Response) => {
  try {
    const {error} = updateTaskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({msg: error.message})
    }
  
    const { taskId } = req.params;
    const { status } = req.body;

    const updateTask = await prisma.task.update({
      where:{ id: Number(taskId)},
      data: {status}
    })
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