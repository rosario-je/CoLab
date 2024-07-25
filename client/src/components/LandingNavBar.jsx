import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Vial from "../images/vial.png";

export const LandingNavBar = ({ handleCoLabHome}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar bg-landing-navbar-color/50 backdrop-blur-xl">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white group" onClick={handleCoLabHome}>
            <img
              src={Vial}
              className="h-7 mb-2 group-hover:animate-unstableBeaker"
            />
            CoLab
          </a>
        </div>
        <div className="flex-none">
          <div className="signin-button pr-5">
            <SignedOut>
              <div className="btn bg-landing-signin-button rounded-full text-white">
                <SignInButton />
              </div>
            </SignedOut>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
