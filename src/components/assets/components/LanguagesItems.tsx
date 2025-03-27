import axios from "axios";
import i18next from "i18next";
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ILanguage } from ".";

import 'flag-icons/css/flag-icons.min.css';

const LanguagesItems: React.FC = () => {
  const url:string = "cdn/country-json/language-by-country-code.json";
  
  const [data, setData] = useState<ILanguage["language"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { t } = useTranslation();
  const Languages = data;
  const currentLanguageCode = cookies.get('i18next') || 'en-US';
  const currentLanguage = Languages.find(e => e.code === currentLanguageCode);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
          headers: {
              "Accept": "application/json, text/plain, */*",
              "Content-Type": "application/json"
            },
      }

      setLoading(true);

      try {
          const { data } = await axios.get(url, config);
          setData(data);

      } catch (error) {
          setError(true);
      }

      setLoading(false);
    }

    fetchData();

  }, [url]);

  useEffect(() => {
    document.body.dir = currentLanguage?.dir || 'ltr';
    document.title = t('app_title');
  }, [currentLanguage, t])
  
  function renderItems(): JSX.Element[] {
    return Languages.map(({code, name, country_code}) => (
      <li key={country_code} className="link mb-2">
        <button 
        className="scale-up-center dropdown__item" 
        onClick={() => i18next.changeLanguage(code)} 
        disabled={code === currentLanguageCode}
        >
          <span 
          className={`fi fi-${String(country_code).toLowerCase()} mr-2`}
          style={{ opacity: (code === currentLanguageCode) ? (0.5) : (1)}}
          ></span>
          <span className={(code === currentLanguageCode) ? "link active" : ""}>
            {name}
          </span>
        </button>
        <hr className="mt-1"/>
      </li>
    ));
  }
  return (
    <>
    <div className="mx-3 my-3">
      {loading && <span className="scale-up-center">Loading...</span>}
      {error && <span className="scale-up-center">Something went wrong...</span>}
    </div>
    {!error && renderItems()}
    </>
  );
}

export default LanguagesItems;