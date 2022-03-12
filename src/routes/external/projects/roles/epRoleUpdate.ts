import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { RoleUpdateReqDTO, RoleUpdateReqDTOSchema } from '../../../../dto';

const prisma = new PrismaClient();

export const epRoleUpdate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: RoleUpdateReqDTO = req.body;
	const { error } = RoleUpdateReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	const roleId = req.params.roleId;

	// Logic
	try {
		return res.status(200).json({ message: '' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
