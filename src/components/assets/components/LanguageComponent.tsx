import { useState } from "react";
import { useTranslation } from "react-i18next";

import { LanguagesItems } from ".";
import { GlobeIcon } from "./svg";

const Languages: React.FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const localeToggleHandler = () => {
    setShow(!show);
  }

  return (
    <>
    <div className="scale-up-center container">
        <div className="flex">
            <div className="flex flex-col items-center justify-between ml-2">
                <div className="flex">
                  <button className="m-4 mr-3 drop-shadow-md" type="button" onClick={localeToggleHandler}>
                  <GlobeIcon />
                  </button>
                </div>    
                <div className="flex absolute mt-13 shadow-2xl rounded-2xl">
                  <ul className={(show) ? ("scale-up-center items-center justify-start shadow-2xl rounded-2xl border mt-color-bg-gray") : ("")}>
                    {
                      show && 
                      <div className="mr-8 my-3">
                      <span className="scale-up-center mx-10 font-bold">{t('language')}</span><hr className="scale-up-center mt-2 mx-15 root__background-color"/>
                      <LanguagesItems />
                      </div>
                    }
                  </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Languages;
