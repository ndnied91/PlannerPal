import React from 'react';
import './landingPage.css';
import { FaArrowRight } from 'react-icons/fa';
import planner from '../assets/planner.svg';

export const LandingPage = ({ setShowLoginModal, setShowRegModal }) => {
  return (
    <section className="h-full text-gray-600 bg-slate-200 flex justify-center">
      <section className="flex items-center pt-20">
        <div>
          <h1 className="text-9xl tracking-wide">PlannerPal</h1>
          <p className="tracking-wide pb-10 text-md mt-4 w-96">
            PlannerPal is a robust and intuitive React web application designed
            to supercharge your productivity and organization. With a sleek and
            user-friendly interface
          </p>

          <button
            className="test-btn tracking-widest font-bold text-slate-100 uppercase flex items-center"
            onClick={() => setShowRegModal(true)}
          >
            Get started
            <FaArrowRight className="ml-3" />
          </button>
        </div>

        <p className="ml-10">
          <img src={planner} height={500} width={500}></img>{' '}
        </p>
      </section>

      <div className="flex h-12 mt-10 w-5/6 absolute justify-between ">
        <a href="http://www.danielniedzwiedzki.com" target="_blank">
          {' '}
          PlannerPal{' '}
        </a>

        <span
          onClick={() => setShowLoginModal(true)}
          className="bg-red-500 text-white relative p-2 rounded-md shadow-md tracking-wide w-32 text-center font-bold cursor-pointer hover:scale-105 duration-400"
        >
          Sign in
        </span>
      </div>
    </section>
  );
};
