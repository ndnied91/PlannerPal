import { toast } from 'react-toastify';

import customFetch from '../../utils/customFetch';
import { useGlobalContext } from './todoContext';
import FormModal from './FormModal';

const Form = ({ style, text, type, userSettings, isDarkTheme }) => {
  const {
    showModal,
    setShowModal,
    filteredBy,
    updateSortedItems,
    userContext,
  } = useGlobalContext();

  const sendToServer = async (e, pane) => {
    let newItemName = {};

    if (pane === 'countdown') {
      newItemName = {
        text: e.currentTitle.toLowerCase(),
        description: e.description.toLowerCase(),
        dueDate: e.dueDate,
        day: e.day,
        isCountDown: true,
        category: e.category,
      };
    } else {
      newItemName = {
        text: e.currentTitle.toLowerCase(),
        description: e.description.toLowerCase(),
        dueDate: e.dueDate,
        isPriority: e.isPriority,
        day: e.day,
        label: e.label,
        calCode: e.calCode,
        category: e.category,
      };
    }

    if (!newItemName) {
      //TODO move to todoContext
      toast.error('Please enter a valid todo');
      return;
    } else {
      try {
        if (pane !== 'countdown' && e.isAddedToCal) {
          try {
            await customFetch.post('/cal', newItemName);
          } catch (e) {
            toast.error(
              e.response.data.msg || 'Error occurred, please try again'
            );
          }
        }

        try {
          await customFetch.post('/items', {
            todo: newItemName,
            filteredBy,
          });
        } catch (e) {
          toast.error(
            e.response.data.msg || 'Error occurred, please try again'
          );
        }

        updateSortedItems(
          userContext._id,
          userSettings.sortBy,
          userSettings.currentFilterOption
        );

        setShowModal(false);

        if (pane === 'countdown') {
          toast.success('Countdown Created!');
          return true;
        } else {
          toast.success('Todo Created!');
          return true;
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'error creating!');
        return error;
      }
    }
  };

  return (
    <div className="text-center mt-4 mb-10">
      <button
        className={style}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {text}
      </button>

      <FormModal
        showModal={showModal}
        sendToServer={sendToServer}
        setShowModal={setShowModal}
        type={type}
        userSettings={userSettings}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
};

export default Form;
