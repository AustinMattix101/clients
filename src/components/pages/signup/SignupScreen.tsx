import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GitHubIcon, TwitterIcon, FacebookIcon, GoogleIcon } from "../../assets/components/svg";
import { ErrorAlertDismissible, SuccessAlertDismissible } from "../../assets/components/AlertDismissible";
import { IData, capitalize } from "..";
import "./SignupScreen.css";

const RegisterScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [term, setTerm] = useState<any>(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [data, setData] = useState<IData["data"]>([{
        success: false,
        status: "INITIALLED",
        error: "",
        data: {}
    }]);
    const [errorStatusCode, setErrorStatusCode] = useState<IData["statusCode"]>(0);
    const [errorData, setErrorData] = useState<IData["data"]>([{
        success: false,
        status: "INITIALLED",
        error: "",
        data: {}
    }]);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate("/");
            }
        }
    }, [navigate, location.state?.from]);
    

    const registerHandler = async (e:any) => {
        e.preventDefault();

        const config = {
            headers: {
               "Content-Type": "application/json" 
            }
        }

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setErrorData([{
                    status: "",
                    success: false,
                    error: "",
                    data: {}
                }]);
            }, 5000);
            return setErrorData([{
                    status: "FAILED",
                    success: false,
                    error: "Password do not match!",
                    data: {}
                }]);
        }

        try {
            const { data } = await axios.post("/api/auth/register", {username, email, password}, config);

            localStorage.setItem("Username", data.data.username);
            localStorage.setItem("Email", data.data.email);

            setData([data]);

        } catch (error:any) {
            setErrorData([error.response.data]);
            setErrorStatusCode(error.response.status);
            setData([{
                status: "",
                success: false,
                message: "",
                error: "",
                data: {}
            }]);
            setTimeout(() => {
                setErrorData([{
                    status: "",
                    success: false,
                    error: "",
                    data: {}
                }]);
                setErrorStatusCode(0);
            }, 5000);
        }
    }

    const togglePassword = async () => {
        if(passwordType === "password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
    }

    const navigateHandler = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate("/");
        }
    }

    const fetchUsername = localStorage.getItem("Username");

    return(
        <div className="register-screen">
            <div className="modal position-static d-block pb-3 text-light" tabIndex={-1} role="dialog">
                <div className="modal-dialog pt-5" role="document">
                    <div className="modal-content bg-black bg-opacity-25 rounded-5 shadow border">
                        <div className="modal-header p-5 pb-2 border-bottom-0">
                            <h2 className="fw-bold mb-4">Create your account</h2>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={navigateHandler}>
                            </button>
                        </div>
                            {fetchUsername && <p className='h4 text-center'>Welcome, {capitalize(fetchUsername)}</p>}
                            {data[0].success && <SuccessAlertDismissible data={data[0]}/>}
                            {errorData[0].error && <ErrorAlertDismissible data={errorData[0]} statusCode= {errorStatusCode}/>}

                        <div className="modal-body p-5 pt-3">
                            <form className="register-screen__form" onSubmit={registerHandler}>

                                <div className="form-floating mb-2">
                                    <input 
                                    className="form-control rounded-4 bg-black text-light"
                                    type="text" 
                                    required 
                                    id="username" 
                                    placeholder="Username"
                                    autoComplete="true" 
                                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                                    <label 
                                    htmlFor="username">Username</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input 
                                    type="email" 
                                    required 
                                    id="email"
                                    className="form-control rounded-4 bg-black text-light"
                                    autoComplete="true"
                                    placeholder="name@example.com"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label 
                                    htmlFor="email">Email address</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input 
                                    type={passwordType} 
                                    required 
                                    id="password"
                                    className="form-control rounded-4 bg-black text-light" placeholder="Password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label 
                                    htmlFor="password">Password
                                    </label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input 
                                    type="password"
                                    required 
                                    id="confirmpassword" 
                                    className="form-control rounded-4 bg-black text-light" placeholder="Password"
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <label htmlFor="confirmpassword">Confirm Password</label>
                                </div>

                                <div className="text-center mb-3"><button type="button" className="btn btn-warning" onClick={togglePassword}><span>Show Password</span></button></div>

                                <button className="w-100 mb-2 btn btn-lg rounded-4 btn-outline-light" type="submit">Sign up</button>
                                <input type="checkbox" value={term} onChange={(e) => setTerm(e.target.value)}/>
                                <small className="mb-3">
                                    <span>By clicking Sign up, you agree to the terms of use.</span>
                                </small>
                                <hr className="my-4"/>
                                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                                <button className="w-100 py-2 mb-2 btn btn-outline-warning rounded-4" type="submit">
                                    <svg className="bi me-1" width="16" height="16">{<GoogleIcon/>}</svg>
                                    Sign up with Google
                                </button>
                                <button className="w-100 py-2 mb-2 btn btn-outline-light rounded-4" type="submit">
                                    <svg className="bi me-1" width="16" height="16">{<GitHubIcon/>}</svg>
                                    Sign up with GitHub
                                </button>
                                <button className="w-100 py-2 mb-2 btn btn-outline-info rounded-4" type="submit">
                                    <svg className="bi me-1" width="16" height="16">{<TwitterIcon/>}</svg>
                                    Sign up with Twitter
                                </button>
                                <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-4" type="submit">
                                    <svg className="bi me-1" width="16" height="16">{<FacebookIcon/>}</svg>
                                    Sign up with Facebook
                                </button>

                                <span className="register-screen__subtext">Already have an account? <Link className="register-screen__subtext__link" to="/signin">Sign in</Link></span>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RegisterScreen;