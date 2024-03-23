import { useEffect, useState } from 'react';
import customFetch from './utils/customFetch';
import { useGlobalContext } from './context';
import Sidebar from './components/Sidebar';
import { TodoAppProvider } from './components/Todo/todoContext';

import Todo from './components/Todo/container';
import Projects from './components/Projects/container';
import Calendar from './components/Calendar';
import Notes from './components/Notes/container';
import Overview from './components/Overview/Container';
import ContextWrapper from './components/Calendar/context/ContextWrapper';
import AppSettings from './components/Settings/AppSettings';
import Global from './Global';

const App = () => {
  const {
    setContextUser,
    userSettings,
    userContext,
    setUserSettings,
    isDarkTheme,
  } = useGlobalContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [caughtComponent, setCaughtComponent] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await customFetch.get('/users/current-user');
        if (data) {
          setContextUser(data.user);
        }
      } catch (e) {
        console.log(e);
        setCaughtComponent(true);
      }
    };
    getUser();
  }, []);

  const renderPane = () => {
    switch (userSettings.selectedPane) {
      case 'todo':
        return (
          <TodoAppProvider>
            <Todo
              userSettings={userSettings}
              setUserSettings={setUserSettings}
              userContext={userContext}
              isDarkTheme={isDarkTheme}
            />
          </TodoAppProvider>
        );
      case 'projects':
        return <Projects />;
      case 'calendar':
        return (
          <ContextWrapper>
            <Calendar userContext={userContext} isDarkTheme={isDarkTheme} />
          </ContextWrapper>
        );

      case 'notes':
        return <Notes userContext={userContext} />;
      default:
        return (
          <TodoAppProvider userSettings={userSettings}>
            <ContextWrapper>
              <Overview
                userContext={userContext}
                userSettings={userSettings}
                setUserSettings={setUserSettings}
                isDarkTheme={isDarkTheme}
              />
            </ContextWrapper>
          </TodoAppProvider>
        );
    }
  };

  return (
    <main className="min-h-screen flex w-full">
      <div
        className={` ${
          caughtComponent
            ? 'opacity-100 duration-500'
            : 'opacity-0 duration-500'
        }`}
      >
        <Global />
      </div>
      <section className="relative flex flex-col">
        <div className="md:ml-[20px]">
          {userContext && (
            <Sidebar
              setShowSettingsModal={setShowSettingsModal}
              isDarkTheme={isDarkTheme}
            />
          )}

          {userSettings?.selectedPane !== undefined ? renderPane() : null}
        </div>

        {showSettingsModal ? (
          <TodoAppProvider>
            <AppSettings
              setUserSettings={setUserSettings}
              setShowSettingsModal={setShowSettingsModal}
              userContext={userContext}
              userSettings={userSettings}
              isDarkTheme={isDarkTheme}
            />
          </TodoAppProvider>
        ) : null}
      </section>
    </main>
  );
};

export default App;
