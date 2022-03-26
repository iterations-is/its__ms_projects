import { Request, Response } from 'express';
import { MessageDTO } from '@its/ms';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const epGetProjectRole = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;
	const userId = req.params.userId;

	// Verify token
	try {
		const roles = await prisma.projectRoleAssignment.findMany({
			where: {
				userId: userId,
				role: {
					project: {
						id: projectId,
					},
				},
			},
			select: {
				role: {
					select: {
						name: true,
					},
				},
			},
		});

		const role = roles?.[0]?.role?.name;

		return res.status(200).json({
			message: 'user role at project',
			payload: {
				projectId,
				role: role ?? '',
			},
		} as MessageDTO);
	} catch (err) {
		return res.status(500).json({
			message: 'internal server error',
		} as MessageDTO);
	}
};
