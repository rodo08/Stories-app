import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <div className="bg-[#000000] border-b-4 border-[#fca311]">
        <Navbar />
      </div>
      <main className="flex flex-col gap-8 py-8 my-4 px-12 lg:px-0 2xl:max-w-screen-2xl 2xl:mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
