import React, { useEffect } from "react";

const TableQuiz = (props) => {
    const { listQuiz } = props;

    return (
        <>
            <div style={{ fontWeight: "bold" }}>List Quizzes: </div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz &&
                        listQuiz.map((quiz, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <th>{quiz.id}</th>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() =>
                                                props.handleClickBtnUpdate(quiz)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                props.handleClickBtnDelete(quiz)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listQuiz && listQuiz.length === 0 && (
                        <tr>
                            <td colSpan={4}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default TableQuiz;
