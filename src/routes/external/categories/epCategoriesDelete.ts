import { Request, Response } from 'express';
import { BrokerMessageLog, MessageDTO } from '@its/ms';
import { logger } from '../../../broker';
import { MS_NAME } from '../../../constants';
import { prisma } from '../../../utils';

export const epCategoriesDelete = async (req: Request, res: Response) => {
	const categoryId = req.params.categoryId;

	// Logic
	try {
		const categoryProjectCount = await prisma.project.count({
			where: {
				category: {
					id: categoryId,
				},
			},
		});

		if (categoryProjectCount > 0)
			return res.status(400).json({
				code: 'CATEGORY_HAS_PROJECTS',
				message: 'Category has projects',
				payload: { number: categoryProjectCount },
			} as MessageDTO);

		await prisma.category.delete({
			where: {
				id: categoryId,
			},
		});

		logger.send({
			createdAt: new Date(),
			description: `category was deleted ${categoryId}`,
			ms: MS_NAME,
		} as BrokerMessageLog);

		return res.status(200).json({ message: 'category was deleted' } as MessageDTO);
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `cannot delete category ${categoryId}`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({ message: 'internal server error' } as MessageDTO);
	}
};
