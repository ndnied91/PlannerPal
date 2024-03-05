import 'express-async-errors';
import CalEvent from '../models/CalEventModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { response } from 'express';
import dayjs from 'dayjs';

export const createCalEvent = async (req, res) => {
  if (req.body.createdBy === undefined) {
    req.body.createdBy = req.user.userId;
  }

  const { createdBy, text, description, label, day, title, calCode } = req.body;

  const obj = {
    createdBy,
    title: text || title,
    description,
    label,
    day,
    calCode,
  };
  await CalEvent.create(obj);

  const items = await CalEvent.find({ createdBy: req.body.createdBy });
  res.status(StatusCodes.CREATED).json({ items });
  //sending back ALL items by specific user
};

export const getAllCalEvents = async (req, res) => {
  const items = await CalEvent.find({ createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ items });
};

export const updateCalEvent = async (req, res) => {
  console.log('in updateCalEvent');
  await CalEvent.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    req.body
  );
  const items = await CalEvent.find({ createdBy: req.body.createdBy });
  console.log('items from updateCalEvent', items);
  res.status(StatusCodes.CREATED).json({ items });
};

export const updateCalEventFromTodo = async (req, res) => {
  console.log(req.user.userId);
  console.log('updateCalEventFromTodo');
  const item = await CalEvent.updateOne(
    { calCode: req.params.calCode },
    {
      $set: {
        description: req.body.description,
        title: req.body.title,
        day: dayjs(req.body.dueDate).valueOf(),
      },
    }
  );

  if (item.modifiedCount === 0) {
    res
      .status(StatusCodes.PRECONDITION_FAILED)
      .json({ error: 'This calendar event was previously deleted' });
  } else {
    // const items = await CalEvent.find({ createdBy: req.user.userId });
    res.status(StatusCodes.CREATED);
  }
};

export const deleteCalJob = async (req, res) => {
  const { createdBy } = await CalEvent.findByIdAndDelete(req.params._id);
  const items = await CalEvent.find({ createdBy });
  res.status(StatusCodes.CREATED).json({ items });
};
