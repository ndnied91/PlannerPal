import React from 'react';
import './landingPage.css';
import { FaArrowRight } from 'react-icons/fa';
import planner from '../assets/planner.svg';

export const LandingPage = ({ setShowLoginModal, setShowRegModal }) => {
  return (
    <section className="h-full text-gray-600 bg-slate-200 flex justify-center">
      <section className="flex items-center pt-20 ">
        <div className="flex flex-col md:flex-row" id="sds">
          <div className="mb-5 md:mb-0 ">
            <h1 className="text-4xl lg:text-9xl tracking-wide text-center">
              PlannerPal
            </h1>
            <p className="tracking-wide pb-10 text-md mt-4 md:w-96 text-center md:text-left  sm:w-full">
              PlannerPal is a robust and intuitive React web application
              designed to supercharge your productivity and organization. With a
              sleek and user-friendly interface
            </p>

            <div className="w-full flex justify-center md:justify-start">
              <button
                className="test-btn tracking-widest font-bold text-gray-950 uppercase flex items-center justify-center w-3/4 "
                id="sssss"
                onClick={() => setShowRegModal(true)}
              >
                Get started
                <FaArrowRight className="ml-3" />
              </button>
            </div>
          </div>

          <p className="m-6 md:ml-10">
            <img src={planner} height={500} width={500}></img>{' '}
          </p>
        </div>
      </section>

      <div className="flex h-12 mt-10 w-5/6 absolute justify-between ">
        <a href="http://www.danielniedzwiedzki.com" target="_blank">
          {' '}
          PlannerPal{' '}
        </a>

        <span
          onClick={() => setShowLoginModal(true)}
          className="bg-gray-800 text-white relative flex items-center justify-center rounded-md shadow-md tracking-wide w-32 text-center font-bold cursor-pointer hover:scale-105 duration-200"
        >
          Sign in
        </span>
      </div>
    </section>
  );
};
