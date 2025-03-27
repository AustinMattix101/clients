import { Dispatch, SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import { DarkMode, Hamburger } from '../';
import { Languages, MenuItems } from "../../assets/components";
import { logo192 } from "../../assets/logo";

import "./NavBar.css";

export interface IHamburger {
    hamburger: boolean;
    setHamburger: Dispatch<SetStateAction<boolean>>;
  }

const NavBar: React.FC = () => {
    const [hamburger, setHamburger] = useState<boolean>(false);
        return (
            <div className="relative flex justify-center items-center">
                <nav className='navbar flex items-center justify-between shadow shadow-2xl'>
                    <div>
                        <NavLink to="/" className={({isActive}) => (
                            isActive ? 'link active' : 'link'
                            )}>
                             <img className="scale-up-center Nav-logo__img" src={logo192} width={36} height={36} alt="Logo" />
                        </NavLink>
                    </div>

                    <div className="hidden md:block">
                        <ul className="flex justify-center items-center ml-4"> 
                            <MenuItems />
                        </ul>
                    </div>
                    
                    <div className="hidden md:block"><Languages /></div>

                    <div className="scale-up-center md:hidden text-center"><span className="font-bold ml-10 mx-7 baseline text-2xl uppercase">Mattix</span></div>

                    <div className="hidden md:block"><DarkMode id={"darkmode-checkbox"} htmlFor={"darkmode-checkbox"}/></div>

                    <div className="scale-up-center md:hidden rounded-2xl"><Hamburger hamburger={hamburger} setHamburger={setHamburger}/></div>
                </nav>
                {
                    hamburger && 
                    <div className="md:hidden">
                        <ul id="menu" className="scale-up-center flex flex-col absolute rounded-2xl border items-center self-end  py-4 mt-10 space-y-6 font-bold root__background-color sm:w-auto sm:self-center left-6 right-6 drop-shadow-md">
                            <div className="flex">
                                <div><Languages /></div>
                                <DarkMode id={"popup__darkmode-checkbox"} htmlFor={"popup__darkmode-checkbox"}/>
                            </div>
                            <MenuItems />
                        </ul>
                    </div>
                }
            </div>
        );
    }
export default NavBar;
