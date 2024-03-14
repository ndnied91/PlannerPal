import React, { useState, useEffect, useRef } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import { useGlobalContext } from './todoContext';

const FilterSelect = ({
  userSettings,
  setUserSettings,
  updatable,
  category,
  setFilteredBy,
  className,
  textPrompt,
}) => {
  var labelArr = [];

  const { userContext, getFilteredItems } = useGlobalContext();

  if (!updatable) {
    const itemsToRemove = ['add +'];
    labelArr = userSettings.filterOptions.filter(
      (item) => !itemsToRemove.includes(item)
    );
  } else {
    labelArr = userSettings.filterOptions.map((item) => item);
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentFilterOption, setCurrentFilterOption] = useState(
    category || ''
  );

  useEffect(() => {
    getFilteredItems(currentFilterOption, userSettings.sortBy);
    setFilteredBy(currentFilterOption);
  }, [currentFilterOption]);

  const dropdownRef = useRef(null);

  const handleSelectOption = async (option) => {
    setCurrentFilterOption(option);
    setDropdownOpen(false);
  };

  const updateSettings = async () => {
    const { data } = await customFetch.get(`/settings/${userContext._id}`);
    setUserSettings(data.userSettings[0]);
  };

  const handleDeleteClick = async (option) => {
    if (option === 'all') return;
    const filtered = userSettings.filterOptions.filter(
      (item) => item !== option
    );

    try {
      await customFetch.post(`/settings/filters/${userContext._id}`, {
        filterOptions: filtered, //new array of filters without the deleted one
        toRemove: option, //deleted item
      });
      getFilteredItems('all', userSettings.sortBy);
      updateSettings();
      setCurrentFilterOption('all');
      setFilteredBy('all'); //after deleting filter set back to 'all'
    } catch (e) {
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
    } else if (currentFilterOption !== '' && !isDropdownOpen) {
      return '↓';
    } else {
      return `${textPrompt} ↓`;
    }
  };

  return (
    <div className="custom-dropdown-container tracking-wider min-w-24 w-32 text-sm font-normal pr-2 ">
      <div
        className={className}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        ref={dropdownRef}
      >
        <div className="flex justify-between">
          <p className="capitalize tracking-wider text-gray-700">
            {currentFilterOption}
          </p>
          <span
            className="arrow-icon text-gray-600 tracking-widest flex items-center"
            id="icon"
          >
            {renderIcon()}
          </span>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0  border bg-white shadow w-max z-30">
            <div>
              {labelArr.map((option) => {
                if (option === 'add +') {
                  return (
                    <div
                      key={option}
                      className={`p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
                        option === 'add +' ? 'font-bold' : 'font-normal'
                      }`}
                      onClick={() => handleSelectOption(option)}
                    >
                      {' '}
                      <p className="capitalize">{option}</p>
                      <button
                        className="px-2 py-1 text-white rounded"
                        onClick={() => handleDeleteClick(option)}
                      ></button>
                    </div>
                  );
                }
              })}
            </div>
            <div>
              {labelArr.map((option) => {
                if (option !== 'add +') {
                  return (
                    <div
                      key={option}
                      className={`p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
                        option === 'add +' ? 'font-bold' : 'font-normal'
                      }`}
                      onClick={() => handleSelectOption(option)}
                    >
                      {option === 'all' || option === 'add +' ? (
                        <>
                          <p className="capitalize">{option}</p>
                          <button
                            className="px-2 py-1 text-white rounded absolute z-20"
                            onClick={() => handleDeleteClick(option)}
                          ></button>
                        </>
                      ) : (
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
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSelect;
