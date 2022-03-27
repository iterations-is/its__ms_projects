import { Request, Response } from 'express';
import { CategoryReqDTO, CategoryReqDTOSchema } from '../../../dto';
import { BrokerMessageLog, MessageDTO } from '@its/ms';
import { logger } from '../../../broker';
import { MS_NAME } from '../../../constants';
import { prisma } from '../../../utils';

export const epCategoriesUpdate = async (req: Request, res: Response) => {
	// Validation
	const categoryReq: CategoryReqDTO = req.body;
	const { error } = CategoryReqDTOSchema.validate(categoryReq);
	if (error) return res.status(400).json({ code: 'VALIDATION', payload: error } as MessageDTO);

	const categoryId = req.params.categoryId;

	// Logic
	try {
		const category = await prisma.category.update({
			where: {
				id: categoryId,
			},
			data: {
				name: categoryReq.name,
			},
		});

		return res.status(200).json({ message: 'category was updated', payload: category });
	} catch (error) {
		logger.send({
			createdAt: new Date(),
			description: `cannot update category ${categoryId}`,
			ms: MS_NAME,
			data: error,
		} as BrokerMessageLog);

		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
