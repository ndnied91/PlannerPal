import React, { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';
import { FaCalendarPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function CreateEventButton({ isDarkTheme }) {
  const { setShowEventModal, daySelected } = useContext(GlobalContext);

  const validateDate = () => {
    if (daySelected === null) {
      toast.error('Please select a date');
    } else {
      setShowEventModal(true);
    }
  };

  return (
    <button
      onClick={validateDate}
      className={`${
        isDarkTheme ? 'bg-neutral-700 border-neutral-700' : 'null'
      } border p-2 rounded-lg flex items-center shadow-lg hover:shadow-md w-52`}
    >
      <span className="pl-3 pr-7 flex justify-center w-full items-center">
        <FaCalendarPlus
          className={`${
            isDarkTheme ? 'text-slate-50 ' : 'text-gray-500 '
          } w-7 h-7 `}
        />
        <p
          className={`   ${
            isDarkTheme ? 'text-slate-50 ' : 'text-gray-500 '
          } text-2xl pl-3 font-bold`}
        >
          {' '}
          Create
        </p>
      </span>
    </button>
  );
}
