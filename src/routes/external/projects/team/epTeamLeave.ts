import { Request, Response } from 'express';
import { prisma } from '../../../../utils';
import { MessageDTO } from '@its/ms';

export const epTeamLeave = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;
	const userId = res.locals.userId;

	// Logic
	try {
		const roles = await prisma.projectRole.findMany({
			where: { projectId },
			select: { id: true },
		});

		// if user is last leader
		const leadersCount = await prisma.projectRoleAssignment.count({
			where: {
				role: {
					name: 'Leader',
					project: { id: projectId },
				},
			},
		});

		const isLeader = await prisma.projectRoleAssignment.findFirst({
			where: {
				userId,
				role: {
					name: 'Leader',
					project: { id: projectId },
				},
			},
		});

		if (isLeader && leadersCount === 1)
			return res.status(400).json({
				message: 'You are the last leader of this project. You cannot leave the project.',
				code: 'LAST_LEADER',
			} as MessageDTO);

		await prisma.projectRoleAssignment.deleteMany({
			where: {
				userId: userId,
				OR: roles.map((role: any) => ({ roleId: role.id })),
			},
		});

		return res.status(200).json({ message: '' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
