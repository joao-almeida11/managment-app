import { Request, Response } from 'express';

const getHealth = async (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
};

export default getHealth;
