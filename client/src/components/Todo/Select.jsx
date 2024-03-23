import React, { useState, useEffect, useRef } from 'react';

const Select = ({
  userSettings,
  updateCategory,
  category,
  className,
  textPrompt,
  isDarkTheme,
}) => {
  var labelArr = [];

  labelArr = userSettings.filterOptions.map((item) => item);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(category || 'all');
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    updateCategory(option);
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
      return `${textPrompt} ↓`;
    }
  };

  return (
    <div className="custom-dropdown-container tracking-wider text-sm font-normal text-justify w-full">
      <div
        htmlFor="title"
        className={`${
          isDarkTheme ? 'text-slate-200' : 'text-gray-400'
        } text-sm font-bold pt-3 `}
      >
        Category
      </div>
      <div
        className={className}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        ref={dropdownRef}
      >
        <div className="flex justify-between ">
          <p
            className={`${
              isDarkTheme ? 'text-slate-50' : 'text-gray-700'
            } capitalize tracking-wider`}
          >
            {selectedOption}
          </p>
          <span
            className={`${
              isDarkTheme ? 'text-slate-50' : 'text-gray-600'
            } arrow-icon  tracking-widest flex !items-start`}
          >
            {renderIcon()}
          </span>
        </div>
        {isDropdownOpen && (
          <div
            className={`${
              isDarkTheme ? 'bg-neutral-500' : 'bg-white border'
            } absolute top-full left-0 w-full  shadow`}
          >
            {labelArr.map((option) => {
              if (option !== 'add +') {
                return (
                  <div
                    key={option}
                    className={` ${
                      isDarkTheme ? 'hover:bg-neutral-400' : 'hover:bg-gray-100'
                    } p-2 items-start cursor-pointer `}
                    onClick={() => handleSelectOption(option)}
                  >
                    <p className="capitalize">{option}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
