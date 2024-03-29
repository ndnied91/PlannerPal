import { MdOutlineClose } from 'react-icons/md';
import SingleItemOverview from './SingleItemOverview';
import OutsideClickHandler from 'react-outside-click-handler';

const OverviewModal = ({
  setItemsShowModal,
  showItemsModal,
  event,
  userSettings,
  setUserSettings,
  isDarkTheme,
}) => {
  return (
    <div className="relative z-10 " role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <div
            className={`transition ease-in ${
              setItemsShowModal
                ? 'opacity-100 translate-y-[0rem] duration-300 '
                : 'opacity-0 translate-y-[-5rem]'
            } relative transform  text-left shadow-xl sm:my-8 md:m-0  w-screen md:w-[38rem] self-center`}
          >
            <div
              className={`px-4 py-3 flex justify-end !pb-2 ${
                isDarkTheme ? 'bg-neutral-900' : 'bg-white'
              }  `}
            >
              <button onClick={() => setItemsShowModal(false)} type="button">
                <MdOutlineClose
                  className={`cursor-pointer text-3xl
                  ${isDarkTheme ? 'text-gray-100' : 'text-gray-700'} `}
                />
              </button>
            </div>

            <OutsideClickHandler
              onOutsideClick={() => {
                setItemsShowModal(false);
              }}
            >
              <SingleItemOverview
                item={event}
                style={`md:flex items-center p-5 ${
                  isDarkTheme ? 'bg-neutral-900' : 'bg-white'
                } justify-center md:justify-start h-screen md:h-fit`}
                setItemsShowModal={setItemsShowModal}
                showItemsModal={showItemsModal}
                userSettings={userSettings}
                setUserSettings={setUserSettings}
                isDarkTheme={isDarkTheme}
              />
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewModal;
