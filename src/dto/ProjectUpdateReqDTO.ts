import Joi from 'joi';

export interface ProjectUpdateReqDTO {
	name: string;
	descriptionPrivate: string;
	descriptionPublic: string;
	archived: boolean;
	searchable: boolean;
	public: boolean;
	joinable: boolean;
	category: string;
}

export const ProjectUpdateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().min(3).required(),
	category: Joi.string().required(),
	descriptionPublic: Joi.string().allow('').required(),
	descriptionPrivate: Joi.string().allow('').required(),
	joinable: Joi.bool().required(),
	archived: Joi.bool().required(),
	searchable: Joi.bool().required(),
	public: Joi.bool().required(),
});
