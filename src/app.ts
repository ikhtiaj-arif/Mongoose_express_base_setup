import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { StudentRoutes } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.routes';
import errorHandler from './app/middlewears/errorHandler';
import notFound from './app/middlewears/notFound';
import router from './app/routes';

const app = express();
// const port = 3000;

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);


const getController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getController);

app.use(errorHandler)

// app.use(notFound)



export default app;
