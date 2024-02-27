import 'express-async-errors';
import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';

import Item from '../models/ItemsModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';

import Settings from '../models/SettingsModel.js';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;

  req.body.role = isFirstAccount ? 'admin' : 'user';
  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);

  await Settings.create({
    createdBy: user._id,
    selectedPane: 'overview',
    deleteTime: 720,
    sortBy: 'dueDate',
    urgency: 48,
    filterOptions: ['all', 'add +'],
    currentFilterOption: 'all',
    pinnedColor: '#21de5c',
    isAddToCal: false,
  });

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    // we are sending the cookie right here
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), //expires in one day
    secure: process.env.NODE_ENV === 'production', //if in Prod, secure and only https
  });
  //

  res.status(200).json({ user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid Credentials');
  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    //we are sending the cookie right here
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), //expires in one day
    secure: process.env.NODE_ENV === 'production', //if in Prod, secure and only https
  });

  const items = await Item.find({ createdBy: user._id });
  res.status(StatusCodes.CREATED).json({ items, user });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: `user logged out!` });
};
