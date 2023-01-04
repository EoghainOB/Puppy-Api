import app from './app';
import { Request, Response } from 'express';

const port = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + Hello Server');
});

app.listen(port, (): void => {
  console.log(`Listening on port ${port}`);
});