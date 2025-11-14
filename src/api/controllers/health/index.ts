import type { Request, Response } from "express";

const getHealth = (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
};

export default getHealth;
