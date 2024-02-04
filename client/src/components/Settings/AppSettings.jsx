import { useState } from 'react';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import ColorPicker from './ColorPicker/ColorPicker';

import Container from './Select/Container';

const AppSettings = ({
  setShowSettingsModal,
  userContext,
  setUserSettings,
  userSettings,
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

    const res = await customFetch.post(`/settings/${userContext._id}`, options);
    console.log(res.data);
    setUserSettings(res.data.settings);

    if (res.status === 201) {
      toast.success('Settings updated!');

      setShowSettingsModal(false);
    } else {
      toast.error('Please try again!');
    }
  };

  const timeOptions = ['1 day', '2 days ', '7 days ', '30 days'];
  const sortOptions = ['Due date', 'A-Z', 'Z-A'];

  return (
    <div className="relative z-10 " role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl self-center h-[720px]">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-max">
              <div className="mt-3 text-center sm:mt-0 sm:text-left h-screen m-4 p-4 ">
                <form>
                  <label
                    className="block text-gray-700 text-3xl font-bold mb-10 text-center"
                    htmlFor="currentTitle"
                  >
                    App Settings
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <section className="bg-slate-100 h-36 flex flex-col justify-center p-4 rounded shadow-sm ite">
                      {/* description */}

                      <label
                        className="block text-gray-700 text-md font-bold mb-2 "
                        htmlFor="Overview"
                      >
                        Overview
                      </label>

                      <div>
                        <p className="text-sm"> Select the urgency factor </p>
                        <Container
                          placeholderText={'Select an urgency'}
                          list={timeOptions}
                          setValue={setUrgency}
                          defaultValue={(urgency / 24).toString() + ' days'}
                        />
                      </div>
                    </section>
                    {/* sort by */}
                    <section className="bg-slate-100  h-36 flex flex-col justify-center p-4 rounded shadow-sm">
                      <div className="mb-">
                        <label
                          className="block text-gray-700 text-md font-bold mb-2"
                          htmlFor="sortby"
                        >
                          Sort by
                        </label>
                      </div>

                      <p className="text-sm"> Sort todos by.. </p>
                      <div className="w-48">
                        <Container
                          placeholderText={'Select an option'}
                          list={sortOptions}
                          setValue={setSortBy}
                          defaultValue={sortBy}
                        />
                      </div>
                    </section>

                    {/* delete completed todos after x amount of days */}
                    <section className="bg-slate-100 w-64 h-36 flex flex-col justify-center p-4 rounded shadow-sm">
                      <div className="mb-">
                        <label
                          className="block text-gray-700 text-md font-bold mb-2"
                          htmlFor="deleteTime"
                        >
                          Delete time
                        </label>
                      </div>

                      <div>
                        <p className="text-sm"> Delete todos after </p>
                        <div className="w-48">
                          <Container
                            placeholderText={'Delete time..'}
                            list={timeOptions}
                            setValue={setDeleteTime}
                            defaultValue={
                              (deleteTime / 24).toString() + ' days'
                            }
                          />
                        </div>
                      </div>
                    </section>

                    {/* delete completed todos after x amount of days */}
                    <section className="bg-slate-100 w-fit h-36 justify-center p-4 rounded shadow-sm grid grid-cols-2">
                      <div>
                        <label
                          className="block text-gray-700 text-md font-bold mb-2"
                          htmlFor="deleteTime"
                        >
                          Color Picker
                        </label>
                        <p className="text-sm">
                          {' '}
                          Pick the color for your pinned todos{' '}
                        </p>
                      </div>

                      <div className="flex justify-center items-center">
                        <ColorPicker color={color} setColor={setColor} />
                      </div>
                      {/*  */}
                    </section>
                    {/* isAddToCal  */}
                    <section className="bg-slate-100  h-36 flex flex-col justify-center p-4 rounded shadow-sm">
                      <div className="mb-">
                        <label
                          className="block text-gray-700 text-md font-bold mb-2"
                          htmlFor="sortby"
                        >
                          Add to Cal
                        </label>
                      </div>

                      <div>
                        <p className="text-xs">
                          {' '}
                          Add new todos to calendar by default{' '}
                        </p>
                        <div className="w-48">
                          <input
                            defaultChecked={isAddToCal}
                            type="checkbox"
                            onChange={() => setIsAddToCal(!isAddToCal)}
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 flex justify-between text-sm  absolute bottom-0 w-full">
              <button
                type="button"
                className="inline-flex  text-blue-600 w-48  rounded-md bg-white px-3 py-2 text-sm justify-center font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
                onClick={handleSubmit}
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="inline-flex text-red-700 w-48 rounded-md bg-white px-3 py-2 justify-center text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
