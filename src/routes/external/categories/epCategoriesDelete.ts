import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Requires mwAuthorization
 */
export const epCategoriesDelete = async (req: Request, res: Response) => {
	const categoryId = req.params.categoryId;

	// Logic

	try {
		// CRITICAL: check if category has no projects

		await prisma.category.delete({
			where: {
				id: categoryId,
			},
		});

		return res.status(200).json({ message: 'category was deleted' });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
