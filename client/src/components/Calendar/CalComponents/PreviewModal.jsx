import { useState, useEffect } from 'react';
import { Popover } from 'rsuite';

const PreviewModal = ({ previewEvents, popupPosition, isDarkTheme }) => {
  const [positionStyle, setPositionStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (popupPosition !== '') {
      let { upDown, leftRight } = popupPosition;

      // Calculate the viewport dimensions
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      // Adjust modal position to stay within viewport
      let top = Math.min(upDown + 80, vh - 160); // Ensure modal stays at least 80px from the top and bottom
      let left = Math.min(leftRight + 20, vw - 240); // Ensure modal stays at least 20px from the left and right

      setPositionStyle({ top, left });
    }
  }, [popupPosition]);

  return (
    <>
      {popupPosition !== '' ? (
        <div
          style={positionStyle}
          className={`${
            isDarkTheme ? 'bg-slate-50 text-gray-950' : 'bg-gray-950 text-white'
          } capitalize w-fit rounded-md shadow-md duration-300 absolute p-5 ${
            previewEvents.length > 0 ? 'opacity-100' : 'opacity-0 invisible'
          }`}
        >
          <div className="animate-pulse flex flex-col space-y-4">
            {previewEvents.map((item) => {
              return (
                <div key={item._id}>
                  <Popover className="">
                    {' '}
                    <div className="text-sm tracking-wide">- {item.title}</div>
                  </Popover>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PreviewModal;
