export interface logsState {
    logs: any;
}

export enum LogsActionTypes {
    GET_LOGS = "GET_LOGS"
}

interface GetLogsAction {
    type: LogsActionTypes.GET_LOGS;
    payload: any[];
}

export type LogsAction = GetLogsAction
