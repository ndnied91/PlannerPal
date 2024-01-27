import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  if (user) {
    user.toJSON(); //removes password
  }

  res.status(StatusCodes.OK).json({ user });
};
