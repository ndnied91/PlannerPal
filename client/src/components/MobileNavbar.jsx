import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; // Import icons for the menu and close buttons
import OutsideClickHandler from 'react-outside-click-handler';

const MobileNavbar = ({ links, userSettings, updateSelectedPane }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the MobileNavbar is open or closed

  return (
    <section>
      <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
        <nav className="bg-gray-950">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white transition-colors duration-300"
                  aria-label="Main menu"
                  aria-expanded={isOpen ? 'true' : 'false'}
                >
                  {isOpen ? (
                    <HiX className="block h-6 w-6" />
                  ) : (
                    <HiMenu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${
              isOpen ? 'block max-h-screen' : 'max-h-0'
            } sm:hidden transition-max-height duration-300 ease-in-out overflow-hidden`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map(({ id, text, icon }) => (
                <div className="flex " key={id}>
                  <li key={id} className="list-none flex flex-row w-full">
                    <button
                      onClick={() => {
                        updateSelectedPane(text);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className=" text-white ">{icon}</span>
                        <span className=" text-white list-none capitalize tracking-wider text-2xl">
                          {text}
                        </span>
                      </div>
                    </button>
                  </li>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </OutsideClickHandler>
    </section>
  );
};

export default MobileNavbar;
