import { Router } from 'express';
const router = Router();

import {
  getUserSettings,
  setUserSettings,
} from '../controllers/settingsController.js';

router.route('/:_id').get(getUserSettings).post(setUserSettings);
export default router;

// http://localhost:5173/api/current-user/settings/selectedPane/659cb2843a62d13541e7be94
