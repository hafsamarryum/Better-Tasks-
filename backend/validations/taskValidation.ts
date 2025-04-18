import Joi from "joi";
import { TaskStatus } from "../generated/prisma";

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  assigneeId: Joi.number().required()
});

export const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  assigneeId: Joi.number()
});

export const updateStatusSchema =  Joi.object({
  status: Joi.string().valid(...Object.values(TaskStatus)).required()
});
