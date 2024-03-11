import React, { useEffect, useState } from "react";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../Services/apiServices";
import "./ManageQuiz.scss";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { getAllQuizForAdmin } from "../../../Services/apiServices";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const ManageQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);

    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});

    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    // useEffect sẽ được chạy sau khi hàm return được chạy -> hạn chế lỗi tối đa
    // ComponentDidMount
    useEffect(() => {
        fetchListQuiz();
    }, []);

    const fetchListQuiz = async () => {
        setDataDelete({});
        setDataUpdate({});
        let res = await getAllQuizForAdmin();
        if (res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error("Name/Description is required");
            return;
        }
        let res = await postCreateNewQuiz(
            description,
            name,
            type?.value,
            image
        );
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setImage(null);
            fetchListQuiz();
        } else {
            toast.error(res.EM);
        }
    };

    const handleClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    };

    const handleClickBtnUpdate = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    };

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">
                                    Add new quiz:
                                </legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your quiz name"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="description"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                    />
                                    <label>Description</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type.."}
                                    />
                                </div>
                                <div className="more-actions">
                                    <label className="form-label">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) =>
                                            handleChangeFile(event)
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="list-detail">
                <TableQuiz
                    listQuiz={listQuiz}
                    handleClickBtnDelete={handleClickBtnDelete}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    fetchListQuiz={fetchListQuiz}
                />
            </div>
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
            />
        </div>
    );
};

export default ManageQuiz;
