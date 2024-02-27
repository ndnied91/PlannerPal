import { useEffect, useState } from 'react';
import { useGlobalContext } from './todoContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { parseISO } from 'date-fns';

import { IoMdClose } from 'react-icons/io';

import FilterSelect from './FilterSelect';
import FormEditModal from './FormEditModal';
import OutsideClickHandler from 'react-outside-click-handler';

const EditModal = ({
  setShowEditModal,
  userSettings,
  userContext,
  setUserSettings,
  updateItemsAfterEditTodo,
}) => {
  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center p-4 text-center sm:items-center sm:p-0 h-full">
          <div className="transform  bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-4xl self-center overflow-visible w-[32rem]">
            <div className="font-bold text-4xl p-2 pt-0 pb-0 flex justify-between items-center bg-gray-100">
              <p className="text-sm ml-1 pt-1 text-gray-600 tracking-widest">
                Edit
              </p>
              <button
                className="text-gray-400 max-w-fit   py-2 text-sm font-semibold hover:scale-110 duration-300"
                onClick={() => setShowEditModal(false)}
                type="button"
              >
                <IoMdClose className="text-2xl m-1" />
              </button>
            </div>

            <div>
              {/* <OutsideClickHandler
                onOutsideClick={() => {
                  setShowEditModal(false);
                }}
              > */}
              <FormEditModal
                updateItemsAfterEditTodo={updateItemsAfterEditTodo}
                userSettings={userSettings}
                userContext={userContext}
                setUserSettings={setUserSettings}
              />
              {/* </OutsideClickHandler> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
