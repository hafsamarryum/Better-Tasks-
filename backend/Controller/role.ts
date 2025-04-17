import { Request, Response } from "express";
import prisma from "../DB/db.config.js";
import { roleSchema } from "../validations/roleValidation.js";


export const updateRole = async (req: Request, res: Response) => {
  const { error } = roleSchema.validate(req.body);
  if (error) return res.status(400).json({ status: 400, message: error.message });

  const { userId } = req.params;
  const { role } = req.body;

  if (Number(userId) === req.user.id) {
    return res.status(403).json({ message: "You cannot change your own role." });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: Number(userId) },
      data: { role }
    });
    res.status(200).json({ status: 200, message: "User role updated", data: updated });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Error updating role" });
  }
};
