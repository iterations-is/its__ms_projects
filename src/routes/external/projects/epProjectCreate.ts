import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { ProjectCreateReqDTO, ProjectCreateReqDTOSchema } from '../../../dto';

const prisma = new PrismaClient();

export const epProjectCreate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: ProjectCreateReqDTO = req.body;
	const { error } = ProjectCreateReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	// Logic
	try {
		return res.status(200).json({ message: '' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
