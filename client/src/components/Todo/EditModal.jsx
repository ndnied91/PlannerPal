import React from 'react';
import { useState } from 'react';
import { useGlobalContext } from './todoContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  toDate,
  parseISO,
  differenceInMilliseconds,
  addMilliseconds,
  addHours,
} from 'date-fns';

const EditModal = ({ setShowEditModal }) => {
  const { updateItem, updateContent } = useGlobalContext();

  const [currentItem, setCurrentItem] = useState({
    currentTitle: updateItem.title,
    description: updateItem.description,
    isAddedToCal: updateItem.isAddedToCal,
    updateCalEvent: true,
  });

  const [date, setDate] = useState(updateItem.dueDate);

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
    };

    currentItem.updateCalEvent ? (obj['calCode'] = updateItem.calCode) : null;
    updateContent(obj);
  };
  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl self-center">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="modalClass">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div className="align-center">
                      <form onSubmit={handleSubmit}>
                        {/* title */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor=""
                          >
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
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor=""
                          >
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
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="Description"
                          >
                            Due
                          </label>
                          {/* <input
                            className="bg-slate-200"
                            type="date"
                            value={date}
                            onChange={onDateChange}
                          /> */}
                          <DatePicker
                            showTimeSelect
                            selected={parseISO(date)}
                            onChange={(date) => setDate(date.toISOString())}
                            dateFormat="MMMM d, yyyy h:mmaa"
                          />
                        </div>

                        {/* cal */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="isAddedToCal"
                          >
                            Update Calendar event?
                          </label>
                          <input
                            className="bg-slate-200"
                            type="checkbox"
                            checked={currentItem.updateCalEvent}
                            onChange={handleCheckboxChange}
                          />
                        </div>

                        <div className="flex justify-center">
                          <button
                            className="block w-96 text-blue-500 text-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
                            type="submit"
                          >
                            Update Todo
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 flex justify-between text-sm">
              <div className="flex place-items-center" id="tessst"></div>
              <button
                onClick={() => setShowEditModal(false)}
                type="button"
                className="inline-flex  text-red-700 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 w-auto"
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

export default EditModal;
