import { NavLink } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const MenuItems: React.FC = () => {
    const { t } = useTranslation("navigation");
  return (
    <>
        <li className='scale-up-center m-1 font-bold'><NavLink className="link" to="/profile">{t('profile')}</NavLink></li>
        <li className='scale-up-center m-1 font-bold'><NavLink className="link" to="/dashboard">{t('dashboard')}</NavLink></li>
        <li className='scale-up-center m-1 font-bold'><NavLink className="link" to="/setting">{t('setting')}</NavLink></li>
        <li className='scale-up-center m-1 font-bold'><NavLink className="link" to="/about">{t('about')}</NavLink></li>
        <li className='scale-up-center m-1 font-bold'><NavLink className="link" to="/products">{t('products')}</NavLink></li>
        <li className='scale-up-center m-1 font-bold'><NavLink className="link" to="/signin">{t('signin')}</NavLink></li>
        <li className='scale-up-center m-1 font-bold'><NavLink className="link" to="/signup">{t('signup')}</NavLink></li>
    </>
    )
}
export default MenuItems;