import { Request, Response } from 'express';
import { prisma } from '../../../utils';

export const epProjectSearchSelf = async (req: Request, res: Response) => {
	const userId = res.locals.userId;

	// Logic
	try {
		const projects = await prisma.project.findMany({
			where: {
				projectRoles: {
					some: {
						projectRoleAssignments: {
							some: {
								userId,
							},
						},
					},
				},
			},
			select: {
				id: true,
				name: true,
				descriptionPublic: true,
				descriptionPrivate: true,
				archived: true,
				searchable: true,
				public: true,
				joinable: true,
				createdAt: true,
				category: {
					select: {
						name: true,
					},
				},
				projectParts: {
					select: {
						id: true,
						interpreterName: true,
						interpreterVersion: true,
						position: true,
					},
				},
				projectRoles: {
					select: {
						id: true,
						name: true,
						capacity: true,
						editable: true,
						projectRoleAssignments: {
							select: {
								id: true,
								userId: true,
							},
						},
					},
				},
			},
		});

		return res.status(200).json({
			message: 'user projects',
			payload: projects,
		});
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
