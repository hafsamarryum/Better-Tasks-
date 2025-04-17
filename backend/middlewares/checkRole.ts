import { Request, Response, NextFunction } from "express";

export const checkRole = (roles: ("ADMIN" | "MEMBER")[]) => {
  return (req:Request, res:Response, next:NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    next();
  };
};
