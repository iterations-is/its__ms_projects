import { Request, Response } from 'express';
import { RoleUpdateReqDTO, RoleUpdateReqDTOSchema } from '../../../../dto';
import { prisma } from '../../../../utils';

export const epRoleUpdate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: RoleUpdateReqDTO = req.body;
	const { error } = RoleUpdateReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	const roleId = req.params.roleId;

	// Logic
	try {
		const role = await prisma.projectRole.update({
			where: { id: roleId },
			data: {
				name: projectCreateReq.name,
				capacity: projectCreateReq.capacity,
			},
		});

		return res.status(200).json({ message: 'role was updated', payload: role });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
