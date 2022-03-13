import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const epProjectDelete = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;

	// Logic
	try {
		await prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				deleted: true,
			},
		});

		return res.status(200).json({ message: 'project was deleted' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
