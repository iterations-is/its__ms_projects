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
	name: Joi.string().min(3),
	category: Joi.string(),
	descriptionPublic: Joi.string().allow(''),
	descriptionPrivate: Joi.string().allow(''),
	joinable: Joi.bool(),
	archived: Joi.bool(),
	searchable: Joi.bool(),
	public: Joi.bool(),
});
