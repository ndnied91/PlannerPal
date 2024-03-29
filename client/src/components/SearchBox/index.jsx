import { useState } from 'react';
import parse from 'html-react-parser';
import customFetch from '../../utils/customFetch';
import { GrSearch } from 'react-icons/gr';
import { FaGripLinesVertical } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import OutsideClickHandler from 'react-outside-click-handler';

const SearchBox = ({ renderItem, isDarkTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItemsResults, setSearchItemsResults] = useState([]);
  const [searchNotesResults, setSearchNotesResults] = useState([]);
  const [searchCalEventsResults, setSearchCalEventsResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await customFetch.get('/items/search', {
        params: { term: searchTerm },
      });
      setSearchItemsResults(data.itemsResults);
      setSearchNotesResults(data.notesResults);
      setSearchCalEventsResults(data.calEventsResults);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="relative">
      <OutsideClickHandler
        onOutsideClick={() => {
          setSearchItemsResults([]);
          setSearchNotesResults([]);
          setSearchCalEventsResults([]);
        }}
      >
        <div className="flex border-2 border-gray-300 bg-clip-text">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(event) =>
              event.keyCode === 13 ? handleSearch() : null
            }
            placeholder="Search..."
            className="w-full px-4 py-2 border-none focus:ring-0 bg-clip-text"
          />
          <div className="flex items-center">
            <span>
              <RxCross2
                className={`${
                  searchTerm.length > 1 ? 'text-gray-500' : 'text-gray-100'
                }`}
                onClick={() => setSearchTerm('')}
              />
            </span>

            <span>
              <FaGripLinesVertical className="text-2xl text-gray-300" />{' '}
            </span>
            <button onClick={handleSearch} className="pr-2 ">
              <span>
                <GrSearch className="text-2xl" />{' '}
              </span>
            </button>
          </div>
        </div>

        {searchItemsResults.length > 0 ||
        searchNotesResults.length > 0 ||
        searchCalEventsResults.length > 0 ? (
          <div
            className={`${
              isDarkTheme ? 'bg-neutral-800' : 'bg-white'
            }  absolute z-10 w-full flex-col text-justify max-h-64 overflow-scroll border-t-0 border-2 border-gray-300 rounded-b-l shadow-md`}
          >
            {searchItemsResults.length > 0 ? (
              <p
                className={`font-bold tracking-wider ${
                  isDarkTheme ? 'bg-gray-950' : 'bg-gray-200'
                }  pl-2`}
              >
                Items
              </p>
            ) : null}

            {searchItemsResults.map((result, index) => (
              <div
                key={index}
                className={`capitalize p-2 border-b  cursor-pointer hover:scale-[1.005] hover:pr-2 ${
                  isDarkTheme
                    ? 'border-gray-600 hover:bg-gray-600'
                    : 'border-gray-200 hover:bg-gray-200'
                } duration-200`}
                onClick={() => renderItem('todo', result)}
              >
                <p className="pr-2">{result.title}</p>
              </div>
            ))}

            {searchNotesResults.length > 0 ? (
              <p
                className={`font-bold tracking-wider ${
                  isDarkTheme ? 'bg-gray-950' : 'bg-gray-200'
                }  pl-2`}
              >
                Notes
              </p>
            ) : null}

            {searchNotesResults.map((result, index) => {
              if (result.title !== '') {
                return (
                  <div
                    key={index}
                    className={`capitalize p-2 border-b  cursor-pointer hover:scale-[1.005] hover:pr-2 ${
                      isDarkTheme
                        ? 'border-gray-600 hover:bg-gray-600'
                        : 'border-gray-200 hover:bg-gray-200'
                    } duration-200`}
                    onClick={() => renderItem('notes', result)}
                  >
                    <div className="pr-2">{parse(result.title)}</div>
                  </div>
                );
              }
            })}

            {searchCalEventsResults.length > 0 ? (
              <p
                className={`font-bold tracking-wider ${
                  isDarkTheme ? 'bg-gray-950' : 'bg-gray-200'
                }  pl-2`}
              >
                Calendar
              </p>
            ) : null}

            {searchCalEventsResults.map((result, index) => (
              <div
                key={index}
                className={`capitalize p-2 border-b  cursor-pointer hover:scale-[1.005] hover:pr-2 ${
                  isDarkTheme
                    ? 'border-gray-600 hover:bg-gray-600'
                    : 'border-gray-200 hover:bg-gray-200'
                } duration-200`}
                onClick={() => renderItem('calendar', result)}
              >
                {searchCalEventsResults.length > 0 ? (
                  <p className="pr-2">{result.title}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </OutsideClickHandler>
    </div>
  );
};

export default SearchBox;
