import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { PartSaveReqDTO, PartSaveReqDTOSchema } from '../../../../dto';

const prisma = new PrismaClient();

export const epPartCreate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: PartSaveReqDTO = req.body;
	const { error } = PartSaveReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	// Logic
	try {
		return res.status(200).json({ message: '' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
