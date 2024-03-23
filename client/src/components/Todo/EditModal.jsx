import Select from './Select';

import React, { useEffect, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from './todoContext';
import { MdOutlineClose } from 'react-icons/md';

const EditModal = ({
  setShowEditModal,
  userSettings,
  setUserSettings,
  updateItemsAfterEditTodo,
  showEditModal,
  isDarkTheme,
}) => {
  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEditModal]);

  const { updateItem, updateContent } = useGlobalContext();

  const [currentItem, setCurrentItem] = useState({
    currentTitle: updateItem.title,
    description: updateItem.description,
    isAddedToCal: updateItem.isAddedToCal,
    updateCalEvent: true,
  });

  const [date, setDate] = useState(updateItem.dueDate);
  const [category, setCategory] = useState(updateItem.category);

  const modalRef = useRef(null);

  const updateCategory = (e) => {
    setCategory(e);
  };

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCurrentItem({ ...currentItem, updateCalEvent: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      _id: updateItem._id,
      title: currentItem.currentTitle,
      description: currentItem.description,
      dueDate: date,
      category: category,
    };

    currentItem.updateCalEvent ? (obj['calCode'] = updateItem.calCode) : null;
    updateContent(obj, userSettings.sortBy);
    updateItemsAfterEditTodo(); //trigger update to items sort by
    setShowEditModal(false);
  };

  return (
    <>
      {showEditModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-10">
          <div
            ref={modalRef}
            className={`${
              isDarkTheme ? 'bg-neutral-900' : 'bg-white'
            } relative z-10 h-full md:h-fit w-full max-w-xl rounded-md shadow-lg`}
          >
            <div
              className={`${
                isDarkTheme ? 'bg-neutral-950' : 'bg-gray-200'
              } font-bold text-4xl p-2 pt-0 pb-0 flex justify-between items-center `}
            >
              <p
                className={`${
                  isDarkTheme ? 'text-slate-50' : 'text-gray-600'
                } text-sm ml-1 pt-1 tracking-widest`}
              >
                Edit
              </p>
              <button
                className="text-gray-400 max-w-fit py-2 text-sm font-semibold hover:scale-110 duration-300"
                onClick={() => setShowEditModal(false)}
                type="button"
              >
                <MdOutlineClose
                  className={`cursor-pointer text-3xl
                  ${isDarkTheme ? 'text-gray-100' : 'text-neutral-800'} `}
                />
              </button>
            </div>
            <div className="h-full w-full mt-[5%] md:mt-0 ">
              <div className="">
                <div className="mt-3 sm:mt-0 sm:text-left h-full">
                  <div className="mt-2">
                    <div className="align-center">
                      <form onSubmit={handleSubmit} className="p-4">
                        {/* title */}
                        <div className="mb-4">
                          <label
                            className={`${
                              isDarkTheme ? 'text-slate-200' : 'text-gray-400'
                            } text-sm font-bold flex`}
                          >
                            Title
                          </label>
                          <input
                            className={` ${
                              isDarkTheme
                                ? 'text-slate-50 border-none bg-neutral-700'
                                : 'text-gray-600 border-gray-200'
                            } pl-3 cursor-pointer rounded-sm w-full capitalize pt-2 text-sm font-semibold pb-2 border md:min-w-96 `}
                            id="currentTitle"
                            type="text"
                            name="currentTitle"
                            placeholder="Title"
                            required
                            value={currentItem.currentTitle}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        {/* description */}
                        <div className="mb-1">
                          <label
                            className={`${
                              isDarkTheme ? 'text-slate-200' : 'text-gray-400'
                            } text-sm font-bold flex`}
                          >
                            Description
                          </label>
                          <textarea
                            className={` ${
                              isDarkTheme
                                ? 'text-slate-50 border-none bg-neutral-700'
                                : 'text-gray-600 border-gray-200'
                            } pl-3 cursor-pointer rounded-sm w-full capitalize pt-3 text-sm font-semibold pb-2 border md:min-w-96 `}
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
                        <div className="mb-4 flex flex-col justify-start">
                          <label
                            className={`${
                              isDarkTheme ? 'text-slate-200' : 'text-gray-400'
                            } text-sm font-bold flex`}
                          >
                            Due Date
                          </label>
                          <DatePicker
                            showTimeSelect
                            selected={parseISO(date)}
                            onChange={(date) => setDate(date.toISOString())}
                            dateFormat="MMMM d, yyyy h:mmaa"
                            className={`${
                              isDarkTheme
                                ? 'bg-neutral-700 text-slate-50'
                                : 'text-gray-600 border-gray-200 border'
                            } rounded-sm cursor-pointer text-sm font-semibold pb-3 pt-3 pl-3`}
                          />
                          <div className="flex items-center">
                            <Select
                              textPrompt={'Select'}
                              className={`${
                                isDarkTheme
                                  ? 'bg-neutral-700'
                                  : 'border-gray-200 border'
                              } relative p-3 text-sm font-semibold cursor-pointer`}
                              userSettings={userSettings}
                              setUserSettings={setUserSettings}
                              updatable={false}
                              updateCategory={updateCategory}
                              category={category}
                              isDarkTheme={isDarkTheme}
                            />
                          </div>
                        </div>
                        {updateItem.calCode ? (
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Update Calendar event?
                            </label>
                            <input
                              className="bg-slate-200"
                              type="checkbox"
                              checked={currentItem.updateCalEvent}
                              onChange={handleCheckboxChange}
                            />
                          </div>
                        ) : null}
                        <div className="flex justify-center">
                          <button
                            className="block m:w-96 w-full text-white text-center rounded-md bg-gray-800 px-3 py-2 h-12 text-sm font-semibold shadow-sm hover:opacity-90 sm:mt-0 tracking-widest"
                            type="submit"
                          >
                            {!updateItem.isCountDown ? (
                              <p>Update Todo </p>
                            ) : (
                              <p>Update Countdown </p>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
