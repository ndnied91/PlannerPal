import React, { useEffect, useState } from 'react';
import { FaFolderOpen, FaCalendarAlt, FaWpforms, FaHome } from 'react-icons/fa';
import { FaPersonRunning } from 'react-icons/fa6';

import { useGlobalContext } from '../context';
import customFetch from '../utils/customFetch';
import { FaGear } from 'react-icons/fa6';
import { CiLogin } from 'react-icons/ci';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Options = ({ setShowSettingsModal }) => {
  const { userSettings, userContext, setUserSettings, setContextUser } =
    useGlobalContext();
  const [hoveredOver, setHoveredOver] = useState(false);
  const [showRegModal, setShowRegModal] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const links = [
    {
      id: 1,
      text: 'overview',
      icon: <FaHome />,
    },

    {
      id: 2,
      text: 'todo',
      icon: <FaPersonRunning />,
    },
    {
      id: 4,
      text: 'calendar',
      icon: <FaCalendarAlt />,
    },
    {
      id: 5,
      text: 'notes',
      icon: <FaWpforms />,
    },
  ];

  const updateSelectedPane = async (selectedPane) => {
    try {
      const { data } = await customFetch.post(`/settings/${userContext._id}`, {
        selectedPane,
      });

      setUserSettings(data.settings);
    } catch (e) {}
  };

  const logoutUser = async () => {
    if (userContext) {
      await customFetch.post('/auth/logout');
      setContextUser('');
      window.location.reload();
    }
  };

  const renderSignIn = () => {
    setShowRegModal(false);
    setShowLoginModal(true);
  };

  const renderRegister = () => {
    setShowLoginModal(false);
    setShowRegModal(true);
  };

  return (
    <div
      className="sidebar fixed top-0 left-0 w-24 h-full bg-slate-300 flex justify-center flex-col hover:w-52 hover:duration-500"
      onMouseOver={() => setHoveredOver(true)}
      onMouseOut={() => setHoveredOver(false)}
    >
      <div
        className={`text-center font-bold h-12 duration-300 ${
          hoveredOver ? ' tracking-widest text-xl' : 'text-sm text-center'
        }`}
      >
        PlannerPal
      </div>
      <ul
        className={`links duration-200 w-[90px] p-3 ${
          hoveredOver ? 'duration-200  w-52' : ' '
        }`}
      >
        {links.map(({ id, text, icon }) => {
          return (
            <li key={id} className={`links`}>
              <button
                onClick={() => updateSelectedPane(text)}
                className={` ${
                  hoveredOver ? 'duration-100 ' : 'duration-100 '
                }`}
              >
                {icon}
                <div
                  className={`pl-1 ${
                    text === userSettings?.selectedPane ? 'text-red-100 ' : null
                  } `}
                >
                  <div
                    className={`${
                      hoveredOver
                        ? 'opacity-100 visible duration-100'
                        : 'opacity-0 invisible duration-100'
                    } `}
                  >
                    <p
                      className={` hover:scale-105 duration-300 ${
                        hoveredOver
                          ? 'opacity-100 visible duration-100'
                          : 'opacity-0 invisible duration-100'
                      } `}
                    >
                      {text}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
        <div className="mt-32">
          <div
            className="flex w-fit items-center pl-5 pb-6 h-10 cursor-pointer hover:scale-105 duration-300"
            onClick={() => setShowSettingsModal(true)}
          >
            <FaGear className="text-xl" />
            <p
              className={` ${
                hoveredOver ? 'opacity-100 visible' : 'opacity-0 hidden'
              } `}
            >
              <span className="text-xl pl-1">Settings</span>
            </p>
          </div>

          <div className="flex w-fit items-center pl-5 h-10 cursor-pointer hover:scale-105 duration-300">
            <CiLogin className="text-xl" />
            <p
              className={` ${
                hoveredOver ? 'opacity-100 visible' : 'opacity-0 hidden'
              } `}
            >
              <span
                className="text-xl pl-1"
                onClick={
                  userContext ? logoutUser : () => setShowLoginModal(true)
                }
              >
                {userContext ? 'Logout' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </ul>
      {/*  */}
      {/* modals, leave these be */}
      {showRegModal ? (
        <RegisterModal
          setShowRegModal={setShowRegModal}
          renderSignIn={renderSignIn}
        />
      ) : null}

      {showLoginModal ? (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          renderRegister={renderRegister}
        />
      ) : null}
    </div>
  );
};

export default Options;
