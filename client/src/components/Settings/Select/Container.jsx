import React, { useState, useEffect, useRef } from 'react';

const Container = ({
  placeholderText,
  list,
  setValue,
  defaultValue,
  isDarkTheme,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    setValue(option); //for settings and todo to function together
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
    <div
      className={`${
        isDarkTheme ? 'bg-slate-200 text-gray-950' : 'bg-white'
      } custom-dropdown-container tracking-normal w-24 text-xs`}
    >
      <div
        className={`${
          isDarkTheme ? 'bg-slate-200' : 'bg-white'
        } relative border p-2 cursor-pointer `}
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
          <div
            className={`${
              isDarkTheme ? 'bg-slate-200' : 'bg-white'
            } absolute top-full left-0 w-full border shadow z-50`}
          >
            {list.map((option, idx) => (
              <div
                key={idx}
                className={`${
                  isDarkTheme ? 'hover:bg-white' : 'hover:bg-gray-100'
                } p-2 flex justify-between items-center cursor-pointer duration-300`}
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
