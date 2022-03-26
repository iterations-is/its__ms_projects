import { Router } from 'express';
import { epGetProjectRole } from './internal';
import { mwApiInternal } from '@its/ms';

export const internalRouter = Router();

internalRouter.get('/projects/:projectId/users/:userId', mwApiInternal, epGetProjectRole);
