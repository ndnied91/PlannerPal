import React, { useState, useEffect, useRef } from 'react';

const Container = ({ placeholderText, list, setValue, defaultValue }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    setValue(option);
    setDropdownOpen(false);
    setSelectedOption(option);
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
  }, []);

  return (
    <div className="custom-dropdown-container tracking-normal w-48 text-xs text-gray-500 bg-white mt-2">
      <div
        className="relative border p-2 cursor-pointer bg-white "
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        ref={dropdownRef}
      >
        <div className="flex justify-between self-end">
          <p className="capitalize text-sm">
            {selectedOption || defaultValue || placeholderText}
          </p>
          <span className="arrow-icon flex items-center">
            {isDropdownOpen ? '↑' : '↓'}
          </span>
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full border bg-white shadow z-50">
            {list.map((option, idx) => (
              <div
                key={idx}
                className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 "
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
