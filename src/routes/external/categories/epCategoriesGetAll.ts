import { Request, Response } from 'express';
import { logger } from '../../../broker';
import { MS_NAME } from '../../../constants';
import { BrokerMessageLog } from '@its/ms';
import { prisma } from '../../../utils';

export const epCategoriesGetAll = async (req: Request, res: Response) => {
	try {
		const categories = await prisma.category.findMany({
			orderBy: {
				name: 'asc',
			},
		});

		return res.status(200).json({ message: 'categories', payload: categories });
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `cannot get all categories`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({ message: 'internal server error' });
	}
};
