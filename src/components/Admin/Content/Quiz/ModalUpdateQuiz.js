import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateQuizForAdmin } from "../../../Services/apiServices";

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props;
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false);
        setDescription("");
        setName("");
        setDifficulty("EASY");
        setImage("");
        setPreviewImage("");
    };

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state -> Cập nhập thông tin người dùng
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setDifficulty(dataUpdate.difficulty);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const handleSubmitCreateQuiz = async () => {
        // call api
        let data = await putUpdateQuizForAdmin(
            dataUpdate.id,
            name,
            description,
            difficulty,
            image
        );
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
            {/* backdrop="static" : Xử lý người dùng click ra ngoài cũng không đóng modal được */}
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                // backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                // Cần hàm onChange để lấy giá trị nhập vào ô input, nếu không có thì ta không nhập dược vì set giá trị trên useState bằng ''
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select
                                id="inputState"
                                className="form-select"
                                value={difficulty}
                                onChange={(event) => {
                                    console.log(
                                        "Giá trị difficulty đã chọn:",
                                        event.target.value
                                    );
                                    setDifficulty(event.target.value);
                                }}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label
                                className="form-label label-upload"
                                htmlFor="labelUpload"
                            >
                                <FcPlus />
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                hidden
                                id="labelUpload"
                                onChange={(event) => handleUploadImage(event)}
                            ></input>
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? (
                                <img src={previewImage} />
                            ) : (
                                <span>Preview Image</span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleSubmitCreateQuiz()}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateQuiz;
