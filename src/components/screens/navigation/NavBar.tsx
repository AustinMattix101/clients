import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { DarkMode, Hamburger } from '../';
import { Languages, MenuItems } from "../../assets/components";
import { logo192 } from "../../assets/logo";
import { userProfile } from "../../assets/img";

import "./NavBar.css";
import { useFetchPrivateData } from "../../../hooks";
import useComponentVisible from "../../../hooks/useComponentVisible";

export interface IHamburger {
    hamburger: boolean;
    setHamburger: Dispatch<SetStateAction<boolean>>;
  }

export interface INestList {
    nestListDashboard: boolean;
    setNestListDashboard: Dispatch<SetStateAction<boolean>>;
    nestListService: boolean;
    setNestListService: Dispatch<SetStateAction<boolean>>;
    nestListProduct: boolean;
    setNestListProduct: Dispatch<SetStateAction<boolean>>;
  }

interface IAPA {
    apa: {
        default_url: string;
        url?: string;
    }[]
}

const NavBar: React.FC = () => {
    const { data, error , loading } = useFetchPrivateData("api/profile");
    // console.log("Data: ", data.data);
    const profile = { ...data.data };
    console.log("Image: ", profile.image);
    const { ref: refHamburger, isVisible: hamburger, setIsVisible: setHamburger  } = useComponentVisible(false);
    
    const [alert, setAlert] = useState<boolean>(false);
    const [alert2, setAlert2] = useState<boolean>(false);
    const [user, setUser] = useState<boolean>(false);
    const [nestListDashboard, setNestListDashboard] = useState<boolean>(false);
    const [nestListService, setNestListService] = useState<boolean>(false);
    const [nestListProduct, setNestListProduct] = useState<boolean>(false);
    const [getAccountProfile, setgetAccountProfile] = useState<boolean>(false);

    async function getAccountProfileHandler () {
        setgetAccountProfile(!getAccountProfile);
    }

    // useEffect(() => {
    //     setAPA([{
    //         default_url: `http://127.0.0.1:5000/cdn/square/user-profile-icon.png`,
    //         url: data[0].data.image,
    //     }]);
    //     console.log(apa);
    // }, [data]);
    

    // useEffect(() => {
    //     async function getImageUrl() {
    //         setLoading(true);

    //         try {
    //             const { data } = useFetchPrivateData("api/profile");
    //             alert(data);
    //             setAPA([{
    //                     default_url: `http://127.0.0.1:5000/cdn/square/user-profile-icon.png`,
    //                     url: data.data.image,
    //                 }]);
    //         } catch (error:any) {
    //             setError(true);
    //             setAPA([{
    //                 default_url: `http://127.0.0.1:5000/cdn/square/user-profile-icon.png`,
    //                 url: `http://127.0.0.1:5000/cdn/square/user-profile-icon.png`,
    //             }]);
    //             setTimeout(() => {
    //                 setError(false);
    //             }, 5000);
    //         }
    //         setLoading(false);
    //     }
    //     getImageUrl();

    // }, []);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            setUser(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("login", () => {
            setUser(!user);

            setAlert(true);
            setTimeout(() =>{
                setAlert(false);
            }, 5000);
        });

        window.addEventListener("logout", () => {
            setUser(!user);

            setAlert2(true);
            setTimeout(() =>{
                setAlert2(false);
            }, 5000);
        });
        // return () => {
        //     document.removeEventListener("storage", () => { console.log('Event Killed!') });
        // };
    }, [user]);
    
    
    const { t:tNavBar } = useTranslation("navigation");

        return (
            <div ref={refHamburger} className="relative flex justify-center items-center">
                <nav className='navbar flex items-center justify-between shadow shadow-2xl drop-shadow-xl'>
                    <div className="scale-up-center drop-shadow-md hover:drop-shadow-xl">
                        <NavLink to="/" className={({isActive}) => (
                            isActive ? 'link active' : 'link'
                            )}>
                             <img className="Nav-logo__img" src={logo192} width={38} height={38} alt="Logo" />
                        </NavLink>
                    </div>

                    <div className="hidden md:block">
                        <ul className="flex justify-center items-center"> 
                            <MenuItems nestListDashboard={nestListDashboard} setNestListDashboard={setNestListDashboard} nestListService={nestListService} setNestListService={setNestListService} nestListProduct={nestListProduct} setNestListProduct={setNestListProduct}/>
                        </ul>
                    </div>
                    
                    <div className="hidden md:block"><Languages /></div>

                    <div className="scale-up-center user-select-none text-center md:hidden"><span className="font-bold ml-10 mx-7 baseline text-2xl uppercase">Mattix</span></div>

                    <div className="hidden md:block drop-shadow-md"><DarkMode id={"darkmode-checkbox"} htmlFor={"darkmode-checkbox"}/></div>

                    <div className="scale-up-center md:hidden rounded-2xl"><Hamburger hamburger={hamburger} setHamburger={setHamburger}/></div>
                    
                    <div className="scale-up-center">
                        {loading && <span className="scale-up-center">Loading...</span>}
                        {error && <span className="scale-up-center">Something went wrong...</span>}
                        {
                        (!error && user) &&
                        <button className="mt-1 hover:drop-shadow-xl" onClick={getAccountProfileHandler}>
                            <img src={profile.image} height={40} width={40} alt="Account" className="rounded-full mr-2 drop-shadow-md"/>
                        </button>
                        }
                    </div>
                </nav>
                {
                    hamburger && 
                    <div className="md:hidden scale-up-center flex flex-col fixed w-1/2 left-1/4 top-7 mt-10 items-center">
                        <ul id="menu" className="py-4 space-y-6 font-bold root__background-color sm:w-auto sm:self-center drop-shadow-md rounded-3xl border">
                            <div className="rounded-2xl mr-7"><DarkMode id={"popup__darkmode-checkbox"} htmlFor={"popup__darkmode-checkbox"}/></div>
                            <MenuItems nestListDashboard={nestListDashboard} setNestListDashboard={setNestListDashboard} nestListService={nestListService} setNestListService={setNestListService} nestListProduct={nestListProduct} setNestListProduct={setNestListProduct}/>
                        </ul>
                    </div>
                }

                {   
                    nestListDashboard && 
                    <div className="scale-up-center flex flex-col fixed w-1/2 left-1/4 top-8 mt-10 items-center rounded-xl root__background-color">
                        <span className="scale-up-center my-2 font-bold code user-select-none">{tNavBar('dashboard')}</span>
                        <button className="scale-up-center my-2 font-bold code bg-brightRed text-white rounded-full hover:bg-brightRedLight" onClick={() => setNestListDashboard(!nestListDashboard)}><span className="m-2">Close</span></button>
                        <div className="flex">
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                        </div>
                    </div> 
                }

                {   
                    nestListService && 
                    <div className="scale-up-center flex flex-col fixed w-1/2 left-1/4 top-8 mt-10 items-center rounded-xl root__background-color">
                        <span className="scale-up-center my-2 font-bold code user-select-none">{tNavBar('services')}</span>
                        <button className="scale-up-center my-2 font-bold code bg-brightRed text-white rounded-full hover:bg-brightRedLight" onClick={() => setNestListService(!nestListService)}><span className="m-2">Close</span></button>
                        <div className="flex">
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                        </div>
                    </div> 
                }

                {   
                    nestListProduct &&  
                    <div className="scale-up-center flex flex-col fixed w-1/2 left-1/4 top-8 mt-10 items-center rounded-xl root__background-color">
                        <span className="scale-up-center my-2 font-bold code user-select-none">{tNavBar('products')}</span>
                        <button className="scale-up-center my-2 font-bold code bg-brightRed text-white rounded-full hover:bg-brightRedLight" onClick={() => setNestListProduct(!nestListProduct)}><span className="m-2">Close</span></button>
                        <div className="flex">
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                            <ul className='scale-up-center flex flex-col App-link link rounded-2xl'>
                                <li><NavLink className="link" to="/dashboard/stat">Stat</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">F@ck</NavLink></li>
                                <li><NavLink className="link" to="/dashboard/stat">Love</NavLink></li>
                            </ul>
                        </div>
                    </div> 
                }

                {
                    getAccountProfile &&
                    <div className="scale-up-center flex flex-col fixed w-1/2 left-1/4 top-7 mt-10 items-center rounded-xl root__background-color">
                        <span className="scale-up-center my-2 font-bold code user-select-none">{tNavBar('accounts')}</span>
                        <div className="flex flex-col">
                            <div className='scale-up-center m-2 drop-shadow-md font-bold'>
                                <NavLink className="link" to="/setting"><span>{tNavBar('setting')}</span></NavLink>
                            </div>
                        </div>
                    </div>
                }

                {
                    alert &&
                    <div className="scale-up-center flex flex-col fixed w-1/4 left-1/3 top-7 mt-10 items-center rounded-xl mt-color-bg-green">
                        <span className="scale-up-center my-2 font-bold code user-select-none">{"You login successfully!"}</span>
                    </div>
                }

                {
                    alert2 &&
                    <div className="scale-up-center flex flex-col fixed w-1/4 left-1/3 top-7 mt-10 items-center rounded-xl mt-color-bg-green">
                        <span className="scale-up-center my-2 font-bold code user-select-none">{"You logout successfully!"}</span>
                    </div>
                }
            </div>
        );
    }
export default NavBar;
