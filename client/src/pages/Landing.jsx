import React, { useContext } from "react";
import { LandingNavBar } from "../components/LandingComponents/LandingNavBar";
import { Footer } from "../components/LandingComponents/Footer";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

export const Landing = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-bl from-landing-gradient-one to-landing-gradient-two snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth font-primary">
      <LandingNavBar />

      <section className="container md:p-[70px] lg:p-38 xl:p-48 flex flex-col snap-start min-h-screen landing-section1  justify-center">
        <div className="flex flex-col gap-y-5 lg:gap-y-8 pb-5 lg:pb-20 items-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-50 flex text-center">
            FIND OR CREATE YOUR NEXT BIG PROJECT WITH A GROUP OF YOUR CHOICE!
          </h1>
          <p className="md:text-xl lg:text-2xl tracking-tighter font-light lg:w-9/12 text-center lg:tracking-tight text-zinc-300">
            <strong className="font-bold">CoLab</strong> is your new place to
            find your next development project and collaborate with a community
            with similar interests!
          </p>
        </div>
        <div className="flex justify-center">
          {token !== null ? (
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className="landingBtn"
            >
              <h1 className="btnTextStyle">Go to dashboard</h1>
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="landingBtn"
            >
              <h1>Get started</h1>
            </button>
          )}
        </div>
      </section>

      <section className="snap-start min-h-screen landing-section1 p-0 flex flex-col justify-center">
        <div className="p-[15px] xl:p-0 flex w-full flex-col gap-y-5 xl:flex-row justify-center gap-x-5 lg:items-center xl:items-stretch">
          <div className="card landingBox1">
            <h1 className="landingBoxTitle">BROWSE PROJECTS!</h1>
            <p className="landingBoxSubtitle">
              Discover a variety of programming projects from different users.
              Each project comes with detailed descriptions, goals, and
              inspiration boards.
            </p>
          </div>

          <img
            className="card landingImg"
            src="landing_images/CoLab_Project_page.jpg"
            alt="project page"
          />
        </div>
      </section>
      <section className="snap-start min-h-screen landing-section1 p-0 flex flex-col justify-center">
        <div className="p-[15px] xl:p-0 flex w-full flex-col gap-y-5 xl:flex-row justify-center gap-x-5 lg:items-center xl:items-stretch">
          <div className="card landingBox1">
            <h1 className="landingBoxTitle">REQUEST TO JOIN PROJECTS</h1>
            <p className="landingBoxSubtitle">
              Find a project that excites you? Submit a join request and wait
              for the project owner to accept.
            </p>
          </div>

          <img
            className="card landingImg"
            src="landing_images/CoLab_Project_page.jpg"
            alt="project page"
          />
        </div>
      </section>
      <section className="snap-start min-h-screen landing-section1 p-0 flex flex-col justify-center">
        <div className="p-[15px] xl:p-0 flex w-full flex-col gap-y-5 xl:flex-row justify-center gap-x-5 lg:items-center xl:items-stretch">
          <div className="card landingBox1">
            <h1 className="landingBoxTitle">COLLABORATE & CREATE!</h1>
            <p className="landingBoxSubtitle">
              Once accepted, join the project's live chat, share ideas, and
              contribute to building something amazing.
            </p>
          </div>

          <img
            className="card landingImg"
            src="landing_images/CoLab_Project_page.jpg"
            alt="project page"
          />
        </div>
      </section>

      <footer className="snap-start min-h-screen landing-section4-card flex flex-col items-center space-y-20 justify-end">
        <div className="flex flex-col justify-center items-center pb-5 lg:pb-44">
          <h1 className="px-[50px] md:px-[110px] text-3xl md:text-4l  lg:text-4xl xl:text-6xl font-bold text-slate-50 flex text-center pb-10">
            Join the community and start collaborating today!
          </h1>

          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="btn landingBtn"
          >
            <h1 className="btnTextStyle">Get started</h1>
          </button>
        </div>
        <Footer />
      </footer>
    </div>
  );
};
