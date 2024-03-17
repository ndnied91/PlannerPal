import { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';

import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

import OutsideClickHandler from 'react-outside-click-handler';
import { useGlobalContext } from './todoContext';

import Select from './Select';
import { useEffect } from 'react';

const FormModal = ({ sendToServer, setShowModal, userSettings, showModal }) => {
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

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-0"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative z-10 bg-white w-full max-w-xl rounded-md shadow-lg p-4 m-4">
            <OutsideClickHandler onOutsideClick={() => setShowModal(false)}>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>
              <div className="mt-4">
                {/* Your modal content here */}
                <form onSubmit={handleSubmit} className="mt-4">
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
                  <div className="dropdowns">
                    <div className="flex flex-col w-max">
                      <DatePicker
                        showTimeSelect
                        selected={date}
                        required
                        placeholderText="Due date.."
                        className="text-gray-600 text-sm font-semibold pb-3 pt-3 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        onChange={(date) => setDate(date)}
                        dateFormat="MMMM d, yyyy h:mmaa"
                        open={isDatePickerOpen}
                        onFocus={() => setIsDatePickerOpen(true)}
                        onClose={() => setIsDatePickerOpen(false)}
                        calendarContainer={({ className, children }) => (
                          <div
                            className={`custom-calendar-container ${className}`}
                          >
                            {children}
                          </div>
                        )}
                      />
                    </div>
                    <div className="flex items-center">
                      <Select
                        textPrompt={'Select'}
                        className="relative mt-3 p-3 text-sm font-semibold cursor-pointer bg-white w-32 border-solid border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        userSettings={userSettings}
                        updateCategory={updateCategory}
                      />
                    </div>
                  </div>
                  <section className=" flex justify-center gap-10 md:gap-20 mt-5">
                    <div className="pb-5 items-baseline block">
                      <label
                        className="pt-3 text-gray-600 text-sm font-semibold pb-2  pr-2 focus:outline-none focus:ring-0 focus:border-blue-500"
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
                        className="pt-3 text-gray-600 text-sm font-semibold pb-2  pr-2 focus:outline-none focus:ring-0 focus:border-blue-500"
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
