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
import { mwAuthorization as mwA, mwPermissions as mwP } from '@its/ms';

export const externalRouter = Router();

const pA = ['admin'];
const pAAU = ['admin', 'authority', 'user'];
const eL = ['Leader'];
const eLM = ['Leader', 'Member'];

externalRouter.post('/categories', mwA, mwP(pA), epCategoriesCreate);
externalRouter.get('/categories', mwA, mwP(pAAU), epCategoriesGetAll);
externalRouter.patch('/categories/:categoryId', mwA, mwP(pA), epCategoriesUpdate);
externalRouter.delete('/categories/:categoryId', mwA, mwP(pA), epCategoriesDelete);

externalRouter.post('/projects/:projectId/parts', mwA, mwP(pAAU, eLM), epPartCreate);
externalRouter.get('/projects/:projectId/parts/:partId', mwA, mwP(pAAU), epPartGet);
externalRouter.patch('/projects/:projectId/parts/:partId', mwA, mwP(pAAU, eLM), epPartUpdate);
externalRouter.delete('/projects/:projectId/parts/:partId', mwA, mwP(pAAU, eLM), epPartDelete);

externalRouter.post('/projects/:projectId/roles', mwA, mwP(pAAU, eL), epRoleCreate);
externalRouter.patch('/projects/:projectId/roles/:roleId', mwA, mwP(pAAU, eL), epRoleUpdate);
externalRouter.delete('/projects/:projectId/roles/:roleId', mwA, mwP(pAAU, eL), epRoleDelete);

externalRouter.patch('/projects/:projectId/team/:roleId', mwA, mwP(pAAU), epTeamJoin);
externalRouter.delete('/projects/:projectId/team', mwA, mwP(pAAU), epTeamLeave);

externalRouter.post('/projects', mwA, mwP(pAAU), epProjectCreate);
externalRouter.get('/projects/self', mwA, mwP(pAAU), epProjectSearchSelf);
externalRouter.get('/projects/:projectId', mwA, mwP(pAAU), epProjectGet);
externalRouter.delete('/projects/:projectId', mwA, mwP(pAAU, eL), epProjectDelete);
externalRouter.get('/projects', mwA, mwP(pAAU), epProjectSearchBy);
externalRouter.patch('/projects/:projectId', mwA, mwP(pAAU, eL), epProjectUpdate);
