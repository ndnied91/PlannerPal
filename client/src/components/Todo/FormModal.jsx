import { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { MdOutlineClose } from 'react-icons/md';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isMobile } from 'react-device-detect';

import OutsideClickHandler from 'react-outside-click-handler';
import { useGlobalContext } from './todoContext';
import Select from './Select';
import { useEffect } from 'react';

const FormModal = ({
  sendToServer,
  setShowModal,
  userSettings,
  showModal,
  isDarkTheme,
}) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const { filteredBy } = useGlobalContext();
  const [date, setDate] = useState('');
  const [category, setCategory] = useState(filteredBy);

  const [currentItem, setCurrentItem] = useState({
    currentTitle: '',
    description: '',
    isAddedToCal: userSettings?.isAddToCal,
    isPriority: false,
  });

  useEffect(() => {
    if (!showModal) {
      setDate('');
      setCurrentItem({
        currentTitle: '',
        description: '',
        isAddedToCal: userSettings?.isAddToCal,
        isPriority: false,
      });
    }
  }, [showModal]);

  const [currentPane, setCurrentPane] = useState('todo');

  const clearState = () => {
    setDate('');
    setCurrentItem({
      currentTitle: '',
      description: '',
      isAddedToCal: userSettings?.isAddToCal,
      isPriority: false,
    });
    //clear state after success item creation
  };

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentItem.isAddedToCal) {
      currentItem['day'] = dayjs(date).valueOf();
      currentItem['label'] = 'red';
      currentItem['calCode'] = Math.random().toString(36).substr(2, 10);
    }
    currentItem['dueDate'] = date;

    if (category) {
      currentItem['category'] = category;
    } else {
      currentItem['category'] = 'all';
    }

    if (currentItem.isAddedToCal && date.length === 0) {
      toast.error('Date must be selected!');
    } else {
      const res = await sendToServer(currentItem, currentPane);
      if (res) clearState();
    }
  };

  const updateCategory = (e) => {
    setCategory(e);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 z-0`}
            onClick={() => setShowModal(false)}
          ></div>
          <div
            className={` ${
              isDarkTheme ? 'bg-neutral-900' : 'bg-white'
            } relative z-10 h-full md:h-fit w-full max-w-xl rounded-md shadow-lg `}
          >
            {' '}
            <OutsideClickHandler
              onOutsideClick={() => !isMobile && setShowModal(false)}
            >
              <div
                className={`font-bold flex justify-between pl-4 h-12 pt-2 pr-2`}
              >
                <p
                  className={`${
                    isDarkTheme ? 'text-slate-50' : 'text-gray-600'
                  } ml-1 pt-1 tracking-widest text-base`}
                >
                  Create Item
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-gray-500 hover:text-gray-700 flex"
                >
                  <MdOutlineClose
                    className={`cursor-pointer text-3xl
                  ${isDarkTheme ? 'text-gray-100' : 'text-neutral-800'} `}
                  />
                </button>
              </div>
              <section className="flex mt-2 ml-4 mr-4 gap-2 ">
                <div
                  onClick={() => setCurrentPane('todo')}
                  className={`${
                    currentPane === 'todo'
                      ? `${
                          isDarkTheme
                            ? 'bg-neutral-600 hover:bg-gray-500 text-gray-100'
                            : 'bg-white hover:bg-gray-100 text-gray-800'
                        }  text-sm capitalize font-semibold tracking-wider border rounded-sm duration-200`
                      : `${
                          isDarkTheme
                            ? 'bg-neutral-600 hover:bg-gray-500 text-gray-500'
                            : 'bg-white text-gray-400 hover:bg-gray-100'
                        } text-sm capitalize border duration-200`
                  } w-full h-10 text-center flex justify-center items-center cursor-pointer hover:opacity-90 duration-300`}
                >
                  {' '}
                  todo
                </div>
                <div
                  className={`${
                    currentPane === 'countdown'
                      ? `${
                          isDarkTheme
                            ? 'bg-neutral-600 hover:bg-gray-500 text-gray-100'
                            : 'bg-white text-gray-800 hover:bg-gray-100'
                        }  text-sm capitalize font-semibold tracking-wider border rounded-sm duration-200`
                      : `${
                          isDarkTheme
                            ? 'bg-neutral-600 hover:bg-gray-500 text-gray-500 text-sm'
                            : 'bg-white hover:bg-gray-100 text-gray-400 '
                        }  capitalize border rounded-sm duration-200`
                  } w-full h-10 text-center flex justify-center items-center cursor-pointer hover:opacity-90 duration-300`}
                  onClick={() => setCurrentPane('countdown')}
                >
                  {' '}
                  countdown
                </div>
              </section>
              <div>
                {/* Your modal content here */}
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="mb-4">
                    <div
                      htmlFor="title"
                      className={`${
                        isDarkTheme ? 'text-slate-200' : 'text-gray-400'
                      } text-sm font-bold flex`}
                    >
                      Title
                    </div>
                    <input
                      className={` ${
                        isDarkTheme
                          ? 'text-slate-50 border-none bg-neutral-700'
                          : 'text-gray-600 border-gray-200'
                      } pl-3 cursor-pointer rounded-sm w-full capitalize pt-2 text-sm font-semibold pb-2 border md:min-w-96 `}
                      id="currentTitle"
                      type="text"
                      name="currentTitle"
                      maxLength="20"
                      value={currentItem.currentTitle}
                      placeholder="Add a title.."
                      required
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-2">
                    <div
                      htmlFor="title"
                      className={`${
                        isDarkTheme ? 'text-slate-200' : 'text-gray-400'
                      } text-sm font-bold flex`}
                    >
                      Description
                    </div>
                    <textarea
                      className={` ${
                        isDarkTheme
                          ? 'text-slate-50 border-none bg-neutral-700'
                          : 'text-gray-600 border-gray-200'
                      } pl-3 cursor-pointer rounded-sm w-full capitalize pt-3 text-sm font-semibold pb-2 border md:min-w-96 `}
                      id="description"
                      type="textarea"
                      name="description"
                      placeholder="Add a description.."
                      required
                      value={currentItem.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="contents">
                      <div
                        htmlFor="dueDate"
                        className={`${
                          isDarkTheme ? 'text-slate-200' : 'text-gray-400'
                        } text-sm font-bold flex`}
                      >
                        Due Date
                      </div>
                      <DatePicker
                        selected={date}
                        required
                        showTimeSelect
                        placeholderText="Add a due date.."
                        onChange={(date) => setDate(date)}
                        dateFormat="MMMM d, yyyy h:mmaa"
                        className={`${
                          isDarkTheme
                            ? 'bg-neutral-700 text-slate-50'
                            : 'text-gray-600 border-gray-200 border'
                        } rounded-sm cursor-pointer text-sm font-semibold pb-3 pt-3 pl-3`}
                      />
                    </div>

                    <div className="flex items-center">
                      <Select
                        textPrompt={'Select'}
                        className={`${
                          isDarkTheme
                            ? 'bg-neutral-700'
                            : 'border-gray-200 border'
                        } relative p-3 text-sm font-semibold cursor-pointer`}
                        userSettings={userSettings}
                        updateCategory={updateCategory}
                        isDarkTheme={isDarkTheme}
                      />
                    </div>
                  </div>
                  <section className=" flex justify-center gap-10 md:gap-20 mt-5">
                    {currentPane === 'todo' ? (
                      <>
                        <div className="pb-5 items-baseline block">
                          <label
                            className={`${
                              isDarkTheme ? 'text-slate-50' : 'text-gray-600'
                            } pt-3  text-sm font-semibold pb-2 pr-2 focus:outline-none`}
                            htmlFor="isAddedToCal"
                          >
                            Add to Cal?
                          </label>
                          <input
                            className="bg-white"
                            type="checkbox"
                            name="isAddedToCal"
                            checked={currentItem.isAddedToCal}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                        <div className="pb-2">
                          <label
                            className={`${
                              isDarkTheme ? 'text-slate-50' : 'text-gray-600'
                            } pt-3  text-sm font-semibold pb-2 pr-2 focus:outline-none`}
                            htmlFor="isAddedToCal"
                          >
                            Add to Priority?
                          </label>
                          <input
                            type="checkbox"
                            name="isPriority"
                            checked={currentItem.isPriority}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                      </>
                    ) : null}
                  </section>
                  <div className="flex justify-center">
                    <button
                      className="block m:w-96 w-full text-white text-center rounded-md bg-gray-800 px-3 py-2 h-12 text-sm font-semibold shadow-sm hover:opacity-90 sm:mt-0 tracking-widest"
                      type="submit"
                    >
                      {currentPane === 'todo'
                        ? 'Create Todo'
                        : 'Create Countdown'}
                    </button>
                  </div>
                </form>
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
