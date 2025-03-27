import { useState, ChangeEventHandler } from "react";
import axios from "axios";
import { ErrorAlertDismissible, SuccessAlertDismissible } from "../../assets/components/AlertDismissible";
import { IData, capitalize } from '..';

const Setting: React.FC = () => {
    const username = localStorage.getItem("Username") || ``;
    const email = localStorage.getItem("Email") || ``;

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

    const storedTwoFA = (localStorage.getItem("TwoFA") === 'true');

    if (storedTwoFA) {
        localStorage.setItem("TwoFA", "true");
    }

    async function TurnONAPI()  {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

        try {
            const {data} = await axios.get("/api/twofa/on", config);

            localStorage.setItem("TwoFA", "true");

            setData([data]);

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

    async function TurnOFFAPI()  {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

        try {
            const {data} = await axios.get("/api/twofa/off", config);

            localStorage.setItem("TwoFA", "false");

            setData(data);

        } catch (error:any) {
            setErrorData(error.response.data);
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

    const toggleTwoFA: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.checked) {
            TurnONAPI();
          } else {
            TurnOFFAPI();
          }
    }
  return (
    <div className="fixed-container">
      <div className="container">
        <div className="App">
            {data[0].success && <SuccessAlertDismissible data={data[0]}/>}
            {errorData[0].error && <ErrorAlertDismissible data={errorData[0]} statusCode= {errorStatusCode}/>}
            <header className='h3'>Welcome, {capitalize(username)}</header>
            <header className='h3'>Welcome, {capitalize(email)}</header>
          <div className="h1">Setting</div>
          <div className="h3">Two Factor Authentication: </div>
            <div className="text-center">
                <div className="checkbox m-2 form-check form-switch">
                    <label className="form-check-label" htmlFor="TwoFA">
                        <input 
                        type="checkbox"
                        role="switch"
                        id="TwoFA"
                        className="form-check-input"
                        onChange={toggleTwoFA}
                        defaultChecked={storedTwoFA}
                        />
                        {(storedTwoFA && <span>ON</span>) || <span>OFF</span>}
                        </label>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Setting;