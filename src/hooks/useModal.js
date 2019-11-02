import React, { useState } from "react";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";

/**
 * @description A Custom hook for displaying a Reactstrap Modal. Can be used as a Controlled or Uncontrolled Component.
 * @param body
 * @param header
 * @param button
 * @returns {{display: *, modalButton: *, modalIsOpen, setModalIsOpen}}
 */
export const useModal = (body, header, button) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const display =
        <Modal style={{minWidth: "80vw"}} isOpen={modalIsOpen} toggle={() => setModalIsOpen(!modalIsOpen)}>
            <ModalHeader toggle={() => setModalIsOpen(!modalIsOpen)}>
                {header || "Modal"}
            </ModalHeader>
            <ModalBody>
                {body || <div>🏗️Nothing to see here..🏗️</div>}
            </ModalBody>
        </Modal>;

        const modalButton =
            <>
                {
                    button ?
                        React.cloneElement(button, {onClick: () => setModalIsOpen(!modalIsOpen)})
                        :
                        <Button onClick={() => setModalIsOpen(!modalIsOpen)}>Open Modal</Button>
                }
                {
                    display
                }
            </>;

    return {
        display,
        modalButton,
        modalIsOpen,
        setModalIsOpen
    }

};
