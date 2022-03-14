import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { RoleCreateReqDTO, RoleCreateReqDTOSchema } from '../../../../dto';

const prisma = new PrismaClient();

export const epRoleCreate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: RoleCreateReqDTO = req.body;
	const { error } = RoleCreateReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	const projectId = req.params.projectId;

	// Logic
	try {
		const role = await prisma.projectRole.create({
			data: {
				name: projectCreateReq.name,
				capacity: projectCreateReq.capacity,
				editable: true,
				project: {
					connect: {
						id: projectId,
					},
				},
			},
		});

		return res.status(200).json({ message: 'role was created', payload: role });
	} catch (error) {
		// TODO: Handle error
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
