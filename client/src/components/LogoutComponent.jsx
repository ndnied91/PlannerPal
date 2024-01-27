import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context';

const LogoutContainer = ({ logoutUser, setShowSettingsModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { userContext } = useGlobalContext();

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowMenu(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="flex z-50" ref={wrapperRef}>
      <div className="relative">
        <button
          type="button"
          className="gap-2 flex justify-center items-center bg-slate-300 p-2 rounded-md shadow-md duration-700 h-10 w-40 md:w-32"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaUserCircle />
          {userContext?.name}
          <FaCaretDown />
        </button>

        <div
          className={
            showMenu
              ? 'shadow-md rounded-tl-lg rounded-tr-lg absolute visible text-center duration-200 cursor-pointer mt-1 h-10 w-full border-b-2 border-solid border-indigo-300 bg-slate-300 hover:bg-slate-200'
              : 'invisible w-full absolute text-center'
          }
          onClick={() => setShowSettingsModal(true)}
        >
          <button type="button" className="mt-2 pb-2 ">
            Settings
          </button>
        </div>

        <div
          onClick={() => {
            logoutUser();
          }}
          className={
            showMenu
              ? 'shadow-md rounded-br-lg rounded-bl-lg absolute visible text-center duration-200 cursor-pointer mt-11 h-10 w-full bg-slate-300 hover:bg-slate-200 z-[100]'
              : 'invisible w-full absolute text-center'
          }
        >
          <button type="button" className="mt-2 pb-2 ">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutContainer;
