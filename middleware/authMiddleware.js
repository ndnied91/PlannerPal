import { UnauthenticatedError } from '../errors/customErrors.js';
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

    req.user = { userId, role };
    next();
  } catch (e) {
    console.log(e);
  }
};
