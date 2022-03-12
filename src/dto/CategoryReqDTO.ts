import Joi from 'joi';

export interface CategoryReqDTO {
	name: string;
}

export const CategoryReqDTOSchema: Joi.ObjectSchema = Joi.object({
	name: Joi.string().required(),
});
