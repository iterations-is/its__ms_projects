import { Request, Response } from 'express';
import { prisma } from '../../../utils';

export const epProjectSearchBy = async (req: Request, res: Response) => {
	// Validation
	// const categoryReq: ProjectSearchByReqDTO = req.body;
	// const { error } = ProjectSearchByReqDTOSchema.validate(categoryReq);
	// if (error) return res.status(400).json(error);

	// Logic
	try {
		const projects = await prisma.project.findMany({
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

		return res.status(200).json({ message: 'project', payload: projects });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
