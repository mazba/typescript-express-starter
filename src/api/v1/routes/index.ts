import { Router } from 'express';
// import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';

export const v1Router = Router(); //TODO:: router need to export after the use

// v1Router.use('/auth', authRouter);
v1Router.use('/users', userRouter);