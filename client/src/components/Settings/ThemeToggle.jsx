import React from 'react';
import { useGlobalContext } from '../../context';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
const ThemeToggle = ({ style }) => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <div className="toggle-container">
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillMoonFill className={style} />
        ) : (
          <BsFillSunFill className={style} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
