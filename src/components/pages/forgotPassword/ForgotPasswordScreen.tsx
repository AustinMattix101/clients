import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./ForgotPasswordScreen.css";
import { ErrorAlertDismissible, SuccessAlertDismissible } from "../../assets/components/AlertDismissible";
import { IData } from "..";

const ForgotPasswordScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");

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
    

    const forgotPasswordHandler = async (e:any) => {
        e.preventDefault();

        const config = {
            headers: {
               "Content-Type": "application/json" 
            }
        }

        try {
            const { data } = await axios.post("/api/auth/forgotpassword", { email }, config);

            setData([data]);
            
        } catch (error:any) {
            setErrorData([error.response.data]);
            setErrorStatusCode(error.response.status);
            setEmail("");
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

    const navigateHandler = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate("/");
        }
    }

    return(
        <div className="forgotpassword-screen">
            <div className="modal position-static d-block pb-3 text-light" tabIndex={-1} role="dialog">
                <div className="modal-dialog pt-5" role="document">
                    <div className="modal-content bg-black bg-opacity-25 rounded-5 shadow border">
                        <div className="modal-header p-5 pb-4 border-bottom-0"> 
                            <h2 className="forgotpassword-screen__title fw-bold mb-0">Forgot Password</h2>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={navigateHandler}>
                            </button>
                        </div>
                            {data[0].success && <SuccessAlertDismissible data={data[0]}/>}
                            {errorData[0].error && <ErrorAlertDismissible data={errorData[0]} statusCode= {errorStatusCode}/>}

                        <div className="modal-body p-5 pt-0">
                            <form className="login-screen__form" onSubmit={forgotPasswordHandler}>

                                <small className="text-light forgotpassword-screen__subtext">Please enter the email address you register your account with. We will send you reset password confirmation to below email.
                                </small>

                                <div className="form-floating mb-3">
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
                                    <label htmlFor="email">Email address</label>
                                </div>

                                <div>
                                    <button className="w-100 btn btn-lg btn-outline-info" type="submit">Send Email</button>
                                </div>

                                <hr className="my-4"/>

                                <span className="forgotpassword-screen__subtext">Already set? Please login here. <Link to="/signin" className="forgotpassword-screen__subtext__link">Login</Link></span>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default ForgotPasswordScreen;