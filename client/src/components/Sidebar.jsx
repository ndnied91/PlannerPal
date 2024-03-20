import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaWpforms, FaHome } from 'react-icons/fa';
import { FaPersonRunning } from 'react-icons/fa6';

import { useGlobalContext } from '../context';
import customFetch from '../utils/customFetch';
import { FaGear } from 'react-icons/fa6';
import { CiLogin } from 'react-icons/ci';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { toast } from 'react-toastify';
import MobileNavbar from './MobileNavbar';
import Colorshift from './Settings/ColorShift/Colorshift';

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
    } catch (e) {
      toast.error('Error occurred updating settings, please try again');
    }
  };

  const logoutUser = async () => {
    if (userContext) {
      try {
        await customFetch.post('/auth/logout');
        setContextUser('');
        window.location.reload();
      } catch (e) {
        toast.error('Error occurred, please try again');
      }
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
    <main className="">
      <section className="md:hidden">
        <MobileNavbar
          links={links}
          userSettings={userSettings}
          updateSelectedPane={updateSelectedPane}
        />
      </section>

      <section>
        <div
          className="hidden md:flex sidebar fixed top-0 left-0 w-24 h-full bg-slate-300  justify-center flex-col transition-all ease-in-out hover:w-52 duration-500"
          onMouseOver={() => setHoveredOver(true)}
          onMouseOut={() => setHoveredOver(false)}
        >
          <div
            className={`!text-gray-800 text-center font-bold hover:scale-105 duration-300 transition-all ease-in-out ${
              hoveredOver ? 'tracking-widest text-xl' : 'text-sm text-center'
            }`}
          >
            PlannerPal
          </div>

          <div className="flex justify-center">
            {' '}
            <Colorshift />{' '}
          </div>
          <ul
            className={`text-grey-600 links duration-200 w-[90px] p-3 ${
              hoveredOver ? 'duration-200  w-52' : ' '
            }`}
          >
            {links.map(({ id, text, icon }) => {
              return (
                <li key={id} className={`links`}>
                  <button
                    onClick={() => updateSelectedPane(text)}
                    className={`${
                      hoveredOver ? 'duration-100 ' : 'duration-100'
                    }`}
                  >
                    {icon}
                    <div
                      className={`pl-1 ${
                        text === userSettings?.selectedPane
                          ? '!text-gray-900 font-bold'
                          : null
                      } `}
                    >
                      <div>
                        <p
                          className={`hover:scale-105 duration-300 transition-all ease-in-out ${
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
                  className={`hover:scale-105 duration-300 transition-all ease-in-out ${
                    hoveredOver
                      ? 'opacity-100 visible duration-300'
                      : 'opacity-0 invisible duration-300'
                  } `}
                >
                  <span className="text-xl pl-1">Settings</span>
                </p>
              </div>

              <div className="flex w-fit items-center pl-5 h-10 cursor-pointer hover:scale-105 duration-300">
                <CiLogin className="text-xl" />
                <p
                  className={`hover:scale-105 duration-300 transition-all ease-in-out ${
                    hoveredOver
                      ? 'opacity-100 visible duration-300'
                      : 'opacity-0 invisible duration-300'
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
      </section>
    </main>
  );
};

export default Options;
