import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

import { PartSaveReqDTO, PartSaveReqDTOSchema } from '../../../../dto';

const prisma = new PrismaClient();

export const epPartCreate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: PartSaveReqDTO = req.body;
	const { error } = PartSaveReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	const projectId = req.params.projectId;
	const userId = res.locals.userId;

	const { data, interpreterName, interpreterVersion } = projectCreateReq;

	// Logic
	try {
		const part = await prisma.projectPart.create({
			data: {
				interpreterName,
				interpreterVersion,
				dataId: '-',
				position: 1,
				project: {
					connect: {
						id: projectId,
					},
				},
			},
		});

		const base64Data = new Buffer(data).toString('base64');

		const response = await axios.put(
			`https://api.github.com/repos/iterations-is-projects/${projectId}/contents/${part.id}`,
			{
				message: `created by ${userId}`,
				content: base64Data,
			},
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		return res.status(200).json({ message: 'part was created', payload: part });
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
