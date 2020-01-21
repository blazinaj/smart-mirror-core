import React from "react";
import PropTypes from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";

const CommandArray = (props) => {

    const commands = props.commandArray;

    return (
        <>
            <ListGroup style={{background: "black", color: "white"}}>
                <h3>Current Commands</h3>
                {
                    commands.map((command, index) =>
                        <ListGroupItem key={index} style={{background: "black", color: "white"}}>
                            {JSON.stringify(command.command)}
                        </ListGroupItem>
                    )
                }
            </ListGroup>
        </>
    )

};

CommandArray.propTypes = {
    commandArray: PropTypes.array.isRequired
};

CommandArray.defaultProps = {
    commandArray: []
};

export default CommandArray;