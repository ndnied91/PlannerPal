import { StatusCodes } from 'http-status-codes';
import Settings from '../models/SettingsModel.js';
import Item from '../models/ItemsModel.js';

export const getUserSettings = async (req, res) => {
  const createdBy = req.params._id;
  const userSettings = await Settings.find({ createdBy });
  res.status(StatusCodes.OK).json({ userSettings });
};

export const setUserSettings = async (req, res) => {
  const createdBy = req.params._id;

  const { sortBy } = req.body;
  const settings = await Settings.findOneAndUpdate({ createdBy }, req.body, {
    new: true,
  });

  const sortOptions = {
    'Z-A': '-title',
    'A-Z': 'title',
    'Due date': 'dueDate',
  };

  const sortKey = sortOptions[sortBy] || sortOptions.newest;
  const sortedOrder = await Item.find({ createdBy }).sort(sortKey);
  res.status(StatusCodes.CREATED).json({ sortedOrder, settings });
};
