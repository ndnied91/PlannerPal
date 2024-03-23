import { Popover } from 'rsuite';

const PreviewModal = ({ previewEvents, popupPosition, isDarkTheme }) => {
  let { upDown, leftRight } = popupPosition;

  return (
    <>
      {popupPosition !== '' ? (
        <div
          style={{
            top: upDown + 80,
            left: leftRight + 20,
          }}
          className={`${
            isDarkTheme ? 'bg-slate-50 text-gray-950' : 'bg-gray-950 text-white'
          } capitalize w-fit rounded-md shadow-md  duration-300 absolute p-5 ${
            previewEvents.length > 0 ? 'opacity-100' : 'opacity-0 invisible'
          }`}
        >
          <div className="animate-pulse flex flex-col space-y-4 ">
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
