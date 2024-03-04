import { MdOutlineClose } from 'react-icons/md';
import SingleCalOverview from './SingleCalOverview';
import OutsideClickHandler from 'react-outside-click-handler';

const OverviewCalModal = ({ setShowCalModal, event }) => {
  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full  items-end justify-center text-center sm:items-center sm:p-0 ">
          <div
            className={` transition ease-in ${
              setShowCalModal
                ? 'opacity-100 translate-y-[0rem] duration-300'
                : 'opacity-0 translate-y-[-5rem]'
            } relative transform overflow-hidden  text-left shadow-xl sm:my-8 w-[38rem] self-center`}
          >
            <div className=" px-4 py-3 flex justify-end !pb-2 bg-slate-100">
              <button onClick={() => setShowCalModal(false)} type="button">
                <MdOutlineClose className="text-3xl text-gray-700" />
              </button>
            </div>

            <OutsideClickHandler
              onOutsideClick={() => {
                setShowCalModal(false);
              }}
            >
              <SingleCalOverview
                selectedEvent={event}
                setShowCalModal={setShowCalModal}
              />
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCalModal;
