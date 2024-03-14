import Select from "react-select";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getAllQuizForAdmin,
    getAllUser,
    postAssignQuiz,
} from "../../../Services/apiServices";
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    //call api
    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, []);

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let users = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                };
            });
            setListUser(users);
        }
    };

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        console.log("check res: ", res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
    };

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">Select Quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>

            <div className="col-6 form-group">
                <label className="mb-2">Select User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                    className="btn btn-warning mt-3"
                    onClick={() => handleAssign()}
                >
                    Assign
                </button>
            </div>
        </div>
    );
};
export default AssignQuiz;
