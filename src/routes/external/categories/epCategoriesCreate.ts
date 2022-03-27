import { Request, Response } from 'express';
import { CategoryReqDTO, CategoryReqDTOSchema } from '../../../dto';
import { logger } from '../../../broker';
import { MS_NAME } from '../../../constants';
import { BrokerMessageLog, MessageDTO } from '@its/ms';
import { prisma } from '../../../utils';

export const epCategoriesCreate = async (req: Request, res: Response) => {
	// Validation
	const categoryReq: CategoryReqDTO = req.body;
	const { error } = CategoryReqDTOSchema.validate(categoryReq);
	if (error) return res.status(400).json({ code: 'VALIDATION', payload: error } as MessageDTO);

	try {
		const category = await prisma.category.create({
			data: {
				name: categoryReq.name,
			},
		});

		return res.status(200).json({ message: 'category was created', payload: category });
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `cannot create category`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({ message: 'internal server error' });
	}
};
