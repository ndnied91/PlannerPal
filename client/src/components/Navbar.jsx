import React, { useEffect, useState } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import LogoutContainer from './LogoutComponent';
import customFetch from '../utils/customFetch';

const Navbar = ({ setShowSettingsModal, userContext, setContextUser }) => {
  const [showRegModal, setShowRegModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  const renderSignIn = () => {
    setShowRegModal(false);
    setShowLoginModal(true);
  };

  const renderRegister = () => {
    setShowRegModal(true);
    setShowLoginModal(false);
  };

  const logoutUser = async () => {
    if (userContext) {
      await customFetch.post('/auth/logout');
      setContextUser('');
      window.location.reload();
    }
  };

  const renderLogin = () => {
    if (userContext && showComponent) {
      return (
        <div>
          {' '}
          <LogoutContainer
            logoutUser={logoutUser}
            setShowSettingsModal={setShowSettingsModal}
          />{' '}
        </div>
      );
    } else if (!userContext && showComponent) {
      return (
        <>
          <button
            className="mr-4 bg-slate-300 p-2 rounded-md shadow-md hover:bg-slate-300 duration-300 w-20 h-10 "
            onClick={() => setShowLoginModal(true)}
          >
            Log In
          </button>
          <button
            className=" bg-slate-300 p-2 rounded-md shadow-md hover:bg-slate-300 duration-300 w-20 h-10"
            onClick={() => setShowRegModal(true)}
          >
            Register
          </button>
        </>
      );
    }
  };

  return (
    <div className="md:flex justify-between p-4 z-[100]">
      <div className="p-3 font-bold text-3xl md:text-xl text-center"></div>

      <div className="flex justify-around">
        {renderLogin()}

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
    </div>
  );
};

export default Navbar;
