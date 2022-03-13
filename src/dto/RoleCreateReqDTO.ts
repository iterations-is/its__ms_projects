import Joi from 'joi';

export interface RoleCreateReqDTO {
	name: string;
	capacity: number;
}

export const RoleCreateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
	capacity: Joi.number().min(0).max(999).required(),
});
