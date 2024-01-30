import React from 'react';
import LandingCarousel from './LandingCarousel';
import './landingPage.css';

export const LandingPage = ({ setShowLoginModal, setShowRegModal }) => {
  return (
    <main className="hero-section w-screen h-full text-white">
      <section className="container">
        <div className="w-2/4 rounded-lg flex flex-col absolute bottom-20 left-10">
          {/* <LandingCarousel /> */}
        </div>
        <div className="">
          <nav className="navbar flex justify-between items-center">
            <h1 className="bg-white p-1 border-black border-2 scale-110 mt-6 rounded-md">
              <span className="bg-black tracking-wide p-1 font-normal">
                PLANNER
              </span>{' '}
              <span className="text-black font-bold">PAL</span>{' '}
            </h1>
            <ul className="flex gap-10 items-center pt-6">
              <li className="bg-blue-500 p-2 rounded-md shadow-md tracking-wide w-32 text-center font-bold cursor-pointer hover:scale-110 duration-400">
                TEST ME!
              </li>
              <li
                onClick={() => setShowLoginModal(true)}
                className="bg-red-500 p-2 rounded-md shadow-md tracking-wide w-32 text-center font-bold cursor-pointer hover:scale-105 duration-400"
              >
                Sign in
              </li>
            </ul>
          </nav>

          <div className="hero-text absolute text text-right">
            <h2 className="text-6xl tracking-wide">Welcome To</h2>
            <h1 className="text-8xl tracking-wide">PlannerPal</h1>
            <p className="tracking-wide pb-10">
              PlannerPal is a robust and intuitive React web application
              designed to supercharge your productivity and organization. With a
              sleek and user-friendly interface
            </p>

            <button
              className="explore-btn tracking-widest font-bold text-gray-800 uppercase"
              onClick={() => setShowRegModal(true)}
            >
              Get started
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
