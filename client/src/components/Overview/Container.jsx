import React, { useEffect, useState } from 'react';

import PriorityTodoOverview from './PriorityTodoOverview';
import UrgentTodoOverview from './UrgentTodoOverview';
import SmallCalendarOverview from '../Calendar/CalComponents/SmallCalendarOverview';
import PreviewModal from '../Calendar/CalComponents/PreviewModal';
import customFetch from '../../utils/customFetch';
import { useGlobalContext } from '../Todo/todoContext';
import PinnedOverview from './PinnedOverview';

import OverviewModal from './OverviewModal';

import SearchBox from '../SearchBox/index';

const container = ({ userSettings, userContext }) => {
  const [previewEvents, setPreviewEvents] = useState([]); //events set for preview
  const [popupPosition, setPopupPosition] = useState(''); //when hovering over small cal
  const { items, setItems } = useGlobalContext();

  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState('');

  useEffect(() => {
    const setOrder = async () => {
      try {
        const { data } = await customFetch.post(
          `/settings/${userContext._id}`,
          {
            sortBy: userSettings.sortBy,
          }
        );
        setItems(data.sortedOrder);
      } catch (e) {
        console.log(e);
      }
    };

    if (items.length === 0) {
      setOrder();
    }
  }, [items]);

  return (
    <div className="ml-28 flex flex-wrap p-5">
      <section className="flex justify-between flex-wrap">
        <section className="flex flex-wrap gap-4">
          <div className="flex w-full " id="sss">
            <div className="w-1/2">
              <p className="text-3xl font-bold">
                {' '}
                Welcome, {userContext.name}!
              </p>
              <p> Manage your tasks and deadlines in one place</p>
            </div>

            <p className="w-3/4 rounded-lg text-end" id="aaa">
              <SearchBox />
            </p>
          </div>
          <div className="bg-slate-100 rounded-lg shadow-sm p-6  child">
            <SmallCalendarOverview
              setPreviewEvents={setPreviewEvents}
              setPopupPosition={setPopupPosition}
            />
          </div>
          <div>
            <PreviewModal
              previewEvents={previewEvents}
              popupPosition={popupPosition}
            />
          </div>
          {/* countdown details  */}
          <div className="bg-slate-100 rounded-lg shadow-sm  overflow-scroll child">
            <UrgentTodoOverview
              items={items}
              userSettings={userSettings}
              setShowModal={setShowModal}
              setEvent={setEvent}
            />
          </div>
          <div className="bg-slate-100 rounded-lg shadow-sm  overflow-scroll child">
            <PriorityTodoOverview
              items={items}
              userSettings={userSettings}
              setShowModal={setShowModal}
              setEvent={setEvent}
            />
          </div>
          <div className="bg-slate-100 rounded-lg shadow-sm  overflow-scroll child">
            <PinnedOverview
              items={items}
              userSettings={userSettings}
              setShowModal={setShowModal}
              setEvent={setEvent}
            />
          </div>
        </section>
      </section>

      {showModal && (
        <OverviewModal
          setShowModal={setShowModal}
          showModal={showModal}
          event={event}
        />
      )}
    </div>
  );
  // }
};

export default container;
