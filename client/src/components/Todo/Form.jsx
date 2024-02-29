import { toast } from 'react-toastify';

import customFetch from '../../utils/customFetch';
import { useGlobalContext } from './todoContext';
import FormModal from './FormModal';

const Form = ({ style, text, type, userSettings }) => {
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
          await customFetch.post('/cal', newItemName);
        }

        await customFetch.post('/items', {
          todo: newItemName,
          filteredBy,
        });

        updateSortedItems(
          userContext._id,
          userSettings.sortBy,
          userSettings.currentFilterOption
        );

        setShowModal(false);

        if (pane === 'countdown') {
          toast.success('Countdown Created!');
        } else {
          toast.success('Todo Created!');
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg || 'error creating!');
        return error;
      }
    }
  };

  return (
    <div className="text-center mt-4">
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
      />
    </div>
  );
};

export default Form;
