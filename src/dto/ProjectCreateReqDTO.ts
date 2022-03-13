import Joi from 'joi';

export interface ProjectCreateReqDTO {
	name: string;
	descriptionPrivate: string;
	descriptionPublic: string;
	archived: boolean;
	searchable: boolean;
	public: boolean;
	joinable: boolean;
	deleted: boolean;
	category: string;
}

export const ProjectCreateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
	descriptionPrivate: Joi.string().required(),
	descriptionPublic: Joi.string().required(),
	archived: Joi.boolean().required(),
	searchable: Joi.boolean().required(),
	public: Joi.boolean().required(),
	joinable: Joi.boolean().required(),
	deleted: Joi.boolean().required(),
	category: Joi.string().required(),
});
