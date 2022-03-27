import { Request, Response } from 'express';
import axios from 'axios';
import { ProjectCreateReqDTO, RoleDTO, ProjectCreateReqDTOSchema } from '../../../dto';
import { prisma } from '../../../utils';
import { omit } from 'lodash';

export const epProjectCreate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: ProjectCreateReqDTO = req.body;
	const { error } = ProjectCreateReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	const userId = res.locals.userId;

	// Logic
	try {
		const project = await prisma.project.create({
			data: {
				...omit(projectCreateReq, ['roles']),
				deleted: false,
				category: {
					connect: {
						id: projectCreateReq.category,
					},
				},
			},
		});

		const customRoles = projectCreateReq.roles.map((role: RoleDTO) => ({
			name: role.name,
			projectId: project.id,
			capacity: role.capacity,
			editable: true,
		}));

		await prisma.projectRole.createMany({
			data: [
				{
					name: 'Leader',
					projectId: project.id,
					capacity: -1,
					editable: false,
				},
				{
					name: 'Visitor',
					projectId: project.id,
					capacity: -1,
					editable: false,
				},
				...customRoles,
			],
		});

		const leaderRole = await prisma.projectRole.findFirst({
			where: {
				name: 'Leader',
				projectId: project.id,
			},
			select: {
				id: true,
			},
		});

		await prisma.projectRoleAssignment.create({
			data: {
				roleId: leaderRole.id,
				userId: userId,
			},
		});

		const detailsRepo = await axios.post(
			'https://api.github.com/orgs/iterations-is-projects/repos',
			{
				name: project.id,
				private: true,
			},
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		return res.status(200).json({
			message: 'project was created',
			payload: {
				project,
				detailsRepo: detailsRepo.data,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
