import { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import OutsideClickHandler from 'react-outside-click-handler';
import { useGlobalContext } from './todoContext';

import Select from './Select';
import { useEffect } from 'react';

const FormModal = ({ sendToServer, setShowModal, userSettings, showModal }) => {
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
  }, []);
  const [currentPane, setCurrentPane] = useState('todo');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (event) => {
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
      sendToServer(currentItem, currentPane);
    }
  };

  const updateCategory = (e) => {
    setCategory(e);
  };

  const handleMouseLeave = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 ${
          showModal
            ? 'opacity-100 duration-200'
            : 'opacity-0 hidden duration-100'
        } `}
      ></div>
      <div
        className={`fixed inset-0 z-10 w-screen overflow-y-auto ${
          showModal
            ? 'opacity-100 translate-y-0 duration-50'
            : 'opacity-0 translate-y-2 invisible duration-50'
        }`}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <OutsideClickHandler
            onOutsideClick={() => {
              setShowModal(false);
              setDate('');
              setCurrentItem({
                currentTitle: '',
                description: '',
                isAddedToCal: userSettings?.isAddToCal,
                isPriority: false,
              });
            }}
          >
            <div className="relative transform overflow-visible  bg-slate-00 text-left shadow-xl transition-all sm:my-8 sm:max-w-4xl self-center w-[20rem] md:w-[32rem]">
              <div className="font-bold text-4xl p-2 pt-0 pb-0 flex justify-end items-center bg-gray-100 ">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-grey-400 max-w-fit py-2 text-sm font-semibold hover:scale-110 duration-300"
                >
                  <IoMdClose className="text-2xl m-1" />
                </button>
              </div>

              <div className="bg-white 100 px-4 pb-4 !pt-4 sm:p-6 sm:pb-4">
                <section className="flex justify-around capitalize items-stretch gap-4 mb-4 ">
                  <div
                    onClick={() => setCurrentPane('todo')}
                    className={`${
                      currentPane === 'todo'
                        ? 'bg-white text-sm font-semibold tracking-wider text-gray-800 border rounded-sm hover:bg-gray-100 duration-200'
                        : 'bg-white text-sm  text-gray-400 border hover:bg-gray-100 duration-200'
                    } w-full h-10 text-center flex justify-center items-center cursor-pointer hover:opacity-90 duration-300  `}
                  >
                    {' '}
                    todo
                  </div>
                  <div
                    className={`${
                      currentPane === 'countdown'
                        ? 'bg-white text-sm font-semibold tracking-wider text-gray-800 border rounded-sm hover:bg-gray-100 duration-200'
                        : 'bg-white text-sm text-gray-400 border rounded-sm hover:bg-gray-100 duration-200'
                    } w-full h-10 text-center flex justify-center items-center cursor-pointer hover:opacity-90 duration-300   `}
                    onClick={() => setCurrentPane('countdown')}
                  >
                    {' '}
                    countdown
                  </div>
                </section>
                <div className="align-center mb-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        className="pt-3 text-gray-600 text-md font-semibold pb-2 w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        id="currentTitle"
                        type="text"
                        name="currentTitle"
                        maxLength="20"
                        value={currentItem.currentTitle}
                        placeholder="Title"
                        required
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    {/* description */}
                    <div className="mb-2">
                      <textarea
                        className="pt-3 text-gray-600 text-md font-semibold w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        id="description"
                        type="textarea"
                        name="description"
                        placeholder="Description"
                        required
                        value={currentItem.description}
                        onChange={handleChange}
                      />
                    </div>
                    {/* time */}

                    <div className="dropdowns">
                      <div
                        onMouseLeave={handleMouseLeave}
                        className="flex flex-col max-w-fit"
                      >
                        <DatePicker
                          showTimeSelect
                          selected={date}
                          required
                          placeholderText="Due date.."
                          className="text-gray-600 text-sm font-semibold pb-3 pt-3 !w-60 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                          onChange={(date) => setDate(date)}
                          dateFormat="MMMM d, yyyy h:mmaa"
                          open={isDatePickerOpen}
                          onFocus={() => setIsDatePickerOpen(true)}
                          onClose={() => setIsDatePickerOpen(false)}
                        />
                      </div>
                      {/* here */}
                      <div className="flex items-center">
                        <Select
                          textPrompt={'Select'}
                          className="relative mt-3 p-3 text-sm font-semibold cursor-pointer bg-white w-32 border-solid border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                          userSettings={userSettings}
                          updateCategory={updateCategory}
                        />
                      </div>
                    </div>

                    {/* cal */}
                    <section className=" flex justify-center gap-10 md:gap-20 mt-5">
                      {currentPane === 'todo' ? (
                        <div className="pb-5 items-baseline block">
                          <label
                            className="pt-3 text-gray-600 text-sm font-semibold pb-2 w-full pr-2 focus:outline-none focus:ring-0 focus:border-blue-500"
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
                      ) : (
                        <div className="pb-5">
                          <input className="invisible" type="checkbox" />
                        </div>
                      )}

                      {currentPane === 'todo' ? (
                        <div className="pb-2">
                          <label
                            className="pt-3 text-gray-600 text-sm font-semibold pb-2 w-full pr-2 focus:outline-none focus:ring-0 focus:border-blue-500"
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
                      ) : (
                        <div className="pb-2">
                          <input className="invisible" type="checkbox" />
                        </div>
                      )}
                    </section>

                    <div className="flex justify-center">
                      <button
                        className="block w-96 text-white text-center rounded-md bg-gray-800 px-3 py-2 h-12 text-sm font-semibold shadow-sm hover:opacity-90 sm:mt-0 tracking-widest"
                        type="submit"
                      >
                        {currentPane === 'todo'
                          ? 'Create Todo'
                          : 'Create Countdown'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
