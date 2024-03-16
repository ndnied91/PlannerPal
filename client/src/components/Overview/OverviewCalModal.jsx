import SingleCalOverview from './SingleCalOverview';
import OutsideClickHandler from 'react-outside-click-handler';

const OverviewCalModal = ({ setShowCalModal, showCalModal, event }) => {
  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="relative inset-0 z-10 w-screen h-screen overflow-y-auto">
        <SingleCalOverview
          selectedEvent={event}
          showCalModal={showCalModal}
          setShowCalModal={setShowCalModal}
        />
      </div>
    </div>
  );
};

export default OverviewCalModal;
