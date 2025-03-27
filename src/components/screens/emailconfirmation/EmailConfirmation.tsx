import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./EmailConfirmation.css";
import { ErrorAlertDismissible, SuccessAlertDismissible } from "../../assets/components/AlertDismissible";
import { IData } from "..";

const EmailConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fetchEmail = localStorage.getItem("Email") || ``;

    const [email, setEmail] = useState(fetchEmail);

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
    

    const emailconfirmHandler = async (e:any) => {
        e.preventDefault();

        const config = {
            headers: {
               "Content-Type": "application/json" 
            }
        }

        try {

            const { data } = await axios.post("/api/auth/sendconfirmemail", { email }, config);

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
        <div className="emailconfirm-screen">
            <div className="modal position-static d-block pb-3 text-light" tabIndex={-1} role="dialog">
                <div className="modal-dialog pt-5" role="document">
                    <div className="modal-content bg-black bg-opacity-25 rounded-5 shadow border">
                        <div className="modal-header p-5 pb-4 border-bottom-0"> 
                            <h2 className="fw-bold mb-0">Email Confirmation</h2>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={navigateHandler}>
                            </button>
                        </div>
                            {data[0].success && <SuccessAlertDismissible data={data[0]}/>}
                            {errorData[0].error && <ErrorAlertDismissible data={errorData[0]} statusCode= {errorStatusCode}/>}

                        <div className="modal-body p-5 pt-0">
                            <form className="emailconfirm-screen__form" onSubmit={emailconfirmHandler}>

                            <small className="emailconfirm-screen__title text-light">Send an email of tokens which used for email confirmation.</small>

                                <div className="form-floating mt-2 mb-2">
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

                                <div className="text-center mb-3"><button type="button" className="btn btn-outline-light" onClick={emailconfirmHandler}><span>Resend Email</span></button></div>

                                <div>
                                    <button className="w-100 btn btn-lg btn-outline-info" type="submit">Send Email</button>
                                </div>

                                <hr className="my-4"/>

                                <span className="emailconfirm-screen__subtext">Email has sent? Verify Token here...<Link to="/verifyemail" className="emailconfirm-screen__subtext__link">Verify Token</Link>
                                </span>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default EmailConfirmation;