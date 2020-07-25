import general from './routes/general';
import auth from './routes/auth';
import routes from './routes';

const routesList = [...general, ...auth];

export { routesList };
export { routes };
export { default as history } from './history';
