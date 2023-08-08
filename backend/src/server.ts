import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Express app
const app = express();
import workoutRoutes from "./routes/workouts";

// Middleware
app.use(express.json());
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI ?? "")
    .then(()=>{
        // Listen for requests
        app.listen(process.env.PORT, ()=> {
            console.log("connected to db listening on port 4000");
        });
})
.catch((error)=>console.log(error));