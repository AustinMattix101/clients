import { useState, useEffect, ChangeEventHandler, useReducer, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GitHubIcon, TwitterIcon, FacebookIcon, GoogleIcon } from "../../assets/components/svg";
import { ErrorAlertDismissible, SuccessAlertDismissible } from "../../assets/components/AlertDismissible";
import { IData, capitalize } from "..";
import "./SigninScreen.css";
import {VALIDATE_INITIAL_STATE, VALIDATE_ACTIONS, ValidateReducer } from "./validateReducer";

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const storedRemember = (localStorage.getItem("remember") === 'true');
    const fetchEmail = localStorage.getItem("Email") || ``;
    const initEmail = storedRemember ? fetchEmail : ``;
    const fetchUsername = localStorage.getItem("Username") || ``;

    if (storedRemember) {
        localStorage.setItem("remember", "true");
    }

    const [state, dispatch] = useReducer(ValidateReducer, VALIDATE_INITIAL_STATE)
    const inputRef = useRef<any>();

    const [passwordType, setPasswordType] = useState("password");

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
        const value = inputRef.current.value;
        if (!value) {
            inputRef.current.focus();
            inputRef.current.value = initEmail;
            state.email = initEmail;
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initEmail]);
    

    useEffect(() => {
      if (localStorage.getItem("authToken")) {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate("/");
        }
      }
    }, [navigate, location.state?.from]);
    
    const handleLocalStorage = () => {
        window.dispatchEvent(new Event("login"));
      };

    const loginHandler = async (e:any) => {
        e.preventDefault();

        const email = state.email;
        const password = state.password;

        const config = {
            headers: {
               "Content-Type": "application/json" 
            }
        }

        try {

            const { data } = await axios.post("/api/auth/login", { email, password}, config);

            console.log(data);

            const theme = localStorage.getItem("theme"); 

            const user = [{
                ...data.data,
                token: data.token,
                remember: storedRemember,
                theme
            }];

            localStorage.setItem("user", JSON.stringify(user));

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("Username", data.data.username);
            localStorage.setItem("Email", data.data.email);
            
            setData([data]);

            if(data) {
                handleLocalStorage();

                if (location.state?.from) {
                    navigate(location.state.from);
                } else {
                    navigate("/");
                }
            }

        } catch (error:any) {
            const forbidden = (error.response.status === 403);
            if (forbidden) {
                localStorage.setItem("Email", state.email);
                navigate("/emailconfirm");
            }
            setErrorData([error.response.data]);
            setErrorStatusCode(parseInt(error.response.status));
            setData([{
                success: false,
                status: "INITIALLED",
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

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        dispatch({ type: VALIDATE_ACTIONS.VALIDATE_INPUT, payload: {name: e.target.name, value: e.target.value}});
    }

    console.log(state);

    const togglePassword = async () => {
        if(passwordType === "password")
        {
        setPasswordType("text");
         return;
        }
        setPasswordType("password");
    }

    const navigateHandler = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate("/");
        }
    }

    const toggleRemember: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.checked) {
            localStorage.setItem("remember", "true");
          } else {
            localStorage.setItem("remember", "false");
          }
    }

    return(
        <div className="login-screen">
            <div className="modal position-static d-block pb-3 text-light" tabIndex={-1} role="dialog">
                <div className="modal-dialog pt-5" role="document">
                    <div className="modal-content bg-black bg-opacity-25 rounded-5 shadow border">
                        <div className="modal-header p-5 pb-4 border-bottom-0"> 
                            <h2 className="fw-bold mb-0">Sign in</h2>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={navigateHandler}>
                            </button>
                        </div>
                            {fetchUsername && <p className='h4 text-center'>Welcome, {capitalize(fetchUsername)}</p>}
                            {data[0].success && <SuccessAlertDismissible data={data[0]}/>}
                            {errorData[0].error && <ErrorAlertDismissible data={errorData[0]} statusCode= {errorStatusCode}/>}

                        <div className="modal-body p-5 pt-3">
                            <form className="login-screen__form" onSubmit={loginHandler}>

                                <div className="form-floating mb-2">
                                    <input 
                                    ref={inputRef}
                                    type="email" 
                                    required 
                                    id="email"
                                    className="form-control rounded-4 bg-black text-light"
                                    autoComplete="true"
                                    placeholder="example@example.com"
                                    name={"email"} 
                                    onChange={handleChange}
                                    />
                                    <label htmlFor="email">Email address</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input 
                                    type={passwordType} 
                                    required 
                                    id="password"
                                    className="form-control rounded-4 bg-black text-light" placeholder="Password"
                                    name={"password"} 
                                    onChange={handleChange}
                                    />
                                    <label htmlFor="password">Password
                                    </label>
                                    <Link to="/forgotpassword" className="login-screen__forgotpassword" tabIndex={4}>Forgot your password?</Link>
                                </div>

                                <div className="text-center mb-3"><button type="button" className="btn btn-outline-light" onClick={togglePassword}><span>Show Password</span></button></div>

                                <div>
                                    <button className="w-100 btn btn-lg btn-outline-warning" type="submit">Sign in</button>
                                </div>

                                <div className="text-center">
                                    <div className="checkbox m-2 form-check form-switch">
                                        <label className="form-check-label" htmlFor="rememberme">
                                            <input 
                                            type="checkbox"
                                            role="switch"
                                            id="rememberme"
                                            className="form-check-input"
                                            onChange={toggleRemember}
                                            defaultChecked={storedRemember}
                                            />
                                            Remember me!
                                        </label>
                                    </div>
                                </div>

                                <small className="text-light">By clicking Sign in, you agree to the terms of use.</small>
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

                                <span className="login-screen__subtext">Don't have an account? <Link to="/signup" className="login-screen__subtext__link">Sign up</Link>
                                </span>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default LoginScreen;