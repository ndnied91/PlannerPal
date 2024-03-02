import { createContext, useContext, useState } from 'react';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const TodoAppProvider = ({ children }) => {
  // console.log(children.props.userContext);
  const [items, setItems] = useState([]); //main todos
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateItem, setUpdateItem] = useState({}); //for patch route update content
  const [countdownItems, setCountdownItems] = useState([]);
  const [filteredBy, setFilteredBy] = useState('all');
  const [addNewFilter, setAddNewFilter] = useState(false); //adding new filters to filter select
  const [allUserContent, setAllUserContent] = useState([]); // for search fubctui

  const updateSortedItems = async (id, sortBy, currentFilterOption) => {
    console.log('in updateSortedItems');
    const { data } = await customFetch.post(`/settings/${id}`, {
      sortBy,
      currentFilterOption,
    });

    setItems(data.sortedOrder);
  };

  // working for both
  const removeItem = async (item) => {
    const { data } = await customFetch.post(`/items/delete/${item._id}`, {
      item,
    });
    setItems(data.sortedItems);
    toast.success(`Successfully remove item`);
  };

  // working for both
  const updateStatus = async (item, sortBy) => {
    console.log('updateStatus');
    const { data } = await customFetch.patch(`/items/${item._id}`, {
      isCompleted: !item.isCompleted,
      filteredBy,
      sortBy,
    });

    setItems(data.items);
  };

  const addtoPriority = async (item, sortBy) => {
    const { data } = await customFetch.patch(`/items/${item._id}`, {
      isPriority: !item.isPriority,
      filteredBy,
      sortBy,
    });

    setItems(data.items);
  };

  const updateContent = async (item, sortBy) => {
    console.log('updateContent');
    const response = await customFetch.patch(`/items/${item._id}`, {
      ...item,
      filteredBy,
      sortBy,
    });

    console.log(item);
    if (item.calCode) {
      try {
        await customFetch.patch(`/cal/update/${item.calCode}`, {
          ...item,
        });
      } catch (e) {
        toast.error(e.response.data.error);
      }
    }

    if (response.status === 201) {
      setShowEditModal(false);
      toast.success('Successful update to item');
      setItems(response.data.items);
    }
  };

  const setPinnedItem = async (item, sortBy) => {
    const { data } = await customFetch.patch(`/items/pinned/${item._id}`, {
      isPinned: !item.isPinned,
      filteredBy,
      sortBy,
    });
    setItems(data.items);
  };

  const getFilteredItems = async (currentFilterOption, sortBy) => {
    console.log('in getFilteredItems');
    console.log(currentFilterOption, sortBy);
    if (currentFilterOption === 'add +') {
      setAddNewFilter(true); //pop input field to add new filter
    } else {
      const { data } = await customFetch.post(
        `items/filter/${currentFilterOption}`,
        {
          currentFilterOption,
          sortBy,
        }
      );

      setItems(data.items);
    }
  };

  return (
    <AppContext.Provider
      value={{
        items,
        setItems,
        removeItem,
        updateStatus,
        addtoPriority,
        showModal,
        setShowModal,
        showEditModal,
        setShowEditModal,
        updateContent,
        updateItem,
        setUpdateItem,
        countdownItems,
        setCountdownItems,
        filteredBy,
        setFilteredBy,
        updateSortedItems,
        setPinnedItem,
        getFilteredItems,
        userContext: children.props.userContext,
        addNewFilter,
        setAddNewFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
