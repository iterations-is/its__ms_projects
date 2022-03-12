import Joi from 'joi';

export interface ProjectSearchByReqDTO {
	name: string;
}

export const ProjectSearchByReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
});
