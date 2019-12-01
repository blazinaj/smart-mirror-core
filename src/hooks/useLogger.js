//Nik's logger WIP/Testing hooks

import React, {useState} from "react"

export const useLogger = (newLogger = []) => {

    const [logs, setLogs] = useState(newLogger);

    const addLog = (newLog) => {
        let temp = logs;
        temp.push(newLog);
        setLogs(temp);
    };

    return{
        logs,
        addLog
    }

};