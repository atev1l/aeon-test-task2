import {Dispatch} from "redux";
import {LogsAction, LogsActionTypes} from "../../types/tasks";

export const fetchLogs = () => {
    return async (dispatch: Dispatch<LogsAction>) => {
        fetch('http://82.202.204.94/tmp/test.php')
            .then(response => response.json())
            .then(json => dispatch({type: LogsActionTypes.GET_LOGS, payload: json}))
    }
}
