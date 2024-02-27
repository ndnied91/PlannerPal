import React, { useState, useEffect, useRef } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const FilterSelect = ({
  userSettings,
  userContext,
  filterItems,
  setUserSettings,
  updatable,
  updateCategory,
  category,
  setFilteredBy,
  className,
  textPrompt,
}) => {
  var labelArr = [];

  if (!updatable) {
    const itemsToRemove = ['add +'];
    labelArr = userSettings.filterOptions.filter(
      (item) => !itemsToRemove.includes(item)
    );
  } else {
    labelArr = userSettings.filterOptions.map((item) => item);
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(category || '');
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    if (updatable) {
      filterItems(option, userSettings.sortBy);
    }

    setSelectedOption(option);
    setDropdownOpen(false);
    if (!updatable) {
      updateCategory(option);
    }
  };

  const handleDeleteClick = async (option) => {
    const filtered = userSettings.filterOptions.filter(
      (item) => item !== option
    );

    //here is where we need to check if there are items that are associated with the filter to be deleted

    try {
      const { data } = await customFetch.post(
        `/settings/filters/${userContext._id}`,
        {
          filterOptions: filtered,
          toRemove: option,
        }
      );

      setUserSettings(data.settings);
      setSelectedOption('all');
      setFilteredBy('all');
      filterItems('all', userSettings.sortBy);
      //here we need to set the filtedBy that is coming from globalContext TODO
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.error);
    }
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []); // Run this effect once, on component mount

  const renderIcon = () => {
    if (isDropdownOpen) {
      return '↑';
    } else if (selectedOption !== '' && !isDropdownOpen) {
      return '↓';
    } else {
      // return 'Select ↓';
      return `${textPrompt} ↓`;
    }
  };

  return (
    <div className="custom-dropdown-container tracking-wider min-w-24 w-fit text-sm font-normal pr-2">
      <div
        className={className}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        ref={dropdownRef}
      >
        <div className="flex justify-between">
          <p className="capitalize tracking-wider text-gray-700">
            {selectedOption}
          </p>
          <span
            className="arrow-icon text-gray-600 tracking-widest flex items-center"
            id="icon"
          >
            {renderIcon()}
          </span>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full border bg-white shadow">
            {labelArr.map((option) => (
              <div
                key={option}
                className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 "
                onClick={() => handleSelectOption(option)}
              >
                {option === 'all' || option === 'add +' ? (
                  <>
                    <p className="capitalize">{option}</p>
                    <button
                      className="px-2 py-1 text-white rounded"
                      onClick={() => handleDeleteClick(option)}
                    ></button>
                  </>
                ) : (
                  <>
                    <>
                      <p className="capitalize">{option}</p>
                      {updatable && (
                        <button
                          className="px-2 py-1 text-gray-900 hover:scale-110 duration-300 rounded"
                          onClick={() => handleDeleteClick(option)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      )}
                    </>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSelect;
