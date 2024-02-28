import React, { useState } from 'react';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGlobalContext } from './todoContext';
const arrayContainsObject = (array, object) => {
  return array.some((item) =>
    Object.keys(item).every((key) => item[key] === object[key])
  );
};

const FilterPopover = ({ userSettings, setUserSettings }) => {
  const [filter, setFilter] = useState('');

  const { userContext, setAddNewFilter } = useGlobalContext();

  const handleSubmit = async () => {
    let updatedFilter = [...userSettings.filterOptions];
    let newItem = filter.toLowerCase();

    if (arrayContainsObject(updatedFilter, newItem)) {
      toast.error('Category already exists');
    } else {
      updatedFilter.push(newItem);
      //send request to update settings to specific user
      const { data } = await customFetch.post(`/settings/${userContext._id}`, {
        filterOptions: updatedFilter,
      });

      setUserSettings(data.settings);
      setAddNewFilter(false);
      setFilter('');
    }
  };

  return (
    <div className="text-xs font-normal flex flex-row justify-center mr-2">
      <input
        className="rounded-sm  !border-gray-300"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Add new filter"
        maxLength={10}
      />
      <button
        className="bg-black rounded-md ml-2 p-1 shadow-md tracking-wide text-white"
        onClick={handleSubmit}
      >
        {' '}
        <AiOutlinePlus className="w-10 text-2xl" />
      </button>
    </div>
  );
};

export default FilterPopover;
