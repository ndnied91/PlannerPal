import React from 'react';
import SingleItem from '../Todo/SingleItem';

const container = ({ items, userSettings }) => {
  return (
    <section className="pr-2 pl-2">
      <div>
        <p className="text-center w-full font-semibold text-lg ">
          Items will automatically delete in {userSettings.deleteTime / 24} days
        </p>
        <p className="text-center mt-10 text-sm">
          Click arrow to bring it back to main todos
        </p>
      </div>

      <div className="flex gap-1 flex-wrap mt-20 justify-center  ml-32 mr-32">
        {items.map((item) => {
          if (item.isCompleted) {
            return (
              <div
                className="hover:scale-[1.05] hover:-translate-y-4 duration-300"
                key={item._id}
              >
                <SingleItem
                  item={item}
                  archivedList
                  style={
                    'p-5 bg-zinc-100 rounded-md shadow-2xl -m-2 max-w-56 max-h-48 opacity-70 hover:opacity-100 duration-300'
                  }
                  type={'trash'}
                />
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default container;
