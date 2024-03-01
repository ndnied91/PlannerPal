import 'express-async-errors';
import Item from '../models/ItemsModel.js';
import Notes from '../models/NotesModel.js';
import CalEvent from '../models/CalEventModel.js';

import Settings from '../models/SettingsModel.js';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

const sortOptions = {
  'Z-A': '-title',
  'A-Z': 'title',
  'Due date': 'dueDate',
};

export const searchItems = async (req, res) => {
  const searchTerm = req.query.term;
  const itemsResults = await Item.find({ $text: { $search: searchTerm } });
  const notesResults = await Notes.find({ $text: { $search: searchTerm } });
  const calEventsResults = await CalEvent.find({
    $text: { $search: searchTerm },
  });

  res
    .status(StatusCodes.OK)
    .json({ itemsResults, notesResults, calEventsResults });
};

export const createItem = async (req, res) => {
  console.log('create Item func');
  let text = Object.values(req.body)[0].text;
  let type = Object.keys(req.body)[0];

  const { filteredBy } = req.body;
  const obj = {
    type: type,
    title: text,
    description: req.body.todo.description,
    createdBy: req.user.userId,
    isCompleted: false,
    isPriority: req.body.todo.isPriority,
    isCountDown: req.body.todo.isCountDown,
    dueDate: req.body.todo.dueDate || -1,
    calCode: req.body.todo.calCode,
    isPinned: false,
    category: req.body.todo.category,
  };

  await Item.create(obj);

  if (filteredBy === 'all') {
    const items = await Item.find({ createdBy: req.user.userId });
    res.status(StatusCodes.CREATED).json({ items });
  } else {
    const items = await Item.find({
      createdBy: req.user.userId,
      category: filteredBy,
    });

    res.status(StatusCodes.CREATED).json({ items });
  }

  //sending back ALL items by specific user
};

export const getFilteredItems = async (req, res) => {
  const sortKey = sortOptions[req.body.sortBy] || sortOptions.newest;

  const response = await Settings.findOneAndUpdate(
    { createdBy: req.user.userId },
    req.body,
    {
      new: true,
    }
  );

  if (!response.filterOptions.includes(req.params.filteredBy)) {
    //weird edge case
    const items = await Item.find({
      createdBy: req.user.userId,
    }).sort(sortKey);

    res.status(StatusCodes.CREATED).json({ items });
  }

  if (req.params.filteredBy !== 'all') {
    const items = await Item.find({
      createdBy: req.user.userId,
      category: req.params.filteredBy,
    }).sort(sortKey);

    res.status(StatusCodes.CREATED).json({ items });
  } else {
    const items = await Item.find({
      createdBy: req.user.userId,
    }).sort(sortKey);

    res.status(StatusCodes.CREATED).json({ items });
  }
};

export const deleteItem = async (req, res) => {
  console.log('deleteItem func');
  await Item.findByIdAndDelete(req.params.id);
  const userSettings = await Settings.find(req.body.createdBy);

  const sortedOrder = await Item.find(req.body.createdBy).sort(
    userSettings.sortBy
  );

  res.status(200).json({ sortedItems: sortedOrder });
};

export const updateItem = async (req, res) => {
  console.log('updateItem func');

  const sortKey = sortOptions[req.body.sortBy] || sortOptions.newest;

  await Item.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body
  );

  if (req.body.filteredBy === 'all') {
    const items = await Item.find({ createdBy: req.user.userId }).sort(sortKey);
    res.status(StatusCodes.CREATED).json({ items });
  } else {
    const items = await Item.find({
      createdBy: req.user.userId,
      category: req.body.filteredBy,
    }).sort(sortKey);

    res.status(StatusCodes.CREATED).json({ items });
  }
};

export const updatePinnedItem = async (req, res) => {
  console.log('updatePinnedItem func');
  const { id } = req.params;
  const { isPinned, filteredBy } = req.body;

  await Item.findByIdAndUpdate(
    {
      _id: id,
    },
    { isPinned: isPinned }
  );

  const sortKey = sortOptions[req.body.sortBy] || sortOptions.newest;

  if (filteredBy === 'all') {
    const items = await Item.find({ createdBy: req.user.userId }).sort(sortKey);
    res.status(StatusCodes.CREATED).json({ items });
  } else {
    const items = await Item.find({
      createdBy: req.user.userId,
      category: req.body.filteredBy,
    }).sort(sortKey);

    res.status(StatusCodes.CREATED).json({ items });
  }
};

export const updateTodoEventFromCal = async (req, res) => {
  const item = await Item.updateOne(
    { calCode: req.params.calCode },
    {
      $set: {
        description: req.body.description,
        title: req.body.title,
      },
    }
  );

  res.status(StatusCodes.CREATED).sendStatus(200);
};

export const deleteItems = async (req, res) => {
  try {
    const { ids } = req.body;

    // Convert ids to an array of ObjectId
    const objectIdArray = ids.map((id) => new ObjectId(id.trim()));

    const result = await Item.deleteMany({ _id: { $in: objectIdArray } });
    console.log('Documents deleted:', result.deletedCount);

    const items = await Item.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({
      items,
      message: 'Items deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
