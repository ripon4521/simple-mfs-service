import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middleware/notFoundRoutes';
import router from './app/routes/route';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);
const getAcontroller = (req :Request, res:Response) =>{
  res.send('Welcome to the practice project with mvc pattern with express js , node js , mongodb and mongoose!')
}
app.get('/', getAcontroller);
app.use(notFound);

export default app;
