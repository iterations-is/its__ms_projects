import { Request, Response } from 'express';
import { prisma } from '../../../../utils';

export const epRoleDelete = async (req: Request, res: Response) => {
	const roleId = req.params.roleId;

	// Logic
	try {
		const role = await prisma.projectRole.delete({
			where: {
				id: roleId,
			},
		});

		return res.status(200).json({ message: 'role was deleted' });
	} catch (error) {
		// TODO: Handle error

		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
