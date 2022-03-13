import Joi from 'joi';

export interface RoleUpdateReqDTO {
	name: string;
	capacity: number;
}

export const RoleUpdateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
	capacity: Joi.number().min(0).max(999).required(),
});
