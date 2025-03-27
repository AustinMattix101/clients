import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import loadingMarkup from "../../assets/components/getLoadingMarkup";
import Navbar from "../../screens/navigation/NavBar";

const SharedLayout: React.FC = () => {
  return (
    <>  
      <Suspense fallback={loadingMarkup()}>
        <Navbar />
        <section className="section">
          <Outlet />
        </section>
      </Suspense>
    </>
  )
}

export default SharedLayout;