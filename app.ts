import express from 'express';
import { Request, Response, Application } from 'express';
import { dogs } from './db';
import { dog } from './types';

const app: Application = express();

app.use(express.json());

app.get('/api/puppies', (_req: Request, res: Response) => {
  res.send(dogs);
});

app.get('/api/puppies/:id', (req: Request<{id: number}>, res: Response<{}, {dog: dog}>) => {
  try {
  const dog = dogs.find(index => index.id == req.params.id);
  res
    .status(200)
    .send(dog);
  } catch (err) {
    res
      .status(404)
      .send('Error - Invalid id');
  }
});

app.post('/api/puppies/', (req: Request, res: Response) : void => {
  // const id: number = req.body.id;
  try {
  const dog: dog = req.body
  dogs.push(dog);
  res
    .status(201)
    .json(dogs);
  }
  catch (err) {
    res
    .status(500)
  }
});

app.put('/api/puppies/:id', (req: Request<{id: number}>, res: Response<{}, {updatedPuppy: dog}>) => {
  const newData: dog = req.body;
  // const id = req.params.id;
  const findPuppy: dog[] = dogs.find((index) => index.id == req.params.id);
  const updatedPuppy = [...findPuppy, newData];
  res
    .status(201)
    .json(updatedPuppy);
});

app.delete('/api/puppies/:id', (req: Request<{id: number}>, res: Response) => {
  try {
  const dogDel = dogs.findIndex(({ id }) => id == req.params.id);
    if (dogDel) {
      dogs.splice(dogDel, 1);
    }
  res
    .sendStatus(200);
  } catch (err) {
    res
    .status(404)
    .send('Error - Invalid id');
  }
});

app.use((_req, res) => res.status(404).send('404 Not Found'));

export default app;
