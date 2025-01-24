import { Router } from 'express';
// import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';

export const apiV1Router = Router(); //TODO:: router need to export after the use

// apiV1Router.use('/auth', authRouter);
apiV1Router.use('/users', userRouter);