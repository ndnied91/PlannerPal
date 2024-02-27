import React, { useState, useEffect, useRef } from 'react';

const Select = ({
  userSettings,
  updateCategory,
  category,
  className,
  textPrompt,
}) => {
  var labelArr = [];

  labelArr = userSettings.filterOptions.map((item) => item);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(category || '');
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
                <p className="capitalize">{option}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
