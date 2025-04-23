import express, {Express} from "express";
const app:Express = express();
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import roleRoutes from "./routes/role.js";

dotenv.config();
const PORT = process.env.PORT || 8000;


const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', router);

app.listen(PORT,()=> {
  console.log(`Server start at port no : ${PORT}`);
})