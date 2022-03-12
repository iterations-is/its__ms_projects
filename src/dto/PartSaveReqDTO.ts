import Joi from 'joi';

export interface PartSaveReqDTO {
	name: string;
}

export const PartSaveReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
});
