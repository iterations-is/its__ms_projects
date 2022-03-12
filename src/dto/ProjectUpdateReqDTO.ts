import Joi from 'joi';

export interface ProjectUpdateReqDTO {
	name: string;
}

export const ProjectUpdateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
});
