import { lazy } from "react";

const SharedLayout = lazy(() => import("./SharedLayout/SharedLayout"));
const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About/About"));
const Products = lazy(() => import("./Products/Products"));
const Profile = lazy(() => import("./Profile/Profile"));
const SingleProfile = lazy(() => import("./SingleProfile/SingleProfile"));
const FourOFour = lazy(() => import("./404/404"));

export {
    SharedLayout,
    Home,
    About,
    Products,
    Profile,
    SingleProfile,
    FourOFour
}