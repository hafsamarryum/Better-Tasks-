import Joi from "joi";
import { Role } from "../generated/prisma";

export const roleSchema = Joi.object({
  role: Joi.string().valid(...Object.values(Role)).required()
});
