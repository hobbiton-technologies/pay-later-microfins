import { Outlet, ScrollRestoration } from "react-router-dom";
import { Sidebar } from "./components/sidebar/SideBar";

const Layout: React.FC = () => {
  return (
    <div>
      <div className="w-full h-full !text-black flex flex-col font-Montserrat text-secondary dark:bg-darkBackground dark:text-darkText">
        <section className="flex flex-row">
          <section className="h-full min-h-screen w-full max-w-fit sticky top-0 justify-center items-center">
            <Sidebar />
          </section>
          <section className="w-full h-full">
            <ScrollRestoration />
            <div className="w-full p-4 bg-gray-50 d h-full min-h-screen">
              <section className="flex w-full md:hidden">
                {/* <TopMobileNav /> */}
              </section>

              <Outlet />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Layout;
