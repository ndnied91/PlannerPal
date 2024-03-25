import { useEffect, useState } from 'react';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import ColorPicker from './ColorPicker/ColorPicker';
import Container from './Select/Container';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdOutlineClose } from 'react-icons/md';

const AppSettings = ({
  setShowSettingsModal,
  userContext,
  setUserSettings,
  userSettings,
  isDarkTheme,
}) => {
  const [urgency, setUrgency] = useState(userSettings?.urgency);
  const [sortBy, setSortBy] = useState(userSettings?.sortBy);
  const [deleteTime, setDeleteTime] = useState(userSettings?.deleteTime);
  const [color, setColor] = useState(userSettings?.pinnedColor);
  const [isAddToCal, setIsAddToCal] = useState(userSettings?.isAddToCal);

  const handleSubmit = async () => {
    const options = {
      createdBy: userContext._id,
      urgency:
        typeof urgency !== 'number'
          ? parseInt(urgency.split(' ')[0]) * 24
          : urgency,
      sortBy: sortBy,
      deleteTime:
        typeof deleteTime !== 'number'
          ? parseInt(deleteTime.split(' ')[0]) * 24
          : deleteTime,
      pinnedColor: color,
      isAddToCal,
    };

    try {
      const res = await customFetch.post(
        `/settings/${userContext._id}`,
        options
      );
      setUserSettings(res.data.settings);

      if (res.status === 201) {
        toast.success('Settings updated!');

        setShowSettingsModal(false);
      } else {
        toast.error('Please try again!');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error occurred, please try again');
    }
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        const { data } = await customFetch.get(`/settings/${userContext._id}`);
        setUserSettings(data.userSettings[0]);
      } catch (e) {
        toast.error('Unable to get settings, please try again');
      }
    };

    getSettings();
  }, []);

  const timeOptions = ['1 day', '2 days ', '7 days ', '30 days'];
  const sortOptions = ['Due date', 'A-Z', 'Z-A'];

  return (
    <div className="relative z-10 " role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>
      <div className="fixed inset-0 z-10">
        <div className="flex md:min-h-full items-center justify-center p-4 text-center sm:items-center h-screen md:h-max">
          <OutsideClickHandler
            onOutsideClick={() => setShowSettingsModal(false)}
          >
            <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all w-screen md:w-full h-screen md:h-max">
              <div
                className={`${
                  isDarkTheme ? 'bg-neutral-700 ' : 'bg-slate-100'
                } px-4 pt-3 flex justify-end `}
              >
                <button
                  onClick={() => setShowSettingsModal(false)}
                  type="button"
                >
                  <MdOutlineClose
                    className={`text-3xl
                  ${isDarkTheme ? 'text-gray-100' : 'text-gray-700'} `}
                  />
                </button>
              </div>
              <div
                className={` ${
                  isDarkTheme ? ' bg-neutral-700' : 'bg-slate-100'
                } px-4 pb-4 sm:p-6 sm:pb-4 !pt-1 h-screen md:h-max`}
              >
                <div className="text-center sm:mt-0 sm:text-left m-4 p-4 pt-0">
                  <form>
                    <label
                      className={`${
                        isDarkTheme ? 'text-gray-100' : 'text-gray-700'
                      } tracking-widest block text-3xl font-bold mb-10 text-center`}
                      htmlFor="currentTitle"
                    >
                      App Settings
                    </label>

                    <div className="">
                      <section
                        className={`flex items-center justify-between mb-4 p-2 rounded-sm`}
                      >
                        {/* description */}

                        <p className="text-sm mr-4">
                          {' '}
                          Select the urgency factor{' '}
                        </p>
                        <Container
                          placeholderText={'Select an urgency'}
                          list={timeOptions}
                          setValue={setUrgency}
                          defaultValue={(urgency / 24).toString() + ' days'}
                          isDarkTheme={isDarkTheme}
                        />
                      </section>
                      {/* sort by */}
                      <section
                        className={`flex items-center justify-between mb-4 p-2 rounded-sm`}
                      >
                        <p className="text-sm "> Sort items by.. </p>

                        <Container
                          placeholderText={'Select an option'}
                          list={sortOptions}
                          setValue={setSortBy}
                          defaultValue={userSettings?.sortBy}
                          isDarkTheme={isDarkTheme}
                        />
                      </section>

                      {/* delete completed todos after x amount of days */}
                      <section
                        className={`flex items-center justify-between mb-4 p-2 rounded-sm`}
                      >
                        <p className="text-sm"> Delete items after </p>

                        <Container
                          placeholderText={'Delete time..'}
                          list={timeOptions}
                          setValue={setDeleteTime}
                          defaultValue={(deleteTime / 24).toString() + ' days'}
                          isDarkTheme={isDarkTheme}
                        />
                      </section>

                      {/* delete completed todo's after x amount of days */}
                      <section
                        className={`flex items-center justify-between mb-4 p-2 rounded-sm`}
                      >
                        <p className="text-sm">
                          {' '}
                          Pick the color for your pinned todos{' '}
                        </p>

                        <div className="flex justify-center items-center">
                          <ColorPicker color={color} setColor={setColor} />
                        </div>
                        {/*  */}
                      </section>
                      {/* isAddToCal  */}
                      <section className="flex items-center justify-between p-2 mb-10">
                        <p className="text-sm">
                          {' '}
                          Add new todos to calendar by default{' '}
                        </p>

                        <input
                          defaultChecked={isAddToCal}
                          type="checkbox"
                          onChange={() => setIsAddToCal(!isAddToCal)}
                        />
                      </section>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className={`flex justify-center absolute bottom-0 w-full pb-5`}
              >
                <button
                  type="button"
                  className={`${
                    isDarkTheme
                      ? 'bg-gray-950 text-slate-50'
                      : 'bg-gray-950 text-slate-50'
                  } hover:opacity-85 duration-300 w-1/2 rounded-md h-12 text-sm justify-center font-semibold shadow-sm`}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
