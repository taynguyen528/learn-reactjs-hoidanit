import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../Services/apiServices";
import _ from "lodash";

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, resetUpdateData } = props;

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        resetUpdateData();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state -> Cập nhập thông tin người dùng
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
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

    const handleSubmitCreateUser = async () => {
        //call api
        let data = await putUpdateUser(dataUpdate.id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser();
            // props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(props.currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
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
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                disabled
                                className="form-control"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                // Cần hàm onChange để lấy giá trị nhập vào ô input, nếu không có thì ta không nhập dược vì set giá trị trên useState bằng ''
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                disabled
                                className="form-control"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                id="inputState"
                                className="form-select"
                                onChange={(event) => {
                                    setRole(event.target.value);
                                }}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
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
                        onClick={() => handleSubmitCreateUser()}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateUser;
