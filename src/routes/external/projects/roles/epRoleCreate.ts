import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { RoleCreateReqDTO, RoleCreateReqDTOSchema } from '../../../../dto';

const prisma = new PrismaClient();

export const epRoleCreate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: RoleCreateReqDTO = req.body;
	const { error } = RoleCreateReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	// Logic
	try {
		return res.status(200).json({ message: '' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
