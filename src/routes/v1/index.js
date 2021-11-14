import express from 'express';

import docsRoute from './docs.route.js';
import healthCheckRoute from './healthCheck.router.js';

import config from '../../config/config.js';
// import agenda from '../../libs/agenda';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/healthz',
    route: healthCheckRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
