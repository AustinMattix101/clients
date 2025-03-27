import "./Hamburger.css";
import { IHamburger as IProps } from "../navigation/NavBar";

const Hamburger: React.FC<IProps> = ({hamburger, setHamburger}) => {
  
  const HamburgerToggleHandler = (e:any): void => {
    e.preventDefault();
    setHamburger(!hamburger);
  }
  return (
    <>
     <button id="menu-btn" className={(hamburger) ? ("open block hamburger focus:outline-none mx-4 my-3 top-1"): ("block hamburger focus:outline-none mx-4 my-3 top-1")} onClick={HamburgerToggleHandler}>
        <span className="hamburger-top shadow"></span>
        <span className="hamburger-middle shadow"></span>
        <span className="hamburger-bottom shadow"></span>
    </button>
    </>
  )
}

export default Hamburger;