import Joi from 'joi';

export interface RoleDTO {
	name: string;
	capacity: number;
}

export interface ProjectCreateReqDTO {
	name: string;
	descriptionPrivate: string;
	descriptionPublic: string;
	archived: boolean;
	searchable: boolean;
	public: boolean;
	joinable: boolean;
	category: string;
	roles: RoleDTO[];
}

export const ProjectCreateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().min(3).required(),
	category: Joi.string().required(),
	descriptionPublic: Joi.string().allow('').required(),
	descriptionPrivate: Joi.string().allow('').required(),
	joinable: Joi.bool().required(),
	archived: Joi.bool().required(),
	searchable: Joi.bool().required(),
	public: Joi.bool().required(),
	roles: Joi.array().items(
		Joi.object().keys({
			name: Joi.string().required(),
			capacity: Joi.number().min(0).max(999).required(),
		})
	),
});
