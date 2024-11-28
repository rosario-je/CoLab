import React, { useContext } from "react";
import { LandingNavBar } from "../components/LandingComponents/LandingNavBar";
import { Footer } from "../components/LandingComponents/Footer";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

export const Landing = () => {
  const { token, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-bl from-landing-gradient-one to-landing-gradient-two snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth">
      <LandingNavBar />

      <section className="flex flex-col snap-start min-h-screen landing-section1 p-48 justify-center">
        <div className="flex flex-col gap-y-8 pb-20 items-center">
          <h1 className="text-6xl font-black text-slate-50 tracking-wide flex text-center">
            FIND OR CREATE YOUR NEXT BIG PROJECT WITH A GROUP OF YOUR CHOICE!
          </h1>
          <p className="text-3xl text-slate-50 font-light w-9/12 text-center">
            <strong>CoLab</strong> is your new place to find your next
            development project and collaborate with a community with similar
            interests!
          </p>
        </div>
        <div className="flex justify-center">
          {token !== null ? (
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className="btn w-80 bg-landing-signin-button/90 rounded-full text-base text-white border-2 border-white border-opacity-40 hover:border-white hover:border-opacity-40 hover:bg-landing-gradient-two/70"
            >
              <h1>Go to dashboard</h1>
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="btn w-80 bg-landing-signin-button/90 rounded-full text-base text-white border-2 border-white border-opacity-40 hover:border-white hover:border-opacity-40 hover:bg-landing-gradient-two/70"
            >
              <h1>Get started</h1>
            </button>
          )}
        </div>
      </section>

      <section className="snap-start min-h-screen landing-section1 p-0 flex flex-col justify-center">
        <div className="flex w-full flex-col lg:flex-row justify-around">
          <div className="card bg-landing-blue rounded-box flex flex-col  w-2/5 place-items-center p-10 justify-around items-start border-2 border-white border-opacity-40">
            <h1 className="card-title font-black text-6xl text-white w-full">
              BROWSE PROJECTS!
            </h1>
            <p className="text-white font-light text-3xl ">
              Discover a variety of programming projects from different users.
              Each project comes with detailed descriptions, goals, and
              inspiration boards.
            </p>
          </div>

          <img
            className="card bg-base-300 rounded-box grid  w-2/5 place-items-center border-2 border-landing-gradient-two"
            src="landing_images/CoLab_Feed_page.jpg"
            alt="feed page"
          />
        </div>
      </section>

      <section className="snap-start min-h-screen landing-section1 p-0 flex flex-col justify-center">
        <div className="flex w-full flex-col lg:flex-row justify-around">
          <img
            className="card bg-base-300 rounded-box grid  w-2/5 place-items-center border-2 border-landing-gradient-two"
            src="landing_images/requests.jpg"
            alt=""
          />
          <div className="card bg-landing-blue rounded-box flex flex-col  w-2/5 place-items-center p-10 justify-around items-start border-2 border-white border-opacity-40">
            <h1 className="card-title font-black text-6xl text-white w-full">
              REQUEST TO JOIN PROJECTS
            </h1>
            <p className="text-white font-light text-3xl ">
              Find a project that excites you? Submit a join request and wait
              for the project owner to accept.
            </p>
          </div>
        </div>
      </section>

      <section className="snap-start min-h-screen landing-section1 p-0 flex flex-col justify-center">
        <div className="flex w-full flex-col lg:flex-row justify-around">
          <div className="card bg-landing-blue rounded-box flex flex-col  w-2/5 place-items-center p-10 justify-around items-start border-2 border-white border-opacity-40">
            <h1 className="card-title font-black text-6xl text-white w-full">
              COLLABORATE & CREATE!
            </h1>
            <p className="text-white font-light text-3xl ">
              Once accepted, join the project's live chat, share ideas, and
              contribute to building something amazing.
            </p>
          </div>

          <img
            className="card bg-base-300 rounded-box grid  w-2/5 place-items-center border-2 border-landing-gradient-two"
            src="landing_images/CoLab_Project_page.jpg"
            alt="project page"
          />
        </div>
      </section>

      <footer className="snap-start min-h-screen landing-section4-card flex  flex-col items-center space-y-20 justify-end">
        <div className="flex flex-col justify-center items-center pb-44">
          <h1 className="text-6xl font-bold text-white tracking-wide self-center pb-14 text-center w-10/12">
            Join the community and start collaborating today!
          </h1>

          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="btn w-80 bg-landing-signin-button/90 rounded-full text-base text-white border-2 border-white border-opacity-40 hover:border-white hover:border-opacity-40 hover:bg-landing-gradient-two/70"
          >
            <h1>Get started</h1>
          </button>
        </div>
        <Footer />
      </footer>
    </div>
  );
};
