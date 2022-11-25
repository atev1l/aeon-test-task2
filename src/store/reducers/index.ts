import {combineReducers} from "redux";
import {logsReducer} from "./logsReducer";


export const rootReducer = combineReducers({
    data: logsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
