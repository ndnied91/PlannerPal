import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { Checkbox } from '@material-tailwind/react';

export default function Labels({ isDarkTheme }) {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <>
      <p
        className={`${
          isDarkTheme ? 'text-slate-50' : 'text-gray-500'
        }  font-bold mt-10 `}
      >
        Label
      </p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label
          key={idx}
          className={`${
            checked ? 'opacity-100 duration-300' : 'opacity-50 duration-300'
          } flex justify-center items-center mt-3 bg-${lbl}-300 rounded-md flex items-center p-1  tracking-wider text-sm cursor-pointer w-1/2`}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`hidden`}
          />
          <span
            className={`${
              isDarkTheme ? 'text-slate-50' : 'text-grey-950'
            } capitalize`}
          >
            {lbl}
          </span>
        </label>
      ))}
    </>
  );
}
