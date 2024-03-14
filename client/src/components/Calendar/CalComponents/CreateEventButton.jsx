import React, { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';
import { FaCalendarPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function CreateEventButton() {
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
      className={`border p-2 rounded-lg flex items-center shadow-lg hover:shadow-md w-52`}
    >
      <span className="pl-3 pr-7 flex justify-center w-full items-center">
        <FaCalendarPlus className="w-7 h-7 text-gray-500" />
        <p className={`text-2xl pl-3 font-bold text-gray-500 `}> Create</p>
      </span>
    </button>
  );
}
