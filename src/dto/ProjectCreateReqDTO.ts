import Joi from 'joi';

export interface ProjectCreateReqDTO {
	name: string;
}

export const ProjectCreateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
});
