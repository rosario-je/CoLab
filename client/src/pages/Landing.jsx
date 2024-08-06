import React, { useEffect } from "react";
import { LandingNavBar } from "../components/LandingComponents/LandingNavBar";
import { Footer } from "../components/LandingComponents/Footer";
import { useNavigate } from "react-router-dom";

export const Landing = ({ currentUser, handleLogout }) => {
  const navigate = useNavigate();

  const handleDashboardRoute = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-gradient-to-bl from-landing-gradient-one to-landing-gradient-two snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth">
      <LandingNavBar currentUser={currentUser} handleLogout={handleLogout} />

      <section className="snap-start min-h-screen landing-section1 p-48">
        <div className="grid w-3/5 gap-y-8 pb-20">
          <h1 className="text-6xl font-black text-slate-50 tracking-wide">
            FIND OR CREATE YOUR NEXT BIG PROJECT WITH A GROUP OF YOUR CHOICE!
          </h1>
          <p className="text-3xl text-slate-50 font-light w-9/12">
            CoLab is your new place to find your next development project and
            collaborate with a community with similar interests!
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="btn w-80 bg-landing-signin-button/90 rounded-full text-base text-white border-2 border-white border-opacity-40 hover:border-white hover:border-opacity-40 hover:bg-landing-gradient-two/70"
          >
            <h1>Get started</h1>
          </button>
        </div>
      </section>

      <section className="snap-start min-h-screen landing-section2-card">
        <div className="section-container flex justify-center landing-section2 flex-row gap-y-2 py-72 px-80">
          <div className="card-container flex flex-row w-auto h-auto items-start justify-center bg-landing-blue px-12 py-20 rounded-3xl gap-x-52 shadow-lg backdrop-blur-3xl">
            <div className="space-y-8">
              <h1 className="card-title font-black text-5xl w-52 text-white">
                BROWSE PROJECTS!
              </h1>
              <p className="w-96 text-white font-light text-xl">
                Discover a variety of programming projects from different users.
                Each project comes with detailed descriptions, goals, and
                inspiration boards.
              </p>
            </div>
            <div>
              <div className="w-72 h-80 bg-black rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="snap-start min-h-screen landing-section3-card">
        <div className="section-container flex justify-center landing-section2 flex-row gap-y-2 py-72 px-80">
          <div className="card-container flex flex-row w-auto h-auto items-start justify-center bg-landing-blue px-12 py-20 rounded-3xl gap-x-52 shadow-lg backdrop-blur-3xl">
            <div>
              <div className="w-72 h-80 bg-black rounded-3xl"></div>
            </div>
            <div className="space-y-8">
              <h1 className="card-title font-black text-5xl w-52 text-white">
                REQUEST TO JOIN PROJECTS
              </h1>
              <p className="w-96 text-white font-light text-xl">
                Find a project that excites you? Submit a join request and wait
                for the project owner to accept.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="snap-start min-h-screen landing-section4-card">
        <div className="section-container flex justify-center landing-section2 flex-row gap-y-2 px-80 pt-72 pb-44">
          <div className="card-container flex flex-row w-auto h-auto items-start justify-center bg-landing-blue px-12 py-20 rounded-3xl gap-x-52 shadow-lg backdrop-blur-3xl">
            <div className="space-y-8">
              <h1 className="card-title font-black text-5xl w-52 text-white">
                COLLABORATE & CREATE!
              </h1>
              <p className="w-96 text-white font-light text-xl">
                Once accepted, join the project's live chat, share ideas, and
                contribute to building something amazing.
              </p>
            </div>
            <div>
              <div className="w-72 h-80 bg-black rounded-3xl"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-14">
          <h1 className="text-4xl font-black text-slate-50 tracking-wide self-center pb-14 text-center w-3/6">
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
      </section>
    </div>
  );
};
