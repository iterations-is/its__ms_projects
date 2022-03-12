import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Requires mwAuthorization
 */
export const epCategoriesGetAll = async (req: Request, res: Response) => {
	try {
		const categories = await prisma.category.findMany();

		return res.status(200).json({ message: 'categories', payload: categories });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
