import { Request, Response } from 'express';
import { prisma } from '../../../../utils';
import { MessageDTO } from '@its/ms';

export const epTeamJoin = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;
	const roleId = req.params.roleId;
	const userId = res.locals.userId;

	// Logic
	try {
		const project = await prisma.project.findUnique({
			where: { id: projectId },
		});

		if (!project.joinable)
			return res.status(400).json({ message: 'Project is not joinable' } as MessageDTO);

		const role = await prisma.projectRole.findUnique({
			where: { id: roleId },
		});

		if (!role) return res.status(404).json({ message: 'Role not found' } as MessageDTO);
		if (role.name === 'Leader')
			return res.status(400).json({ message: 'Role Leader is not free to join' } as MessageDTO);

		const capacity = await prisma.projectRoleAssignment.count({
			where: { roleId },
		});

		if (role.capacity >= 0 && role.capacity <= capacity)
			return res.status(400).json({ message: 'Role is full' } as MessageDTO);

		const hasRole = await prisma.projectRoleAssignment.findMany({
			where: {
				userId,
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

		const hasRoleCount = hasRole.length ?? 0;

		if (hasRoleCount === 0) {
			await prisma.projectRoleAssignment.create({
				data: {
					role: { connect: { id: roleId } },
					userId,
				},
			});

			return res.status(200).json({
				message: 'user assigned',
			} as MessageDTO);
		}

		if (hasRole?.[0]?.role?.name === 'Leader') {
			const leadersCount = await prisma.projectRoleAssignment.count({
				where: {
					role: {
						name: 'Leader',
						project: {
							id: projectId,
						},
					},
				},
			});

			if (leadersCount <= 1) {
				return res.status(400).json({
					message: 'The project should have at least one leader',
					code: 'LAST_LEADER',
				} as MessageDTO);
			}
		}

		await prisma.projectRoleAssignment.updateMany({
			where: {
				userId,
				role: {
					project: {
						id: projectId,
					},
				},
			},
			data: {
				roleId,
			},
		});

		return res.status(200).json({
			message: 'user assigned',
		} as MessageDTO);
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
