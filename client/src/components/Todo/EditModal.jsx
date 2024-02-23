import { useEffect, useState } from 'react';
import { useGlobalContext } from './todoContext';
import Select from 'react-dropdown-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { parseISO } from 'date-fns';
import { ImCross } from 'react-icons/im';

import FilterSelect from './FilterSelect';
const EditModal = ({
  setShowEditModal,
  userSettings,
  userContext,
  setUserSettings,
  updateItemsAfterEditTodo,
}) => {
  const { updateItem, updateContent } = useGlobalContext();

  const [currentItem, setCurrentItem] = useState({
    currentTitle: updateItem.title,
    description: updateItem.description,
    isAddedToCal: updateItem.isAddedToCal,
    updateCalEvent: true,
  });

  const [date, setDate] = useState(updateItem.dueDate);
  const [category, setCategory] = useState(updateItem.category);

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
    updateContent(obj);
    updateItemsAfterEditTodo(); //trigger update to items sort by
  };

  return (
    <div className="relative z-50" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 opacity-20 transition-opacity z-10"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center p-4 text-center sm:items-center sm:p-0 h-full">
          <div className="relative transform rounded-lg bg-slate-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl self-center overflow-visible">
            <div className="font-bold text-4xl p-4 border-b border-x-slate-300 flex justify-between items-center ">
              {!updateItem.isCountDown ? (
                <p>Edit Todo </p>
              ) : (
                <p>Edit Countdown </p>
              )}

              <button
                className="text-red-700 max-w-fit rounded-md px-3 py-2 text-sm font-semibold hover:scale-110 duration-300"
                onClick={() => setShowEditModal(false)}
                type="button"
              >
                <ImCross className="text-2xl" />
              </button>
            </div>

            <div className="bg-slate-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-fit">
              <div className="modalClass">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div className="align-center">
                      <form onSubmit={handleSubmit}>
                        {/* title */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                          </label>
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Due
                          </label>
                          <DatePicker
                            showTimeSelect
                            selected={parseISO(date)}
                            onChange={(date) => setDate(date.toISOString())}
                            dateFormat="MMMM d, yyyy h:mmaa"
                            className="mb-3"
                          />
                          <FilterSelect
                            userSettings={userSettings}
                            userContext={userContext}
                            setUserSettings={setUserSettings}
                            updatable={false}
                            updateCategory={updateCategory}
                            category={category}
                          />
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
                            className="block w-96 text-blue-500 text-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
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
      </div>
    </div>
  );
};

export default EditModal;
