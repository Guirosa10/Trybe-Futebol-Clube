import * as express from 'express';

const validateLoginBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email, password } = req.body;
  if (typeof email === 'undefined') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (typeof password === 'undefined') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default validateLoginBody;
