import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Requires mwAuthorization
 */
export const epTeamJoin = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;
	const roleId = req.params.roleId;
	const userId = res.locals.userId;

	// Logic
	try {
		const project = await prisma.project.findUnique({
			where: { id: projectId },
		});

		if (!project.joinable) return res.status(400).json({ error: 'Project is not joinable' });

		const role = await prisma.projectRole.findUnique({
			where: { id: roleId },
		});

		if (!role) return res.status(404).json({ error: 'Role not found' });

		const capacity = await prisma.projectRoleAssignment.count({
			where: { roleId },
		});

		if (role.capacity <= capacity) return res.status(400).json({ error: 'Role is full' });

		// TODO: remove old project role

		await prisma.projectRoleAssignment.create({
			data: {
				role: { connect: { id: roleId } },
				userId,
			},
		});

		return res.status(200).json({ message: 'user assigned' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
