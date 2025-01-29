import { Router } from 'express';
import { glob } from 'glob';
import path from 'path';
export const registerRoutes = (app: Router): void => {
  // Registering all routes in the api folder
  const apiRouteFiles = glob.sync(path.join(__dirname, 'api/*.routes.ts'));
  apiRouteFiles.forEach((file) => { 
    const routeModule = require(file);
    if (typeof routeModule.createRoutes === 'function') {
      const router = routeModule.createRoutes();
      const routePrefix = path.basename(file, '.routes.ts');
      app.use(`/api/${routePrefix}`, router);
    }
  });
  // TODO: Need to register web routes
  /*
    const webRouteFiles = glob.sync(path.join(__dirname, 'web/*.routes.ts'));
    webRouteFiles.forEach((file) => { 
      const routeModule = require(file);
      if (typeof routeModule.createRoutes === 'function') {
        const router = routeModule.createRoutes();
        const routePrefix = path.basename(file, '.routes.ts');
        app.use(`/${routePrefix}`, router);
      }
    });
  */
};