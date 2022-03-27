import { Request, Response } from 'express';
import { prisma } from '../../../../utils';

export const epPartDelete = async (req: Request, res: Response) => {
	const partId = req.params.partId;

	// Logic
	try {
		const part = await prisma.projectPart.delete({
			where: {
				id: partId,
			},
		});

		return res.status(200).json({ message: 'part was removed' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
