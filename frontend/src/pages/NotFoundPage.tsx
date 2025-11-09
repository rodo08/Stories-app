import React from "react";
import { NotFoundIcon } from "../components/Icons";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col gap-y-4 justify-center items-center h-screen">
      <NotFoundIcon />
      <div className="mx-auto bg-[#001d3d] p-4 rounded-xl">
        <h1 className="text-4xl font-bold text-[#fca311] pb-2">
          Page not Found
        </h1>
      </div>

      <Link to="/stories">
        <p className="text-2xl text-[#001d3d] text-center font-semibold">
          wanna go <span className="font-bold text-[#fca311]">back</span> ?
        </p>
      </Link>
    </section>
  );
};

export default NotFoundPage;
