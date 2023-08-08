import {Schema, model} from "mongoose";

// Workout Interface
interface IWorkout {
    title: string;
    reps: number;
    load: number;
}

// Workout Schema
const workoutSchema = new Schema<IWorkout>({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

// Workout Model
const Workout = model<IWorkout>("Workout", workoutSchema);

export default Workout;