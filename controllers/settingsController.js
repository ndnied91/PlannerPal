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

export const setUserFilterSettings = async (req, res) => {
  const queryObject = {
    createdBy: req.params._id,
    category: req.body.toRemove,
  };

  const totalJobs = await Item.countDocuments(queryObject);
  console.log(totalJobs);
  if (totalJobs > 0) {
    res.status(StatusCodes.FORBIDDEN).json({
      error: 'unable to remove item as there as todos attached it it',
    });
  } else {
    const updatedFilterOptions = req.body.filterOptions;

    // Send response when the condition is false
    const settings = await Settings.findOneAndUpdate(
      { createdBy: req.params._id },
      { $set: { filterOptions: updatedFilterOptions } }, // Use $set to specify fields to update
      {
        new: true,
        upsert: true, // If the document doesn't exist, create it
      }
    );
    res.status(StatusCodes.CREATED).json({ settings });
  }
};
