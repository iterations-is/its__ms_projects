import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { CategoryReqDTO, CategoryReqDTOSchema } from '../../../dto';

const prisma = new PrismaClient();

export const epCategoriesUpdate = async (req: Request, res: Response) => {
	// Validation
	const categoryReq: CategoryReqDTO = req.body;
	const { error } = CategoryReqDTOSchema.validate(categoryReq);
	if (error) return res.status(400).json(error);

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
		// TODO: Handle error
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
