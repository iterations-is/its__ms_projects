import Joi from 'joi';

export interface RoleCreateReqDTO {
	name: string;
}

export const RoleCreateReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
});
