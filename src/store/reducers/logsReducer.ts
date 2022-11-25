import {LogsAction, LogsActionTypes, logsState} from "../../types/tasks";

const initialState: logsState = {
    logs: []
}

export const logsReducer = (state = initialState, action: LogsAction): logsState => {
    switch (action.type){
        case LogsActionTypes.GET_LOGS:
            return {...state, logs: action.payload}
        default:
            return state
    }
}
