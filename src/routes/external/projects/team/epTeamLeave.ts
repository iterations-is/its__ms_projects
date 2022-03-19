import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Requires mwAuthorization
 */
export const epTeamLeave = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;
	const userId = res.locals.userId;

	// Logic
	try {
		const roles = await prisma.projectRole.findMany({
			where: { projectId },
			select: { id: true },
		});

		// FIXME: cannot leave, if last leader

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
