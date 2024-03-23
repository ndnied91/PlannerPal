import React, { useState, useEffect, useRef } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const Container = ({
  placeholderText,
  list,
  setValue,
  defaultValue,
  setShowSortModal,
  isDarkTheme,
}) => {
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
    <div
      className={`${
        isDarkTheme ? 'bg-gray-100 text-black font-normal' : 'bg-white'
      } custom-dropdown-container tracking-normal w-24 text-xs mt-2 rounded-md `}
    >
      <OutsideClickHandler onOutsideClick={() => setShowSortModal(false)}>
        <div
          className="relative  p-2 cursor-pointer "
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
                isDarkTheme ? 'bg-slate-300 border-slate-300' : 'bg-white'
              } absolute top-full left-0 w-full border shadow z-50`}
            >
              {list.map((option, idx) => (
                <div
                  key={idx}
                  className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Container;
