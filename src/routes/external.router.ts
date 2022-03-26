import { Router } from 'express';

import {
	epCategoriesCreate,
	epCategoriesDelete,
	epCategoriesGetAll,
	epCategoriesUpdate,
	epPartCreate,
	epPartDelete,
	epPartGet,
	epPartUpdate,
	epProjectCreate,
	epProjectDelete,
	epProjectGet,
	epProjectSearchBy,
	epProjectSearchSelf,
	epProjectUpdate,
	epRoleCreate,
	epRoleDelete,
	epRoleUpdate,
	epTeamJoin,
	epTeamLeave,
} from './external';
import { mwAuthorization } from '@its/ms';

export const externalRouter = Router();

externalRouter.post('/categories', mwAuthorization, epCategoriesCreate);
externalRouter.get('/categories', mwAuthorization, epCategoriesGetAll);
externalRouter.patch('/categories/:categoryId', mwAuthorization, epCategoriesUpdate);
externalRouter.delete('/categories/:categoryId', mwAuthorization, epCategoriesDelete);

externalRouter.post('/projects/:projectId/parts', mwAuthorization, epPartCreate);
externalRouter.get('/projects/:projectId/parts/:partId', mwAuthorization, epPartGet);
externalRouter.patch('/projects/:projectId/parts/:partId', mwAuthorization, epPartUpdate);
externalRouter.delete('/projects/:projectId/parts/:partId', mwAuthorization, epPartDelete);

externalRouter.post('/projects/:projectId/roles', mwAuthorization, epRoleCreate);
externalRouter.patch('/projects/:projectId/roles/:roleId', mwAuthorization, epRoleUpdate);
externalRouter.delete('/projects/:projectId/roles/:roleId', mwAuthorization, epRoleDelete);

externalRouter.patch('/projects/:projectId/team/:roleId', mwAuthorization, epTeamJoin);
externalRouter.delete('/projects/:projectId/team', mwAuthorization, epTeamLeave);

externalRouter.post('/projects', mwAuthorization, epProjectCreate);
externalRouter.get('/projects/self', mwAuthorization, epProjectSearchSelf);
externalRouter.get('/projects/:projectId', mwAuthorization, epProjectGet);
externalRouter.delete('/projects/:projectId', mwAuthorization, epProjectDelete);
externalRouter.get('/projects', mwAuthorization, epProjectSearchBy);
externalRouter.patch('/projects/:projectId', mwAuthorization, epProjectUpdate);
