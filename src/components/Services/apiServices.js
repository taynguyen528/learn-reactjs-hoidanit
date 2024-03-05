import axios from "axios";
import instance from "../Utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    return instance.post("api/v1/participant", data);
};

const putUpdateUser = (id, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return instance.put("api/v1/participant", data);
};

const getAllUser = () => {
    return instance.get("api/v1/participant/all");
};

const deleteUser = (userID) => {
    return instance.delete("api/v1/participant", { data: { id: userID } });
};

const getUserWithPaginate = (page, limit) => {
    return instance.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (userEmail, userPassword) => {
    return instance.post(`api/v1/login`, {
        email: userEmail,
        password: userPassword,
        delay: "3000",
    });
};

const postRegister = (userEmail, userPassword, usernameUser) => {
    return instance.post(`api/v1/register`, {
        email: userEmail,
        password: userPassword,
        username: usernameUser,
    });
};

// const postLogin1 = (email, password) => {
//     return instance.post(`api/v1/login`, {
//         email,
//         password,
//     });
// };
const getQuizByUser = () => {
    return instance.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
    return instance.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
    return instance.post(`api/v1/quiz-submit`, { ...data });
};

export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
};
