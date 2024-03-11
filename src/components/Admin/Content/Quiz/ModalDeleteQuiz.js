import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../Services/apiServices.js";

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handelSubmitDeleteQuiz = async () => {
        // call api
        let data = await deleteQuizForAdmin(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await props.fetchListQuiz();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this quiz. id :{" "}
                    <b>
                        {/* Luôn kiểm tra trước xem có data không để hạn chế bị lỗi */}
                        {dataDelete && dataDelete.id ? dataDelete.id : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handelSubmitDeleteQuiz}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteQuiz;
