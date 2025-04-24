import { Request, Response, NextFunction } from "express";
import { Role } from "../generated/prisma";

export const checkRole = (roles: Role[]) => {
  return (req:Request, res:Response, next:NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    next();
  };
};
