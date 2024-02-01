import React, { useState } from 'react';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
const arrayContainsObject = (array, object) => {
  return array.some((item) =>
    Object.keys(item).every((key) => item[key] === object[key])
  );
};

const FilterPopover = ({
  userContext,
  userSettings,
  setUserSettings,
  setAddNewFilter,
}) => {
  const [filter, setFilter] = useState('');

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
    <div className="text-xs font-normal flex flex-row justify-center mt-2">
      <input
        className="h-9 rounded-sm  !border-gray-300"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Add new filter"
      />
      <button
        className="bg-gray-300 rounded-md ml-2 p-1 shadow-md tracking-wide"
        onClick={handleSubmit}
      >
        {' '}
        Submit
      </button>
    </div>
  );
};

export default FilterPopover;
