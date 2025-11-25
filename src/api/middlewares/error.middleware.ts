import type { NextFunction, Request, Response } from "express";

const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({ message: "An error occurred!" });

  next();
};

export default errorHandling;
