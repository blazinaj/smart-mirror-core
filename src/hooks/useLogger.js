import React, { useState, useEffect, useCallback } from "react";
import {ListGroup, ListGroupItem} from "reactstrap";

export const useLogger = (initialLogs = []) => {

    const [logs, setLogs] = useState(initialLogs);

    const addLog = (log) => {
        setLogs(logs => [...logs, log]);
        console.log(log);
    };

    const display =
        <>
            <h3>Application Logs</h3>
            <ListGroup style={{background: "black", color: "white"}}>
                {
                    logs.map((log, index) =>
                        <ListGroupItem key={index} style={{background: "black", color: "white"}}>
                            {log}
                        </ListGroupItem>
                    )
                }
            </ListGroup>
        </>;

    return {
        addLog,
        display
    }

};