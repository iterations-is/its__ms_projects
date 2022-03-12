import Joi from 'joi';

export interface RoleUpdateReqDTO {
	name: string;
}

export const RoleUpdateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
});
