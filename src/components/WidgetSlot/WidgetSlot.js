/** WIP - DO NOT USE
 * Author: Jacob Blazina
 *
 * Description: Playing around with generic, moveable, and resizeable widget slots
 */

import React from "react";
import PropTypes from "prop-types";
import Draggable from 'react-draggable';
import {Card, CardBody, CardHeader} from "reactstrap";
import { Resizable, ResizableBox } from 'react-resizable';
import './css/styles.css';
import './css/test.css';

const WidgetSlot = (props) => {

    return (
        <Draggable
            bounds=".bounds"
            axis="both"
            handle=".handle"
            defaultPosition={{x: 50, y: 50}}
            position={null}
            grid={[25, 25]}
            scale={1}
        >
            <ResizableBox
                style={{backgroundColor: "white"}}
                width={20}
                height={20}
                //draggableOpts={{...}}
               // minConstraints={[100, 100]}
               // maxConstraints={[300, 300]}
            >

            {
                props.enableEdits ?
                    <Card>
                        <CardHeader className="handle">
                            Edit Widget
                        </CardHeader>
                        <CardBody>
                            {
                                props.widget || props.children
                            }
                        </CardBody>
                    </Card>
                    :
                    props.widget || props.children
            }
            </ResizableBox>
        </Draggable>
    )

};

WidgetSlot.propTypes = {
    widget: PropTypes.func,
    enableEdits: PropTypes.bool
};

WidgetSlot.defaultProps = {
    enableEdits: false
};

export default WidgetSlot;