import 'express-async-errors';
import Item from '../models/ItemsModel.js';
import { StatusCodes } from 'http-status-codes';

import { ObjectId } from 'mongodb';

export const createItem = async (req, res) => {
  let text = Object.values(req.body)[0].text;
  let type = Object.keys(req.body)[0];

  const { filteredBy } = req.body;
  console.log(filteredBy);
  console.log('create item');

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

export const getAllItems = async (req, res) => {
  const items = await Item.find({ createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ items });
};

export const getFilteredItems = async (req, res) => {
  if (req.params.filteredBy !== 'all') {
    const items = await Item.find({
      createdBy: req.user.userId,
      category: req.params.filteredBy,
    });

    res.status(StatusCodes.CREATED).json({ items });
  } else {
    const items = await Item.find({
      createdBy: req.user.userId,
    });

    res.status(StatusCodes.CREATED).json({ items });
  }
};

export const deleteItem = async (req, res) => {
  const removedItem = await Item.findByIdAndDelete(req.params.id);
  res.status(200).json({ item: removedItem });
};

export const updateItem = async (req, res) => {
  await Item.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body
  );

  if (req.body.filteredBy === 'all') {
    const items = await Item.find({ createdBy: req.user.userId });
    res.status(StatusCodes.CREATED).json({ items });
  } else {
    const items = await Item.find({
      createdBy: req.user.userId,
      category: req.body.filteredBy,
    });
    res.status(StatusCodes.CREATED).json({ items });
  }
};

export const updatePinnedItem = async (req, res) => {
  const { id } = req.params;
  const { isPinned, filteredBy } = req.body;

  const result = await Item.findByIdAndUpdate(
    {
      _id: id,
    },
    { isPinned: isPinned }
  );

  // const items = await Item.find({ createdBy: req.user.userId });
  // res.status(StatusCodes.OK).json({ items });

  if (filteredBy === 'all') {
    const items = await Item.find({ createdBy: req.user.userId });
    res.status(StatusCodes.CREATED).json({ items });
  } else {
    const items = await Item.find({
      createdBy: req.user.userId,
      category: req.body.filteredBy,
    });
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
    res
      .status(StatusCodes.OK)
      .json({
        items,
        message: 'Items deleted successfully',
        deletedCount: result.deletedCount,
      });
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
