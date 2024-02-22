import { useState } from 'react';

import { LandingPage } from './components/LandingPage';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

const Example = () => {
  const [showRegModal, setShowRegModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const renderSignIn = () => {
    setShowRegModal(false);
    setShowLoginModal(true);
  };

  const renderRegister = () => {
    setShowLoginModal(false);
    setShowRegModal(true);
  };

  return (
    <div className="w-screen h-screen z-10 absolute">
      {/* {showRegModal ? (
        <RegisterModal
          setShowRegModal={setShowRegModal}
          renderSignIn={renderSignIn}
        />
      ) : null} */}
      <div className={`${showRegModal ? 'opacity-100' : 'opacity-0'}`}>
        <RegisterModal
          showRegModal={showRegModal}
          setShowRegModal={setShowRegModal}
          renderSignIn={renderSignIn}
        />
      </div>

      <div className={`${showLoginModal ? 'opacity-100' : 'opacity-0'}`}>
        <LoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          renderRegister={renderRegister}
        />
      </div>

      <LandingPage
        setShowLoginModal={setShowLoginModal}
        setShowRegModal={setShowRegModal}
      />
    </div>
  );
};

export default Example;
