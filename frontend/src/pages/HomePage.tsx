import React from "react";
import express from "../assets/express.png";
import node from "../assets/node.svg";
import mongoDb from "../assets/mongoDB.png";
import react from "../assets/react.png";
const Homepage = () => {
  return (
    <>
      <h1 className="text-5xl font-bold text-center text-[#000000] px-4">
        Stories App
      </h1>
      <p className="font-semibold text-3xl text-[#fca311] text-center">
        A creative space where you can write, share, and explore stories.
      </p>
      <div className="w-full md:w-[70%] mx-auto">
        <h2 className="text-text-[#000000] font-bold text-xl pb-4">
          Tech Stack:
        </h2>
        <p>
          Built with <strong>MongoDB</strong> for data storage,{" "}
          <strong>Express</strong> and <strong>Node.js</strong> for the backend
          API, and <strong>React</strong> for a fast and dynamic interface, this
          app delivers a smooth and modern experience.{" "}
          <strong>Tailwind CSS</strong> powers the styling, and{" "}
          <strong>Firebase</strong> provides secure authentication with full
          error handling and protected routes. Anyone can explore the list of
          stories, but only registered users can create posts, like or unlike
          stories, and join the conversation through comments.
        </p>
      </div>

      <section className="w-full md:w-[70%] grid grid-cols-2 place-items-center gap-10 md:gap-2 md:grid-cols-4 mx-auto p-6 bg-[#293241] rounded-2xl">
        <figure className="w-full md:w-30">
          <img src={mongoDb} alt="mongoDb logo" />
        </figure>
        <figure className="w-[80%] md:w-15">
          <img src={express} alt="express logo" />
        </figure>
        <figure className="w-full md:w-20">
          <img src={node} alt="node logo" />
        </figure>
        <figure className="w-full md:w-18">
          <img src={react} alt="react logo" />
        </figure>
      </section>
    </>
  );
};

export default Homepage;
