import { HTMLAttributes } from "react";
import { IWorkout } from "../Interfaces/workout";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface IProps extends HTMLAttributes<HTMLElement> {
    workout: IWorkout;
}

const WorkoutDetails = ({workout}: IProps)=>{
    const {dispatch} = useWorkoutsContext();

    const handleClick = async ()=>{
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE"
        });
        const json = await response.json();

        if(response.ok){
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }

    return (<div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (Kg): </strong>{workout.load}</p>
        <p><strong>Reps (Kg): </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
    )
}

export default WorkoutDetails;