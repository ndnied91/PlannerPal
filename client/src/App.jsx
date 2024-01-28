import { useEffect, useState } from 'react';
import customFetch from './utils/customFetch';
import { useGlobalContext } from './context';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { TodoAppProvider } from './components/Todo/todoContext';

import Todo from './components/Todo/container';
import Projects from './components/Projects/container';
import Calendar from './components/Calendar';
import Notes from './components/Notes/container';
import Overview from './components/Overview/Container';
import ContextWrapper from './components/Calendar/context/ContextWrapper';
import AppSettings from './components/AppSettings';

const App = () => {
  const { setContextUser, userSettings, userContext, setUserSettings } =
    useGlobalContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await customFetch.get('/users/current-user');
        setContextUser(data.user);
      } catch (e) {}
    };
    getUser();
  }, []);

  const renderPane = () => {
    switch (userSettings.selectedPane) {
      case 'todo':
        return (
          <TodoAppProvider>
            <Todo userContext={userContext} userSettings={userSettings} />
          </TodoAppProvider>
        );
      case 'projects':
        return <Projects />;
      case 'calendar':
        return (
          <ContextWrapper>
            <Calendar userContext={userContext} />
          </ContextWrapper>
        );

      case 'notes':
        return <Notes userContext={userContext} />;
      default:
        return (
          <TodoAppProvider userSettings={userSettings}>
            <ContextWrapper>
              <Overview userContext={userContext} userSettings={userSettings} />
            </ContextWrapper>
          </TodoAppProvider>
        );
    }
  };

  return (
    <section className="relative mt-8">
      {/* <Navbar
        setShowSettingsModal={setShowSettingsModal}
        userContext={userContext}
        setContextUser={setContextUser}
      /> */}
      <div className="pl-12">
        <Sidebar setShowSettingsModal={setShowSettingsModal} />
        {userSettings?.selectedPane !== undefined ? renderPane() : null}
      </div>

      {showSettingsModal ? (
        <TodoAppProvider>
          <AppSettings
            setUserSettings={setUserSettings}
            setShowSettingsModal={setShowSettingsModal}
            userContext={userContext}
          />
        </TodoAppProvider>
      ) : null}
    </section>
  );
};

export default App;
