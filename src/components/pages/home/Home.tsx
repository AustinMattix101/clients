import { useTranslation } from "react-i18next";
import { capitalize } from "../../screens";
import "./Home.css";

const Home: React.FC = () => {
  const username = localStorage.getItem("Username") || ``;
  const email = localStorage.getItem("Email") || ``;

  const { t } = useTranslation();
  function dateTest(date:Date):void{
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();
    console.log("Current Time: "+hours+":"+minutes+":"+seconds); 
  }
  var date=new Date();
  dateTest(date);

  const releaseDate:Date = new Date('2022-10-30');
  const timeDifference = new Date().getDate() - releaseDate.getDate();
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="get__started-bg" id="gst">
              <div className="flex flex-col items-center">
                <header className='h3'>Welcome, {capitalize(username)}</header>
                <header className='h3'>Welcome, {capitalize(email)}</header>
                <header className="font-weight-normal mb-3 h1">{t('welcome_to_mattix')}</header>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Home;
