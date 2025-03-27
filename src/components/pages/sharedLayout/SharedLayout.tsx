import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { getLoadingMarkup } from "../../assets/components";
import { NavBar } from "../../screens";

const SharedLayout: React.FC = () => {
  return (
    <>  
      <Suspense fallback={getLoadingMarkup()}>
        <NavBar />
        <section className="section">
          <Outlet />
        </section>
      </Suspense>
    </>
  )
}

export default SharedLayout;