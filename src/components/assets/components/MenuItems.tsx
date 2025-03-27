import { NavLink } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { CHEVRON_DOWN ,CHEVRON_UP } from './svg';

import { INestList } from '../../screens/navigation/NavBar';

const MenuItems: React.FC<INestList> = ({nestListDashboard, setNestListDashboard, nestListService, setNestListService, nestListProduct, setNestListProduct}) => {
    const { t } = useTranslation("navigation");

    const showNestListHandlerService = () => {
      setNestListService(!nestListService);
    }

    const showNestListHandlerDashboard = () => {
      setNestListDashboard(!nestListDashboard);
    }

    const showNestListHandlerProduct = () => {
      setNestListProduct(!nestListProduct);
    }
  return (
    <>
        <li className='scale-up-center m-2 drop-shadow-md font-bold'>
          <NavLink className="link" to="/service">{t('services')}
          </NavLink>
          <span className={(nestListService) ? ('hidden') : ('ml-1 mt-1')}><button className='scale-up-center' onClick={showNestListHandlerService}><CHEVRON_DOWN /></button></span>
          <span className={(nestListService) ? ('ml-1 mt-1') : ('hidden')}><button className='scale-up-center' onClick={showNestListHandlerService}><CHEVRON_UP /></button></span>
        </li>
        
        <li className='scale-up-center m-2 drop-shadow-md font-bold flex items-center'>
          <NavLink className="link" to="/dashboard">{t('dashboard')}
          </NavLink>
          <span className={(nestListDashboard) ? ('hidden') : ('ml-1 mt-1')}><button className='scale-up-center' onClick={showNestListHandlerDashboard}><CHEVRON_DOWN /></button></span>
          <span className={(nestListDashboard) ? ('ml-1 mt-1') : ('hidden')}><button className='scale-up-center' onClick={showNestListHandlerDashboard}><CHEVRON_UP /></button></span>
        </li>

        <li className='scale-up-center m-2 drop-shadow-md font-bold'>
          <NavLink className="link" to="/products">{t('products')}
          </NavLink>
          <span className={(nestListProduct) ? ('hidden') : ('ml-1 mt-1')}><button className='scale-up-center' onClick={showNestListHandlerProduct}><CHEVRON_DOWN /></button></span>
          <span className={(nestListProduct) ? ('ml-1 mt-1') : ('hidden')}><button className='scale-up-center' onClick={showNestListHandlerProduct}><CHEVRON_UP /></button></span>
        </li>

        {!localStorage.getItem("authToken") && <li className='scale-up-center m-2 font-bold rounded-2xl gradient__bar drop-shadow-md'><NavLink className="rounded-2xl mt-color-text" to="/signin"><span className='m-5'>{t('signin')}</span></NavLink></li>}

        {!localStorage.getItem("authToken") && <li className='scale-up-center m-2 font-bold rounded-2xl gradient__border drop-shadow-md'><NavLink className="rounded-2xl gradient__text" to="/signup"><span className='m-5'>{t('signup')}</span></NavLink></li>}
    </>
    )
}
export default MenuItems;