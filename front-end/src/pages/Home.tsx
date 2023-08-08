import {useEffect} from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
const Home = () => {

    const {state, dispatch} = useWorkoutsContext();

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts");
            const json = await response.json();

            if(response.ok){
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }

        fetchWorkouts();
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {state.workouts && state.workouts.map((workout)=> (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;