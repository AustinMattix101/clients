import { lazy } from "react";

const SharedLayout = lazy(() => import("./sharedLayout/SharedLayout"));
const Home = lazy(() => import("./home/Home"));
const About = lazy(() => import("./about/About"));
const Products = lazy(() => import("./products/Products"));
const Profile = lazy(() => import("./profile/Profile"));
const SingleProfile = lazy(() => import("./singleProfile/SingleProfile"));
const FourOFour = lazy(() => import("./error/404"));

const DashboardScreen = lazy(() => import("./dashboard/DashboardScreen"));
const Stat = lazy(() => import("./dashboard/Stat"));
const EmailConfirmation = lazy(() => import("./emailConfirm/EmailConfirmation"));
const ForgotPasswordScreen = lazy(() => import("./forgotPassword/ForgotPasswordScreen"));
const SigninScreen = lazy(() => import("./signin/SigninScreen"));
const SignupScreen = lazy(() => import("./signup/SignupScreen"));
const ResetPasswordScreen = lazy(() => import("./resetPassword/ResetPasswordScreen"));
const Setting = lazy(() => import("./setting/Setting"));
const ShoppingList = lazy(() => import("./shopping/ShoppingList"));
const ValidateTwoFA = lazy(() => import("./validateTwoFA/ValidateTwoFA"));
const VerifyEmail = lazy(() => import("./verifyEmail/VerifyEmail"));

export {
    SharedLayout,
    Home,
    About,
    Products,
    Profile,
    SingleProfile,
    FourOFour,
    DashboardScreen,
    Stat,
    EmailConfirmation,
    ForgotPasswordScreen,
    SigninScreen,
    SignupScreen,
    ResetPasswordScreen,
    Setting,
    ShoppingList,
    ValidateTwoFA,
    VerifyEmail,
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

export const getLSItem = (key: string, index: number, object: string): string => {
  return JSON.parse(localStorage.getItem(key) || ``)[index][object];
}

export const clearLSItem = (key: string, index: number, object: string): void => {
  let i = JSON.parse(localStorage.getItem(key) || ``);
  i[index][object] = ``;
  localStorage.setItem(key, JSON.stringify(i));
}

export const updateLSItem = (key: string, index: number, object: string, value: string): void => {
  let i = JSON.parse(localStorage.getItem(key) || ``);
  i[index][object] = value;
  localStorage.setItem(key, JSON.stringify(i));
}