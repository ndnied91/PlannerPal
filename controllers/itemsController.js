import 'express-async-errors';
import Item from '../models/ItemsModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { response } from 'express';
import CalEvent from '../models/CalEventModel.js';

export const createItem = async (req, res) => {
  let text = Object.values(req.body)[0].text;
  let type = Object.keys(req.body)[0];
  // req.body.createdBy = req.user.userId;

  const queryObject = {
    createdBy: req.user.userId,
    type: type,
  };

  const obj = {
    type: type,
    title: text,
    description: req.body.todo.description,
    createdBy: req.user.userId,
    isCompleted: false,
    isPriority: false,
    dueDate: req.body.todo.dueDate || -1,
    calCode: req.body.todo.calCode,
  };

  const item = await Item.create(obj);

  const items = await Item.find({ createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ items });
  //sending back ALL items by specific user
};

export const getAllItems = async (req, res) => {
  const items = await Item.find({ createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ items });
};

export const deleteJob = async (req, res) => {
  const removedItem = await Item.findByIdAndDelete(req.params.id);
  res.status(200).json({ item: removedItem });
};

export const updateJob = async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body
  );

  const items = await Item.find({ createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ items });
};

//
//
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

  // const items = await CalEvent.find({ createdBy: req.body.createdBy });
  res.status(StatusCodes.CREATED).sendStatus(200);
};
