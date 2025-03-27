import { lazy } from "react";

const DarkMode = lazy(() => import("./darkmode/DarkMode"));
const DashboardScreen = lazy(() => import("./dashboard/DashboardScreen"));
const Stat = lazy(() => import("./dashboard/Stat"));
const EmailConfirmation = lazy(() => import("./emailconfirmation/EmailConfirmation"));
const ForgotPasswordScreen = lazy(() => import("./forgotpassword/ForgotPasswordScreen"));
const Game = lazy(() => import("./games/GameOld"));
const LoginScreen = lazy(() => import("./login/LoginScreen"));
const NavBar = lazy(() => import("./navigation/NavBar"));
const RegisterScreen = lazy(() => import("./register/RegisterScreen"));
const ResetPasswordScreen = lazy(() => import("./resetpassword/ResetPasswordScreen"));
const Setting = lazy(() => import("./setting/Setting"));
const ShoppingList = lazy(() => import("./shoppinglist/ShoppingList"));
const ValidateTwoFA = lazy(() => import("./validatetwofa/ValidateTwoFA"));
const VerifyEmail = lazy(() => import("./verifyemail/VerifyEmail"));
const Hamburger = lazy(() => import("./Hamburger/Hamburger"));

export {
    DarkMode,
    DashboardScreen,
    Stat,
    EmailConfirmation,
    ForgotPasswordScreen,
    Game,
    LoginScreen,
    NavBar,
    RegisterScreen,
    ResetPasswordScreen,
    Setting,
    ShoppingList,
    ValidateTwoFA,
    VerifyEmail,
    Hamburger
}

export interface IData {
    data: {
      success: boolean;
      status: string;
      message?: string;
      error: string;
      data: {
        username?: string;
        email?: string;
      };
    }[];
    statusCode: number;
  }

export function capitalize(str:string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}