import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./VerifyEmail.css";
import { ErrorAlertDismissible, SuccessAlertDismissible } from "../../assets/components/AlertDismissible";
import { IData } from "..";

const VerifyEmail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fetchEmail = localStorage.getItem("Email") || ``;

    const [email, setEmail] = useState(fetchEmail);
    const [token, setToken] = useState("");

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
    

    const verifyemailHandler = async (e:any) => {
        e.preventDefault();

        const config = {
            headers: {
               "Content-Type": "application/json" 
            }
        }

        try {

            const { data } = await axios.post("/api/auth/verifyemail", { email, token }, config);

            setData([data]);

            if (data) {
                if (location.state?.from) {
                    navigate(location.state.from);
                } else {
                    navigate("/");
                }
            }
            
        } catch (error:any) {
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

    const navigateHandler = () => {
        navigate("/login");
    }

    return(
        <div className="verifyemail-screen">
            <div className="modal position-static d-block pb-3 text-light" tabIndex={-1} role="dialog">
                <div className="modal-dialog pt-5" role="document">
                    <div className="modal-content bg-black bg-opacity-25 rounded-5 shadow border">
                        <div className="modal-header p-5 pb-4 border-bottom-0"> 
                            <h2 className="fw-bold mb-0">Verify Email Token</h2>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={navigateHandler}>
                            </button>
                        </div>
                            {email}
                            {data[0].success && <SuccessAlertDismissible data={data[0]}/>}
                            {errorData[0].error && <ErrorAlertDismissible data={errorData[0]} statusCode= {errorStatusCode}/>}

                        <div className="modal-body p-5 pt-0">
                            <form className="verifyemail-screen__form" onSubmit={verifyemailHandler}>

                            <small className="verifyemail-screen__title text-light">Verify tokens which used for email confirmation.</small>

                                {/* <div className="form-floating mt-2 mb-2">
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
                                    <label htmlFor="email">Email Address</label>
                                </div> */}

                                <div className="form-floating mt-2 mb-2">
                                    <input 
                                    type="number" 
                                    required 
                                    id="token"
                                    className="form-control rounded-4 bg-black text-light"
                                    autoComplete="true"
                                    placeholder="123456"
                                    value={token} 
                                    onChange={(e) => setToken(e.target.value)}
                                    />
                                    <label htmlFor="token">Token</label>
                                </div>

                                <div>
                                    <button className="w-100 btn btn-lg btn-outline-info" type="submit">Verify Token</button>
                                </div>

                                <hr className="my-4"/>

                                <span className="verifyemail-screen__subtext">Token has not sent? Send here...<Link to="/emailconfirm" className="verifyemail-screen__subtext__link">Confirm Email</Link>
                                </span>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default VerifyEmail;