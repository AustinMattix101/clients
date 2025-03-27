import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Game } from '../../screens';
import { capitalize, clearLSItem } from '..';
import { useTranslation } from 'react-i18next';

const DashboardScreen: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState("");
    const [privateMessage, setPrivateMessage] = useState("");

    const handleLocalStorage = () => {
      window.dispatchEvent(new Event("logout"));
    };

    useEffect(() => {

      if (!JSON.parse(localStorage.getItem("user") || ``)[0]["token"]) {
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/signin");
        }
      }

      const fetchPrivateData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

        try {
            const {data} = await axios.get("/api/private", config);
            setPrivateMessage(data.message);
        } catch (error) {
            localStorage.removeItem("authToken");
            setError("You are not authorized please login!");
        }
      }

      fetchPrivateData();

    }, [navigate, location.state?.from]);
    
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("TwoFA");
        clearLSItem('user', 0, 'token');
        //localStorage.removeItem("user"); // Break out
        navigate("/")
        handleLocalStorage();
    }
    const username = localStorage.getItem("Username") || ``;
    const email = localStorage.getItem("Email") || ``;

  return error ? ( <span className="error-message">{error}</span>
  ) : (
    <div className="fixed-container">
      <div className="App">
          <header className="App-header">
              <p className='h3'>Welcome, {capitalize(username)}</p>
              <p className='h3'>Email: {capitalize(email)}</p>
              <p className='text-uppercase agis-bold mt-2'>{t("mattix")}<br/>
                <code className='text-lowercase'>mattix.com</code>
              </p>
              <a
              className="App-link mb-4 text-decoration-none"
              href="https://camunited.000webhostapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to previous version@1.0
            </a>
            <Game />
            <Link to="/dashboard/stat">Stat</Link>
            <section className="section">
              <Outlet />
            </section>
            <div style={{background: "green", color: "white"}}> {privateMessage}</div>
            <button onClick={logoutHandler}>Log out</button> 
        </header>
      </div>
    </div>
    );
}


export default DashboardScreen;