import "./Home.css";
import { useTranslation } from "react-i18next";
import { capitalize } from "../";

import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from '../../containers';
import { CTA, Brand, Navbar } from '../../screens';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import IPFetch from "./IPFetch";

function dateTest(date: Date): void {
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

const username = localStorage.getItem("Username") || ``;
const email = localStorage.getItem("Email") || ``;

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div id="gst" className="App get__started-bg">
        <div className="App-header">
          <div className="container">
              <div className="flex flex-col items-center">
                <header className='h3'>Welcome, {capitalize(username)}</header>
                <header className='h3'>Welcome, {capitalize(email)}</header>
                <header className="font-weight-normal mb-3 h1">{t('welcome_to_mattix')}</header>
                <p>Let's Build Something amazing with GPT-3 OpenAI. Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p><br/>
                <p>{t('days_since_release', { number_of_days })}</p><br/>
                {/* <IPFetch /> */}
                {/* <Todos /> */}
              </div>
            </div>
          </div>
        <div className="gradient__bg">
          <Navbar />
          <Header />
        </div>
        <Brand />
        <WhatGPT3 />
        <Features />
        <Possibility />
        <CTA />
        <Blog />
        <Footer />
      </div>
    </>
  )
}

export default Home;