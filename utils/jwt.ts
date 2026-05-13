import jwt from 'jsonwebtoken';

import { UserStoreUserType } from '@/constants/types';
import { JWT_SECRET } from '@/constants/data';


export const generateToken = (user: UserStoreUserType) => {
  return jwt.sign({ user }, JWT_SECRET as string, {
    expiresIn: '48h',
  });
};