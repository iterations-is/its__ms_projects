import { Request, Response } from 'express';
import { prisma } from '../../../utils';

export const epProjectSearchSelf = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const page = Math.floor(+req.query.page) || 1;
	const pageSize = Math.floor(+req.query.pageSize) || 20;
	const projectName: string = req.query.name as string;
	const projectCategory: string = req.query.category as string;

	// Logic
	try {
		const projectsTotal = await prisma.project.count({
			where: {
				deleted: false,
				projectRoles: {
					some: {
						projectRoleAssignments: {
							some: {
								userId,
							},
						},
					},
				},
				name: {
					contains: projectName,
					mode: 'insensitive',
				},
				...(projectCategory ? { category: { id: projectCategory } } : {}),
			},
		});

		const projects = await prisma.project.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			where: {
				deleted: false,
				projectRoles: {
					some: {
						projectRoleAssignments: {
							some: {
								userId,
							},
						},
					},
				},
				name: {
					contains: projectName,
					mode: 'insensitive',
				},
				...(projectCategory ? { category: { id: projectCategory } } : {}),
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
			payload: {
				projects,
				pagination: {
					total: projectsTotal,
				},
			},
		});
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
