import { Popover, Whisper, Button } from 'rsuite';

const PreviewModal = ({ previewEvents, popupPosition }) => {
  let { upDown, leftRight } = popupPosition;

  return (
    <>
      {popupPosition !== '' ? (
        <div
          style={{
            top: upDown + 70,
            left: leftRight,
          }}
          className={`z-50 h-16 w-fit rounded-md shadow-md bg-slate-300 duration-200 absolute p-5 ${
            previewEvents.length > 0 ? 'opacity-100 ' : 'opacity-0 invisible'
          }`}
        >
          <div className="animate-pulse flex space-x-4">
            {previewEvents.map((item) => {
              return (
                <div key={item._id}>
                  <Popover>{item.title}</Popover>
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
