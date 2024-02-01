import React, { useEffect, useState } from 'react';

import PriorityTodoOverview from './PriorityTodoOverview';
import UrgentTodoOverview from './UrgentTodoOverview';
import SmallCalendarOverview from '../Calendar/CalComponents/SmallCalendarOverview';
import PreviewModal from '../Calendar/CalComponents/PreviewModal';
import customFetch from '../../utils/customFetch';
import { useGlobalContext } from '../Todo/todoContext';
import PinnedOverview from './PinnedOverview';

const container = ({ userSettings, userContext }) => {
  const [previewEvents, setPreviewEvents] = useState([]); //events set for preview
  const [popupPosition, setPopupPosition] = useState(''); //when hovering over small cal
  const { items, setItems } = useGlobalContext();

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

  if (items.length > 0) {
    return (
      <div className="pt-5 ml-20 flex flex-wrap max-w-screen">
        <div className="mb-6">
          <p className="text-3xl font-bold"> Welcome, {userContext.name}!</p>
          <p> Manage your tasks and deadlines in one place</p>
        </div>
        <section className="flex justify-between flex-wrap">
          <section className="flex flex-wrap gap-5">
            <div className="bg-slate-50 rounded-lg shadow-sm p-6 w-[24rem] h-min">
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
            <div className="ml-2 bg-slate-50 rounded-lg shadow-sm h-80 overflow-scroll">
              {items !== undefined && items.length > 0 ? (
                <UrgentTodoOverview items={items} userSettings={userSettings} />
              ) : null}
            </div>
            <div className="ml-2 mr-2 bg-slate-50 rounded-lg shadow-sm h-80 overflow-scroll">
              {items !== undefined && items.length > 0 ? (
                <PriorityTodoOverview
                  items={items}
                  userSettings={userSettings}
                />
              ) : null}
            </div>
            <div className="bg-slate-50 rounded-lg shadow-sm h-80 overflow-scroll">
              {items !== undefined && items.length > 0 ? (
                <PinnedOverview items={items} userSettings={userSettings} />
              ) : null}
            </div>
          </section>
        </section>
      </div>
    );
  }
};

export default container;
