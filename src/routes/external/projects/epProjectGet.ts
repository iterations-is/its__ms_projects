import { Request, Response } from 'express';
import { prisma } from '../../../utils';

export const epProjectGet = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;

	// Logic
	try {
		const project = await prisma.project.findUnique({
			where: {
				id: projectId,
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
						id: true,
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

		return res.status(200).json({ message: 'project', payload: project });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
