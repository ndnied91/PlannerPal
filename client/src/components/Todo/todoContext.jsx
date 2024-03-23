import { createContext, useContext, useState } from 'react';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const TodoAppProvider = ({ children }) => {
  const [items, setItems] = useState([]); //main todos
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateItem, setUpdateItem] = useState({}); //for patch route update content
  const [countdownItems, setCountdownItems] = useState([]);
  const [filteredBy, setFilteredBy] = useState('all');
  const [addNewFilter, setAddNewFilter] = useState(false); //adding new filters to filter select
  const [allUserContent, setAllUserContent] = useState([]); // for search fubctui

  const updateSortedItems = async (id, sortBy, currentFilterOption) => {
    const { data } = await customFetch.post(`/settings/${id}`, {
      sortBy,
      currentFilterOption,
    });

    setItems(data.sortedOrder);
  };

  // working for both
  const removeItem = async (item) => {
    try {
      const { data } = await customFetch.post(`/items/delete/${item._id}`, {
        item,
      });
      setItems(data.sortedItems);
      toast.success(`Successfully remove item`);
    } catch (e) {
      toast.error(e.response.data.msg || 'Error occurred, please try again');
    }
  };

  // working for both
  const updateStatus = async (item, sortBy) => {
    console.log('in updateStatus');
    try {
      const { data } = await customFetch.patch(`/items/${item._id}`, {
        isCompleted: !item.isCompleted,
        filteredBy,
        sortBy,
      });

      setItems(data.items);
    } catch (e) {
      toast.error(e.response.data.msg || 'Error occurred, please try again');
    }
  };

  const addtoPriority = async (item, sortBy) => {
    try {
      const { data } = await customFetch.patch(`/items/${item._id}`, {
        isPriority: !item.isPriority,
        filteredBy,
        sortBy,
      });

      setItems(data.items);
    } catch (e) {
      toast.error(e.response.data.msg || 'Error occurred, please try again');
    }
  };

  const updateContent = async (item, sortBy) => {
    console.log('in updateContent');
    try {
      const { data } = await customFetch.patch(`/items/${item._id}`, {
        ...item,
        filteredBy,
        sortBy,
      });

      console.log('data from updateContent');
      console.log(data);
      setItems(data.items);
      toast.success('Item updated!');
    } catch (e) {
      toast.error(e.response.data.msg || 'Error occurred, please try again');
    }

    if (item.calCode) {
      try {
        const response = await customFetch.patch(
          `/cal/update/${item.calCode}`,
          {
            ...item,
          }
        );
        if (response.status === 201) {
          setShowEditModal(false);
          toast.success('Successful update to item');
          setItems(response.data.items);
        }
      } catch (e) {
        toast.error(e.response.data.msg || 'Error occurred, please try again');
      }
    }
  };

  const setPinnedItem = async (item, sortBy) => {
    console.log('in setPinnedItem');
    try {
      const { data } = await customFetch.patch(`/items/pinned/${item._id}`, {
        isPinned: !item.isPinned,
        filteredBy,
        sortBy,
      });
      setItems(data.items);
    } catch (e) {
      toast.error(e.response.data.msg || 'Error occurred, please try again');
    }
  };

  const getFilteredItems = async (currentFilterOption, sortBy) => {
    console.log('in getFilteredItems');
    if (currentFilterOption === 'add +') {
      setAddNewFilter(true); //pop input field to add new filter
    } else {
      try {
        const { data } = await customFetch.post(
          `items/filter/${currentFilterOption}`,
          {
            currentFilterOption,
            sortBy,
          }
        );
        console.log('data from getFilteredItems');
        console.log(data);
        setItems(data.items);
      } catch (e) {
        toast.error(e.response.data.msg || 'Error occurred, please try again');
      }
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
