
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

const ModalViewUser = (props) => {
    const { show, setShow, selectUser } = props;
    const handleClose = () => {
        setShow(false);
        // setEmail("");
        // setPassword("");
        // setUsername("");
        // setRole("USER");
        // setImage("");
        // setPreviewImage("");
    };

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [username, setUsername] = useState("");
    // const [role, setRole] = useState("");
    // const [image, setImage] = useState("");
    // const [previewImage, setPreviewImage] = useState("");

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
                    <Modal.Title>View Info User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                disabled
                                className="form-control"
                                value={selectUser.email}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                disabled
                                className="form-control"
                                value={selectUser.password}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                disabled
                                className="form-control"
                                value={selectUser.username}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <input
                                type="text"
                                disabled
                                className="form-control"
                                value={selectUser.role}
                            />
                        </div>

                        <div className="col-md-12 img-preview">
                            {selectUser.image ? (
                                <img
                                    src={`data:image/jpeg;base64,${selectUser.image}`}
                                    alt="User"
                                    className="img-fluid"
                                />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewUser;
