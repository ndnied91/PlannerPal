import React from 'react';

import { MdOutlineClose } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import SingleNoteOverview from './SingleNoteOverview';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { GrClose } from 'react-icons/gr';

const OverviewNotesModal = ({ setShowNotesModal, showNotesModal, event }) => {
  const deleteItem = async () => {
    try {
      await customFetch.delete(`notes/${event._id}`);
      toast.success('Item updated deleted!');
      setShowNotesModal(false);
    } catch (e) {
      toast.error(e.response.data.msg || 'Demo Only!');
    }
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center text-center sm:items-center sm:p-0 ">
          <div
            className={` transition ease-in ${
              setShowNotesModal
                ? 'opacity-100 translate-y-[0rem] duration-300'
                : 'opacity-0 translate-y-[-5rem]'
            } relative transform overflow-hidden  bg-white text-left shadow-xl sm:my-8 h-screen md:h-fit md:w-[38rem] self-center`}
          >
            <OutsideClickHandler
              onOutsideClick={() => {
                setShowNotesModal(false);
              }}
            >
              <div className="px-4 py-3 flex justify-end !pb-2 bg-slate-100">
                <div className="flex items-center justify-center gap-2">
                  <button onClick={deleteItem} className={`cursor-pointer `}>
                    <FaRegTrashAlt className="text-xl text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowNotesModal(false)}
                    type="button"
                  >
                    <GrClose className="text-xl text-gray-600" />
                  </button>
                </div>
              </div>

              <SingleNoteOverview
                item={event}
                setShowNotesModal={setShowNotesModal}
                showNotesModal={showNotesModal}
              />
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewNotesModal;
