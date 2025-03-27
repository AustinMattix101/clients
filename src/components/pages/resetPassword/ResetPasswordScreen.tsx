import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import "./ResetPasswordScreen.css";
import { ErrorAlertDismissible, SuccessAlertDismissible } from "../../assets/components/AlertDismissible";
import { IData } from "..";

const ResetPasswordScreen: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

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

    const { resetToken } = useParams();

    async function resetPasswordHandler(e: any) {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setErrorData([{
                    status: "FAILED",
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
            const { data } = await axios.put(
                `/api/auth/resetpassword/${resetToken}`,{ password:password }
                ,
                config);

            setData([data]);

        } catch (error: any) {
            setErrorData([error.response.data]);
            setErrorStatusCode(error.response.status);
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

    return(
        <div className="resetpassword-screen">
            <div className="modal position-static d-block pb-3 text-light" tabIndex={-1} role="dialog">
                <div className="modal-dialog pt-4" role="document">
                    <div className="modal-content bg-black bg-opacity-25 rounded-5 shadow border">
                        <div className="modal-header p-5 pb-0 border-bottom-0"> 
                            <h2 className="resetpassword-screen__title fw-bold mb-3">{t("mattix")}Reset Password</h2>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={navigateHandler}>
                            </button>
                        </div>
                            {data[0].success && <SuccessAlertDismissible data={data[0]}/>}
                            {errorData[0].error && <ErrorAlertDismissible data={errorData[0]} statusCode= {errorStatusCode}/>}
                        <div className="modal-body p-5 pt-0">
                            <form className="resetpassword-screen__from bg-transparent" onSubmit={resetPasswordHandler}>

                                <small className="resetpassword-screen__subtext text-light">Please enter the new password to your given account.
                                </small>

                                <div className="form-floating mb-2 mt-1">
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

                                <div>
                                    <button className="w-100 btn btn-lg btn-outline-info" type="submit">Reset Password</button>
                                </div>

                                <hr className="my-4"/>

                                <span className="resetpassword-screen__subtext">Already set? Please login here. <Link to="/signin" className="forgotpassword-screen__subtext__link">Login</Link></span>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default ResetPasswordScreen;