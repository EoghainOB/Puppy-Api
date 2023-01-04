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
  if (dogs.some(index => index.id == req.params.id) === false) {
    res
    .status(404)
    .send({ message: 'Error - Invalid id' });
    return;
  }
  try {
  const dog = dogs.find(index => index.id == req.params.id);
  res
    .status(200)
    .send(dog);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

app.post('/api/puppies/', (req: Request, res: Response) : void => {
  if (dogs.some(index => index.id == req.body.id)) {
    res
    .send({ message: 'Error - Please enter unique id' });
    return;
  }
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
  if (dogs.some(index => index.id == req.params.id) === false) {
    res
    .status(400)
    .send({ message: 'Error - Invalid id' });
    return;
  }
  try {
  const newData: dog = req.body;
  const id = req.params.id -1;
  const findPuppy = dogs.find((index) => index.id == req.params.id);
  const updatedPuppy = {...findPuppy, ...newData};
  dogs.splice(id, 1, updatedPuppy);
  console.log(dogs);
  res
    .status(201)
    .json(updatedPuppy);
  }
  catch (err) {
    res
    .status(500)
  }
});

app.delete('/api/puppies/:id', (req: Request<{id: number}>, res: Response) => {
  if (dogs.some(index => index.id == req.params.id) === false) {
    res
    .status(404)
    .send({ message: 'Error - Invalid id' });
    return;
  }
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
