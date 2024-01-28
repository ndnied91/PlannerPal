import React, { useEffect, useState } from 'react';

import PriorityTodoOverview from './PriorityTodoOverview';
import UrgentTodoOverview from './UrgentTodoOverview';
import SmallCalendarOverview from '../Calendar/CalComponents/SmallCalendarOverview';
import PreviewModal from '../Calendar/CalComponents/PreviewModal';
import customFetch from '../../utils/customFetch';
import { useGlobalContext } from '../Todo/todoContext';

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
      <div className="ml-20">
        <p className="text-3xl font-bold mb-6"> Welcome, {userContext.name}!</p>
        <section className="flex justify-between">
          <section className="flex">
            <div className="bg-slate-100 rounded-lg shadow-md p-6 w-[32rem] h-min">
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
            <div className="ml-10 bg-slate-100 rounded-lg shadow-md h-96 overflow-scroll">
              {items !== undefined && items.length > 0 ? (
                <UrgentTodoOverview items={items} userSettings={userSettings} />
              ) : null}
            </div>
            <div className="ml-10 bg-slate-100 rounded-lg shadow-md h-96 overflow-scroll">
              {items !== undefined && items.length > 0 ? (
                <PriorityTodoOverview
                  items={items}
                  userSettings={userSettings}
                />
              ) : null}
            </div>
          </section>
        </section>
      </div>
    );
  }
};

export default container;
