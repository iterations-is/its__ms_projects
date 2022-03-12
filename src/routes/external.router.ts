import { Router } from 'express';

import {
	epCategoriesCreate,
	epCategoriesDelete,
	epCategoriesGetAll,
	epCategoriesUpdate,
} from './external';
import { mwAuthorization } from '../../src-ms';

export const externalRouter = Router();

externalRouter.post('/categories', mwAuthorization, epCategoriesCreate);
externalRouter.get('/categories', mwAuthorization, epCategoriesGetAll);
externalRouter.patch('/categories/:categoryId', mwAuthorization, epCategoriesUpdate);
externalRouter.delete('/categories/:categoryId', mwAuthorization, epCategoriesDelete);
