import { Request, Response } from 'express';
import { prisma } from '../../../utils';

export const epProjectSearchBy = async (req: Request, res: Response) => {
	// Validation
	// const categoryReq: ProjectSearchByReqDTO = req.body;
	// const { error } = ProjectSearchByReqDTOSchema.validate(categoryReq);
	// if (error) return res.status(400).json(error);

	const page = Math.floor(+req.query.page) || 1;
	const pageSize = Math.floor(+req.query.pageSize) || 20;

	// Logic
	try {
		const projectsTotal = await prisma.project.count({
			where: {
				deleted: false,
				searchable: true,
			},
		});

		const projects = await prisma.project.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			where: {
				deleted: false,
				searchable: true,
			},
			select: {
				id: true,
				name: true,
				descriptionPublic: true,
				archived: true,
				public: true,
				joinable: true,
				createdAt: true,
				category: {
					select: {
						name: true,
					},
				},
			},
		});

		return res.status(200).json({
			message: 'projects',
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
