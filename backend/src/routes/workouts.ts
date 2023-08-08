import * as express from "express";
import { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } from "../controllers/workout-controller";

const router = express.Router();

// Get all workouts
router.get("/", getWorkouts);

// Get a single workout
router.get("/:id", getWorkout);

// Post a new workout
router.post("/", createWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

export default router;