import cors from 'cors';
import express, { Request, Response } from 'express';
import { StudentRoutes } from './modules/student/student.route';

const app = express();
// const port = 3000;

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', StudentRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getController);

export default app;
