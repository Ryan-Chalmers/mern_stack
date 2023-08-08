import { Request, Response } from "express";
import {Types} from "mongoose";
import Workout from "../models/workout";
import ensureError from "../utils/errors";

// GET all workouts
export const getWorkouts = async (req: Request, res: Response) => {
    try {
        const workout = await Workout.find({}).sort({createdAt: -1});
        return res.status(200).json(workout);
    } catch (error) {
        const err = ensureError(error);
        return res.status(400).json({error: err.message});
    }
}

// GET a single workout
export const getWorkout = async (req: Request, res: Response) => {
    const {id} = req.params;

    if(!Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }

    try {
        const workout = await Workout.findById(id);
        if(!workout){
            return res.status(404).json({error: "No such workout"});
        } else {
            return res.status(200).json(workout);
        }
        
    } catch (error) {
        const err = ensureError(error);
        return res.status(400).json({error: err.message});
    }
}

// CREATE a new workout
export const createWorkout = async (req: Request, res: Response) => {
    const {title, load, reps} = req.body;

    const emptyFields = [];

    if(!title){
        emptyFields.push("title");
    }
    if(!load){
        emptyFields.push("load");
    }
    if(!reps){
        emptyFields.push("reps");
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try {
        const workout = await Workout.create({title, load, reps});
        return res.status(200).json(workout);
    } catch (error) {
        const err = ensureError(error);
        return res.status(400).json({error: err.message});
    }
}

// UPDATE a workout
export const updateWorkout = async (req: Request, res: Response) => {

    const {id} = req.params;

    if(!Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }

    try {
        const workout = await Workout.findOneAndUpdate({_id: id},{
            ...req.body
        })
        if(!workout) {
            return res.status(404).json({error: "No such workout"});
        } else {
            return res.status(200).json(workout);
        }
    } catch (error) {
        const err = ensureError(error);
        return res.status(400).json({error: err.message});
    }
}

// DELETE a workout
export const deleteWorkout = async (req: Request, res: Response) => {
    const {id} = req.params;

    if(!Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }
    try {
        const workout = await Workout.findOneAndDelete({_id: id});

        if(!workout){
            return res.status(404).json({error: "No such workout"});
        } else {
            return res.status(200).json(workout);
        }
        
    } catch (error) {
        const err = ensureError(error);
        return res.status(400).json({error: err.message});
    }
}