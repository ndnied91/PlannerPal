import { Popover } from 'rsuite';

const PreviewModal = ({ previewEvents, popupPosition }) => {
  let { upDown, leftRight } = popupPosition;

  return (
    <>
      {popupPosition !== '' ? (
        <div
          style={{
            top: upDown + 80,
            left: leftRight + 20,
          }}
          className={`capitalize w-fit rounded-md shadow-md bg-red-100 duration-300 absolute p-5 ${
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
