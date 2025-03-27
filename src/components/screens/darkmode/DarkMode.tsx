import "./DarkMode.css";
import { ChangeEventHandler, useState } from "react";

const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme") || ``;

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const DarkMode: React.FC<any> = ({ id, htmlFor }) => {
  const [darkmode, setDarkMode] = useState(defaultDark);

  const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setDark();
      setDarkMode(true);
    } else {
      setLight();
      setDarkMode(false);
    }
  };
  return (
    <div className="toggle-theme-wrapper scale-up-center">
      <label className="toggle-theme" htmlFor={htmlFor}>
        <input
          type="checkbox"
          id={id}

          // 6
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />
        <div className="slider round"></div>
      </label>
      {darkmode && <span className="moon-toggle">🌒</span>}
      {!darkmode && <span className="sun-toggle">☀️</span>}
    </div>
  );
};

export default DarkMode;