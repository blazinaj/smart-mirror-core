import React, { useState, useEffect, useCallback } from "react";
import {ListGroup, ListGroupItem} from "reactstrap";

export const useLogger = (initialLogs = []) => {

    const [logs, setLogs] = useState(initialLogs);

    const addLog = (log) => {
        setLogs(logs => [...logs, log]);
        console.log(log);
    };

    const display =
        <ListGroup>
            {
                logs.map((log, index) =>
                    <ListGroupItem key={index}>
                        {log}
                    </ListGroupItem>
                )
            }
        </ListGroup>;

    return {
        addLog,
        display
    }

};