import { Router } from "express";
import { login, me, signup } from "../Controller/auth.js";
import authMiddleware from "../middlewares/auth.js";


const authRoutes:Router = Router()

authRoutes.post('/signup', signup as any)
authRoutes.post('/login', login as any)
authRoutes.get('/me', [authMiddleware as any],  me as any)

export default authRoutes 