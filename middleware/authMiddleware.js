import {
  UnauthenticatedError,
  BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  // console.log('auth middleware check...');

  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
    return;
  }

  try {
    //validate JWT
    const { userId, role } = verifyJWT(token);

    const testUser = userId === '65d418890dfc488397bddc0f';

    req.user = { userId, role, testUser };

    next();
  } catch (e) {
    console.log(e);
  }
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser)
    throw new BadRequestError(
      'Demo User, read only. For full access please create an account.'
    );
  next();
};
