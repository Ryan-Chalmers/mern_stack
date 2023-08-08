import { createContext, useReducer } from "react";
import { IWorkout } from "../Interfaces/workout";

// The state of Context
type State = {
    workouts: IWorkout[]
}

// The actions for updating state
type Action =
 | { type: "SET_WORKOUTS", payload: IWorkout[] }
 | { type: "CREATE_WORKOUT", payload: IWorkout }
 | { type: "DELETE_WORKOUT", payload: IWorkout }

// Props for the children of the wrapper
type Props = {
    children: JSX.Element,
}

// The context state and dispatcher function
type Context = {
    state: State,
    dispatch: React.Dispatch<Action>,
}

// Defining the context
export const WorkoutsContext = createContext<Context | null>( null );

// Reducer function to take Actions and convert them to States
export const WorkoutsReducer = (state: State, action: Action)=>{
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((workout) => workout._id != action.payload._id)
            }
        default:
            return state;
    }
}

export const WorkoutsContextProvider = ({children}: Props)=>{
    const [state, dispatch] = useReducer(WorkoutsReducer,{workouts: []})

    return (
        <WorkoutsContext.Provider value={{state,dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}