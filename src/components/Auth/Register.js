import "./Register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { postRegister } from "../Services/apiServices";

const Register = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleGoToLoginPage = () => {
        navigate("/login");
    };
    const handleGoToHomePage = () => {
        navigate("/");
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }

        if (!password) {
            toast.error("Invalid password");
            return;
        }
        //submit apis

        let data = await postRegister(email, password, userName);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/login");
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="register-container">
            <div className="login-container">
                <div className="header">
                    <span>Already have an account?</span>
                    <button onClick={() => handleGoToLoginPage()}>
                        Log in
                    </button>
                </div>
                <div className="title col-3 mx-auto ">Register</div>
                <div className="welcome col-3 mx-auto ">
                    Get better data with conversational forms, surveys, quizzes
                    & more.
                </div>
                <div className="content-form col-3 mx-auto ">
                    <div className="form-group">
                        <label>Email (*)</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group pass-group">
                        <label>Password (*)</label>

                        <input
                            type={isShowPassword ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                        {isShowPassword ? (
                            <div
                                className="icons-eye"
                                onClick={() => setIsShowPassword(false)}
                            >
                                <FaEye />
                            </div>
                        ) : (
                            <div
                                className="icons-eye"
                                onClick={() => setIsShowPassword(true)}
                            >
                                <FaEyeSlash />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userName}
                            onChange={(event) =>
                                setUserName(event.target.value)
                            }
                        />
                    </div>
                    <div>
                        <button
                            className="btn-submit"
                            onClick={() => handleRegister()}
                        >
                            Create my free account
                        </button>
                    </div>
                    <div className="back">
                        <span onClick={() => handleGoToHomePage()}>
                            &#60;&#60; Go to HomePage
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
