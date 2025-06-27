import { Outlet, ScrollRestoration } from "react-router-dom";
import { Sidebar } from "./components/sidebar/SideBar";
import ProfileBar from "./components/profilebar/ProfileBar";

const Layout: React.FC = () => {
  return (
    <div>
      <div className="w-full h-full !text-black flex flex-col font-Montserrat text-secondary dark:bg-darkBackground dark:text-darkText">
        <div className="flex flex-row min-h-screen">
          <aside className="h-full min-h-screen w-full max-w-fit sticky top-0">
            <Sidebar />
          </aside>

          <main className="flex-1 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 border-b bg-white shadow-sm border-slate-300">
              <ProfileBar />
            </header>

            <section className="flex-1 w-full h-full">
              <ScrollRestoration />
              <div className="w-full p-4 bg-gray-50 h-full min-h-screen">
                <section className="flex w-full md:hidden">
                  {/* <TopMobileNav /> */}
                </section>
                <Outlet />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
