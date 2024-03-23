import React from 'react';
import { useGlobalContext } from '../../context';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <div className="toggle-container">
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillMoonFill className="text-3xl" />
        ) : (
          <BsFillSunFill className="text-3xl" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
