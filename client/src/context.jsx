import { createContext, useContext, useEffect, useState } from 'react';
import customFetch from './utils/customFetch';

const AppContext = createContext();

const getInitialDarkMode = () => {
  return localStorage.getItem('darkTheme') === 'true';
};
export const AppProvider = ({ children }) => {
  const [userContext, setContextUser] = useState(false);
  const [userSettings, setUserSettings] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await customFetch.get(`/settings/${userContext._id}`);
        setUserSettings(...data.userSettings);
      } catch (e) {
        setUserSettings(null);
      }
    };

    if (userContext !== false) {
      getData();
    }
  }, [userContext]);

  return (
    <AppContext.Provider
      value={{
        userContext,
        setContextUser,
        userSettings,
        setUserSettings,
        isDarkTheme,
        toggleDarkTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
