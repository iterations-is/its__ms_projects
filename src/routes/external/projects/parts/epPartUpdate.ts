import { Request, Response } from 'express';
import axios from 'axios';
import { PartSaveReqDTO, PartSaveReqDTOSchema } from '../../../../dto';
import { prisma } from '../../../../utils';

export const epPartUpdate = async (req: Request, res: Response) => {
	// Validation
	const projectCreateReq: PartSaveReqDTO = req.body;
	const { error } = PartSaveReqDTOSchema.validate(projectCreateReq);
	if (error) return res.status(400).json(error);

	const projectId = req.params.projectId;
	const partId = req.params.partId;
	const userId = res.locals.userId;

	const { sha, data, interpreterName, interpreterVersion } = projectCreateReq;

	// Refactor
	if (!sha) return res.status(400).json({ message: 'sha is required' });

	// Logic
	try {
		const part = await prisma.projectPart.update({
			where: {
				id: partId,
			},
			data: {
				interpreterName,
				interpreterVersion,
			},
		});

		const base64Data = new Buffer(data).toString('base64');

		const response = await axios.put(
			`https://api.github.com/repos/${process.env.GITHUB_ORGANIZATION_NAME}/${projectId}/contents/${partId}`,
			{
				message: `updated by ${userId}`,
				content: base64Data,
				sha,
			},
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		return res.status(200).json({
			message: 'part was updated',
			payload: {
				gh: response.data,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
