import "./Login.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../Services/apiServices";
const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleGoToHomePage = () => {
        navigate("/");
    };
    const handleGoToRegisterPage = () => {
        navigate("/register");
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("invalid email");
            return;
        }

        //submit api
        let data = await postLogin(email, password);
        console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/");
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button onClick={() => handleGoToRegisterPage()}>
                    Sign up
                </button>
            </div>
            <div className="title col-3 mx-auto ">Login</div>
            <div className="welcome col-3 mx-auto ">Hello, who’s this?</div>
            <div className="content-form col-3 mx-auto ">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className="forgot-password">Forgot password?</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => handleLogin()}
                    >
                        Login
                    </button>
                </div>
                <div className="back">
                    <span onClick={() => handleGoToHomePage()}>
                        &#60;&#60; Go to HomePage
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
