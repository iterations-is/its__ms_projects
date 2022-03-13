import Joi from 'joi';

export interface PartSaveReqDTO {
	sha?: string;
	data: string;
	interpreterName: string;
	interpreterVersion: string;
}

export const PartSaveReqDTOSchema: Joi.ObjectSchema = Joi.object({
	sha: Joi.string().optional(),
	data: Joi.string().required(),
	interpreterName: Joi.string().required(),
	interpreterVersion: Joi.string().required(),
});
