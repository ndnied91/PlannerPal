import React, { useEffect, useState } from 'react';

import PriorityTodoOverview from './PriorityTodoOverview';
import UrgentTodoOverview from './UrgentTodoOverview';
import SmallCalendarOverview from '../Calendar/CalComponents/SmallCalendarOverview';
import PreviewModal from '../Calendar/CalComponents/PreviewModal';
import customFetch from '../../utils/customFetch';
import { useGlobalContext } from '../Todo/todoContext';
import PinnedOverview from './PinnedOverview';

import OverviewModal from './OverviewModal';
import OverviewNotesModal from './OverviewNotesModal';
import OverviewCalModal from './OverviewCalModal';

import SearchBox from '../SearchBox/index';
import { toast } from 'react-toastify';

const container = ({ userSettings, userContext, setUserSettings }) => {
  const [previewEvents, setPreviewEvents] = useState([]); //events set for preview
  const [popupPosition, setPopupPosition] = useState(''); //when hovering over small cal
  const { items, setItems } = useGlobalContext();

  const [showItemsModal, setItemsShowModal] = useState(false); //todos
  const [showNotesModal, setShowNotesModal] = useState(false); //notes
  const [showCalModal, setShowCalModal] = useState(false); //notes
  const [event, setEvent] = useState('');

  console.log(items);

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
        toast.error('Error occurred, please try again');
      }
    };

    if (items.length === 0) {
      setOrder();
    }
  }, [items]);

  const renderItem = (pane, event) => {
    if (pane === 'todo') {
      setItemsShowModal(true);
      setEvent(event);
    } else if (pane === 'notes') {
      setShowNotesModal(true); // Correct way to set showNotesModal state
      setEvent(event);
    } else if (pane === 'calendar') {
      setShowCalModal(true); // Correct way to set showNotesModal state
      setEvent(event);
    }
  };

  return (
    <div className="md:ml-28 flex flex-wrap md:p-5 ">
      <section className="">
        <section className="flex flex-wrap">
          <div className="flex w-full flex-col md:flex-row ">
            <div className="md:w-1/2 mb-4 md:mb-0 ">
              <p className="text-3xl font-bold m-4 md:m-0 flex justify-start md:justify-start">
                {' '}
                Welcome, {userContext.name}!
              </p>
              <p className="m-4 md:m-0">
                {' '}
                Manage your tasks and deadlines in one place
              </p>
            </div>

            <div className="md:w-3/4 rounded-lg text-end m-4 md:m-0">
              <SearchBox renderItem={renderItem} />
            </div>
          </div>

          <section className="h-full w-screen md:w-auto flex flex-col md:flex-row md:flex-wrap md:gap-4">
            <div className="bg-slate-100 m-4 p-4 md:b-0 md:m-0 rounded-lg shadow-sm md:p-6 child w-auto md:w-auto ">
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
            <div className="bg-slate-100 m-4 md:m-0 rounded-lg shadow-sm md:p-6 child w-auto md:w-auto">
              <UrgentTodoOverview
                items={items}
                userSettings={userSettings}
                setItemsShowModal={setItemsShowModal}
                setEvent={setEvent}
              />
            </div>
            <div className="bg-slate-100 m-4 md:m-0 rounded-lg shadow-sm md:p-6 child w-auto md:w-auto">
              <PriorityTodoOverview
                items={items}
                userSettings={userSettings}
                setItemsShowModal={setItemsShowModal}
                setEvent={setEvent}
              />
            </div>
            <div className="bg-slate-100 m-4 md:m-0 rounded-lg shadow-sm md:p-6 child w-auto md:w-auto">
              <PinnedOverview
                items={items}
                userSettings={userSettings}
                setItemsShowModal={setItemsShowModal}
                setEvent={setEvent}
              />
            </div>
          </section>
        </section>

        {/* SEARCH MODALS */}
        {showNotesModal && (
          <OverviewNotesModal
            setShowNotesModal={setShowNotesModal}
            event={event}
          />
        )}

        {showItemsModal && (
          <OverviewModal
            setItemsShowModal={setItemsShowModal}
            event={event}
            userSettings={userSettings}
            setUserSettings={setUserSettings}
          />
        )}

        {showCalModal && (
          <OverviewCalModal setShowCalModal={setShowCalModal} event={event} />
        )}
      </section>
    </div>
  );
  // }
};

export default container;
