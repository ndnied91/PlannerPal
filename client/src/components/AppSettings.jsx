import { useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import Select from 'react-dropdown-select';

const AppSettings = ({
  setShowSettingsModal,
  userContext,
  setUserSettings,
}) => {
  const [urgency, setUrgency] = useState();
  const [sortBy, setSortBy] = useState('');
  const [deleteTime, setDeleteTime] = useState('');

  const handleSubmit = async () => {
    const options = {
      createdBy: userContext._id,
      urgency: urgency !== undefined ? urgency[0].value : undefined,
      sortBy: sortBy[0] !== undefined ? sortBy[0].label : undefined,
      deleteTime: deleteTime[0] !== undefined ? deleteTime[0].value : undefined,
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

  const timeOptions = [
    {
      value: 24,
      label: '1 day',
    },
    {
      value: 48,
      label: '2 days ',
    },
    {
      value: 168,
      label: '7 days ',
    },
    {
      value: 720,
      label: '30 days ',
    },
  ];

  const sortOptions = [
    {
      value: 1,
      label: 'Due date',
    },
    {
      value: 2,
      label: 'A-Z',
    },
    {
      value: 3,
      label: 'Z-A',
    },
  ];

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl self-center h-[720px]">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-max">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div>
                      <form>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-lg font-bold mb-2 text-center "
                            htmlFor="currentTitle"
                          >
                            App Settings
                          </label>
                        </div>

                        <div className="flex justify-around items-center flex-wrap">
                          <section className="bg-slate-300  h-36 flex flex-col justify-center p-4 rounded shadow-md">
                            {/* description */}
                            <div className="mb-">
                              <label
                                className="block text-gray-700 text-md font-bold mb-2"
                                htmlFor="Overview"
                              >
                                Overview
                              </label>
                            </div>

                            <div>
                              <p className="text-sm">
                                {' '}
                                Select the urgency factor{' '}
                              </p>
                              <div className="">
                                <Select
                                  className="text-xs bg-white mt-2"
                                  options={timeOptions}
                                  required
                                  multi={false}
                                  name="select"
                                  placeholder="Select an option"
                                  onChange={(e) => setUrgency(e)}
                                />
                              </div>
                            </div>
                          </section>
                          {/* sort by */}
                          <section className="bg-slate-300  h-36 flex flex-col justify-center p-4 rounded shadow-md">
                            <div className="mb-">
                              <label
                                className="block text-gray-700 text-md font-bold mb-2"
                                htmlFor="sortby"
                              >
                                Sort by
                              </label>
                            </div>

                            <div>
                              <p className="text-sm"> Sort todos by.. </p>
                              <div className="w-48">
                                <Select
                                  className="text-xs bg-white mt-2"
                                  options={sortOptions}
                                  onChange={(e) => setSortBy(e)}
                                  placeholder="Select an option"
                                />
                              </div>
                            </div>
                          </section>

                          {/* delete completed todos after x amount of days */}
                          <section className="bg-slate-300 w-64 h-36 flex flex-col justify-center p-4 rounded shadow-md">
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
                                <Select
                                  className="text-xs bg-white mt-2"
                                  options={timeOptions}
                                  onChange={(e) => setDeleteTime(e)}
                                  placeholder="Delete time.."
                                />
                              </div>
                            </div>
                          </section>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
