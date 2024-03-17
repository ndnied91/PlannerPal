// // import 'react-datepicker/dist/react-datepicker.css';
// // import { IoMdClose } from 'react-icons/io';
// // // import FormEditModal from './FormEditModal';
// // import React, { useEffect, useState } from 'react';
// // import Select from './Select';
// // import { parseISO } from 'date-fns';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import { useGlobalContext } from './todoContext';

// // import OutsideClickHandler from 'react-outside-click-handler';

// // const EditModal = ({
// //   setShowEditModal,
// //   userSettings,
// //   setUserSettings,
// //   updateItemsAfterEditTodo,
// //   showEditModal,
// // }) => {
// //   useEffect(() => {
// //     if (showEditModal) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = 'auto';
// //     }

// //     return () => {
// //       document.body.style.overflow = 'auto';
// //     };
// //   }, [showEditModal]);

// //   const { updateItem, updateContent } = useGlobalContext();

// //   const [currentItem, setCurrentItem] = useState({
// //     currentTitle: updateItem.title,
// //     description: updateItem.description,
// //     isAddedToCal: updateItem.isAddedToCal,
// //     updateCalEvent: true,
// //   });

// //   const [date, setDate] = useState(updateItem.dueDate);
// //   const [category, setCategory] = useState(updateItem.category);

// //   const updateCategory = (e) => {
// //     setCategory(e);
// //   };

// //   const handleChange = (e) => {
// //     setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
// //   };

// //   const handleCheckboxChange = (e) => {
// //     setCurrentItem({ ...currentItem, updateCalEvent: e.target.checked });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const obj = {
// //       _id: updateItem._id,
// //       title: currentItem.currentTitle,
// //       description: currentItem.description,
// //       dueDate: date,
// //       category: category,
// //     };

// //     currentItem.updateCalEvent ? (obj['calCode'] = updateItem.calCode) : null;
// //     updateContent(obj, userSettings.sortBy);
// //     updateItemsAfterEditTodo(); //trigger update to items sort by
// //     setShowEditModal(false);
// //   };

// //   return (
// //     <div className="relative z-10" role="dialog" aria-modal="true">
// //       <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity z-10"></div>
// //       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
// //         <div className="flex items-center justify-center p-4 text-center sm:items-center sm:p-0 h-full ">
// //           <div className="transform  bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-4xl self-center overflow-visible w-full md:w-[32rem]">
// //             <div className="font-bold text-4xl p-2 pt-0 pb-0 flex justify-between items-center bg-gray-100">
// //               <p className="text-sm ml-1 pt-1 text-gray-600 tracking-widest">
// //                 Edit
// //               </p>
// //               <button
// //                 className="text-gray-400 max-w-fit   py-2 text-sm font-semibold hover:scale-110 duration-300"
// //                 onClick={() => setShowEditModal(false)}
// //                 type="button"
// //               >
// //                 <IoMdClose className="text-2xl m-1" />
// //               </button>
// //             </div>

// //             <div className="bg-white px-4 pb-4 !pt-0 sm:p-6 sm:pb-4 h-fit ">
// //               <div className="">
// //                 <div className="mt-3 text-center sm:mt-0 sm:text-left">
// //                   <div className="mt-2">
// //                     <div className="align-center">
// //                       <form onSubmit={handleSubmit}>
// //                         {/* title */}
// //                         <div className="mb-4">
// //                           <label className="block text-gray-700 text-sm font-bold mb-2">
// //                             {/* Title */}
// //                           </label>
// //                           <input
// //                             className="pt-3 text-gray-600 text-md font-semibold pb-2 w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
// //                             id="currentTitle"
// //                             type="text"
// //                             name="currentTitle"
// //                             placeholder="Title"
// //                             required
// //                             value={currentItem.currentTitle}
// //                             onChange={(e) => handleChange(e)}
// //                           />
// //                         </div>
// //                         {/* description */}
// //                         <div className="mb-4">
// //                           <label className="block text-gray-700 text-sm font-bold mb-2">
// //                             {/* Description */}
// //                           </label>
// //                           <textarea
// //                             className="pt-3 text-gray-600 text-md font-semibold w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 h-32"
// //                             id="description"
// //                             type="textarea"
// //                             name="description"
// //                             placeholder="Description"
// //                             required
// //                             value={currentItem.description}
// //                             onChange={handleChange}
// //                           />
// //                         </div>
// //                         {/* time */}
// //                         <div className="mb-4 flex flex-col justify-start">
// //                           <label className="block text-gray-700 text-sm font-bold mb-2 ">
// //                             {/* Due */}
// //                           </label>
// //                           <DatePicker
// //                             showTimeSelect
// //                             selected={parseISO(date)}
// //                             onChange={(date) => setDate(date.toISOString())}
// //                             dateFormat="MMMM d, yyyy h:mmaa"
// //                             className="pt-3 text-gray-600 text-sm font-semibold pb-2 !w-60 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
// //                           />

// //                           <Select
// //                             textPrompt={'Select'}
// //                             className="relative mt-3 p-3 text-sm font-semibold cursor-pointer w-32  bg-white border-solid border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
// //                             userSettings={userSettings}
// //                             setUserSettings={setUserSettings}
// //                             updatable={false}
// //                             updateCategory={updateCategory}
// //                             category={category}
// //                           />
// //                         </div>

// //                         {updateItem.calCode ? (
// //                           <div className="mb-4">
// //                             <label className="block text-gray-700 text-sm font-bold mb-2">
// //                               Update Calendar event?
// //                             </label>
// //                             <input
// //                               className="bg-slate-200"
// //                               type="checkbox"
// //                               checked={currentItem.updateCalEvent}
// //                               onChange={handleCheckboxChange}
// //                             />
// //                           </div>
// //                         ) : null}

// //                         <div className="flex justify-center">
// //                           <button
// //                             className="block w-96 text-white h-12 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset hover:opacity-80 sm:mt-0 tracking-widest"
// //                             type="submit"
// //                           >
// //                             {!updateItem.isCountDown ? (
// //                               <p>Update Todo </p>
// //                             ) : (
// //                               <p>Update Countdown </p>
// //                             )}
// //                           </button>
// //                         </div>
// //                       </form>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/*  */}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditModal;

// import 'react-datepicker/dist/react-datepicker.css';
// import { IoMdClose } from 'react-icons/io';
// import React, { useEffect, useState } from 'react';
// import Select from './Select';
// import { parseISO } from 'date-fns';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useGlobalContext } from './todoContext';

// import OutsideClickHandler from 'react-outside-click-handler';

// const EditModal = ({
//   setShowEditModal,
//   userSettings,
//   setUserSettings,
//   updateItemsAfterEditTodo,
//   showEditModal,
// }) => {
//   useEffect(() => {
//     if (showEditModal) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [showEditModal]);

//   const { updateItem, updateContent } = useGlobalContext();

//   const [currentItem, setCurrentItem] = useState({
//     currentTitle: updateItem.title,
//     description: updateItem.description,
//     isAddedToCal: updateItem.isAddedToCal,
//     updateCalEvent: true,
//   });

//   const [date, setDate] = useState(updateItem.dueDate);
//   const [category, setCategory] = useState(updateItem.category);

//   const updateCategory = (e) => {
//     setCategory(e);
//   };

//   const handleChange = (e) => {
//     setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
//   };

//   const handleCheckboxChange = (e) => {
//     setCurrentItem({ ...currentItem, updateCalEvent: e.target.checked });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const obj = {
//       _id: updateItem._id,
//       title: currentItem.currentTitle,
//       description: currentItem.description,
//       dueDate: date,
//       category: category,
//     };

//     currentItem.updateCalEvent ? (obj['calCode'] = updateItem.calCode) : null;
//     updateContent(obj, userSettings.sortBy);
//     updateItemsAfterEditTodo(); //trigger update to items sort by
//     setShowEditModal(false);
//   };

//   return (
//     <>
//       {showEditModal && (
//         <OutsideClickHandler onOutsideClick={() => setShowEditModal(false)}>
//           <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-40">
//             <div className="bg-white w-full md:max-w-4xl p-4 sm:p-6">
//               <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                 <p className="text-sm text-gray-600 font-semibold">Edit</p>
//                 <button
//                   className="text-gray-400 hover:text-gray-600"
//                   onClick={() => setShowEditModal(false)}
//                   type="button"
//                 >
//                   <IoMdClose className="text-2xl" />
//                 </button>
//               </div>

//               <div className="p-4 sm:p-6">
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       Title
//                     </label>
//                     <input
//                       className="pt-3 text-gray-600 text-md font-semibold pb-2 w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
//                       id="currentTitle"
//                       type="text"
//                       name="currentTitle"
//                       placeholder="Title"
//                       required
//                       value={currentItem.currentTitle}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       Description
//                     </label>
//                     <textarea
//                       className="pt-3 text-gray-600 text-md font-semibold w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 h-32"
//                       id="description"
//                       type="textarea"
//                       name="description"
//                       placeholder="Description"
//                       required
//                       value={currentItem.description}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-4 flex flex-col justify-start">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       Due
//                     </label>
//                     <DatePicker
//                       showTimeSelect
//                       selected={parseISO(date)}
//                       onChange={(date) => setDate(date.toISOString())}
//                       dateFormat="MMMM d, yyyy h:mmaa"
//                       className="pt-3 text-gray-600 text-sm font-semibold pb-2 !w-60 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
//                     />
//                     <Select
//                       textPrompt={'Select'}
//                       className="relative mt-3 p-3 text-sm font-semibold cursor-pointer w-32  bg-white border-solid border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
//                       userSettings={userSettings}
//                       setUserSettings={setUserSettings}
//                       updatable={false}
//                       updateCategory={updateCategory}
//                       category={category}
//                     />
//                   </div>
//                   {updateItem.calCode && (
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-2">
//                         Update Calendar event?
//                       </label>
//                       <input
//                         className="bg-slate-200"
//                         type="checkbox"
//                         checked={currentItem.updateCalEvent}
//                         onChange={handleCheckboxChange}
//                       />
//                     </div>
//                   )}
//                   <div className="flex justify-center">
//                     <button
//                       className="block w-96 text-white h-12 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset hover:opacity-80 sm:mt-0 tracking-widest"
//                       type="submit"
//                     >
//                       {!updateItem.isCountDown ? (
//                         <p>Update Todo </p>
//                       ) : (
//                         <p>Update Countdown </p>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </OutsideClickHandler>
//       )}
//     </>
//   );
// };

// export default EditModal;

import Select from './Select';

import React, { useEffect, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from './todoContext';
import OutsideClickHandler from 'react-outside-click-handler';

const EditModal = ({
  setShowEditModal,
  userSettings,
  setUserSettings,
  updateItemsAfterEditTodo,
  showEditModal,
}) => {
  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEditModal]);

  const { updateItem, updateContent } = useGlobalContext();

  const [currentItem, setCurrentItem] = useState({
    currentTitle: updateItem.title,
    description: updateItem.description,
    isAddedToCal: updateItem.isAddedToCal,
    updateCalEvent: true,
  });

  const [date, setDate] = useState(updateItem.dueDate);
  const [category, setCategory] = useState(updateItem.category);

  const modalRef = useRef(null);

  const updateCategory = (e) => {
    setCategory(e);
  };

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCurrentItem({ ...currentItem, updateCalEvent: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      _id: updateItem._id,
      title: currentItem.currentTitle,
      description: currentItem.description,
      dueDate: date,
      category: category,
    };

    currentItem.updateCalEvent ? (obj['calCode'] = updateItem.calCode) : null;
    updateContent(obj, userSettings.sortBy);
    updateItemsAfterEditTodo(); //trigger update to items sort by
    setShowEditModal(false);
  };

  return (
    <>
      {showEditModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-40">
          <div
            ref={modalRef}
            className="bg-white w-full md:max-w-4xl p-4 sm:p-6"
          >
            <div className="font-bold text-4xl p-2 pt-0 pb-0 flex justify-between items-center bg-gray-100">
              <p className="text-sm ml-1 pt-1 text-gray-600 tracking-widest">
                Edit
              </p>
              <button
                className="text-gray-400 max-w-fit py-2 text-sm font-semibold hover:scale-110 duration-300"
                onClick={() => setShowEditModal(false)}
                type="button"
              >
                <IoMdClose className="text-2xl m-1" />
              </button>
            </div>
            <div className="bg-white px-4 pb-4 !pt-0 sm:p-6 sm:pb-4 h-fit">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div className="align-center">
                      <form onSubmit={handleSubmit}>
                        {/* title */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                          </label>
                          <input
                            className="pt-3 text-gray-600 text-md font-semibold pb-2 w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            id="currentTitle"
                            type="text"
                            name="currentTitle"
                            placeholder="Title"
                            required
                            value={currentItem.currentTitle}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        {/* description */}
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                          </label>
                          <textarea
                            className="pt-3 text-gray-600 text-md font-semibold w-full border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 h-32"
                            id="description"
                            type="textarea"
                            name="description"
                            placeholder="Description"
                            required
                            value={currentItem.description}
                            onChange={handleChange}
                          />
                        </div>
                        {/* time */}
                        <div className="mb-4 flex flex-col justify-start">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Due
                          </label>
                          <DatePicker
                            showTimeSelect
                            selected={parseISO(date)}
                            onChange={(date) => setDate(date.toISOString())}
                            dateFormat="MMMM d, yyyy h:mmaa"
                            className="pt-3 text-gray-600 text-sm font-semibold pb-2 !w-60 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                          />
                          <Select
                            textPrompt={'Select'}
                            className="relative mt-3 p-3 text-sm font-semibold cursor-pointer w-32  bg-white border-solid border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            userSettings={userSettings}
                            setUserSettings={setUserSettings}
                            updatable={false}
                            updateCategory={updateCategory}
                            category={category}
                          />
                        </div>
                        {updateItem.calCode ? (
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Update Calendar event?
                            </label>
                            <input
                              className="bg-slate-200"
                              type="checkbox"
                              checked={currentItem.updateCalEvent}
                              onChange={handleCheckboxChange}
                            />
                          </div>
                        ) : null}
                        <div className="flex justify-center">
                          <button
                            className="block w-96 text-white h-12 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset hover:opacity-80 sm:mt-0 tracking-widest"
                            type="submit"
                          >
                            {!updateItem.isCountDown ? (
                              <p>Update Todo </p>
                            ) : (
                              <p>Update Countdown </p>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
