import { createContext, useContext, useEffect, useState } from 'react';
import customFetch from './utils/customFetch';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userContext, setContextUser] = useState(false);
  const [userSettings, setUserSettings] = useState();

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
