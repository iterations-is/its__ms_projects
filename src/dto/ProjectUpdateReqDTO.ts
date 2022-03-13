import Joi from 'joi';

export interface ProjectUpdateReqDTO {
	name?: string;
	descriptionPrivate?: string;
	descriptionPublic?: string;
	archived?: boolean;
	searchable?: boolean;
	public?: boolean;
	joinable?: boolean;
	deleted?: boolean;
	category?: string;
}

export const ProjectUpdateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string(),
	descriptionPrivate: Joi.string(),
	descriptionPublic: Joi.string(),
	archived: Joi.boolean(),
	searchable: Joi.boolean(),
	public: Joi.boolean(),
	joinable: Joi.boolean(),
	deleted: Joi.boolean(),
	category: Joi.string(),
});
