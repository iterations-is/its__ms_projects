import { Request, Response } from 'express';
import axios from 'axios';
import { prisma } from '../../../../utils';

export const epPartGet = async (req: Request, res: Response) => {
	const projectId = req.params.projectId;
	const partId = req.params.partId;

	// Logic
	try {
		const part = await prisma.projectPart.findUnique({
			where: {
				id: partId,
			},
		});

		if (part === null) return res.status(404).json({ message: 'Part not found' });

		const response = await axios.get(
			`https://api.github.com/repos/${process.env.GITHUB_ORGANIZATION_NAME}/${projectId}/contents/${partId}`,
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `token ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		const { sha, name, content } = response.data;

		const decodedContent = Buffer.from(content, 'base64').toString('utf8');

		return res.status(200).json({
			message: 'part',
			payload: {
				id: partId,
				name,
				sha,
				decodedContent,
				meta: part,
			},
		});
	} catch (error) {
		return res.status(500).json({ message: 'internal server error', payload: error });
	}
};
