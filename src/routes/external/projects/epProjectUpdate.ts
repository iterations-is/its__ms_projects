import { Request, Response } from 'express';
import { ProjectUpdateReqDTO, ProjectUpdateReqDTOSchema } from '../../../dto';
import { omit } from 'lodash';
import { prisma } from '../../../utils';

export const epProjectUpdate = async (req: Request, res: Response) => {
	// Validation
	const projectUpdateReq: ProjectUpdateReqDTO = req.body;
	const { error } = ProjectUpdateReqDTOSchema.validate(projectUpdateReq);
	if (error) return res.status(400).json(error);

	const projectId = req.params.projectId;

	// Logic
	try {
		await prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				...omit(projectUpdateReq, ['category']),

				...(projectUpdateReq.category
					? {
							category: {
								connect: {
									id: projectUpdateReq.category,
								},
							},
					  }
					: {}),
			},
		});

		return res.status(200).json({ message: 'project updated' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
