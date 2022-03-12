import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { ProjectSearchByReqDTO, ProjectSearchByReqDTOSchema } from '../../../dto';

const prisma = new PrismaClient();

export const epProjectSearchBy = async (req: Request, res: Response) => {
	// Validation
	const categoryReq: ProjectSearchByReqDTO = req.body;
	const { error } = ProjectSearchByReqDTOSchema.validate(categoryReq);
	if (error) return res.status(400).json(error);

	// Logic
	try {
		return res.status(200).json({ message: '' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
