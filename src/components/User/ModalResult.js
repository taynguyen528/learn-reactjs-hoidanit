import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;
    const handleClose = () => setShow(false);
    const handleShowAnswer = () => {};

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Total Questions: <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        Total Correct Answers:
                        <b>{dataModalResult.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleShowAnswer()}>
                        Show answers
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalResult;
