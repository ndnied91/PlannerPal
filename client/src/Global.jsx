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

  console.log(showRegModal);
  return (
    <div className="w-screen h-screen z-10 absolute">
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

      <LandingPage
        setShowLoginModal={setShowLoginModal}
        setShowRegModal={setShowRegModal}
      />
    </div>
  );
};

export default Example;
