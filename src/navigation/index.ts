import general from './routes/general';
import auth from './routes/auth';

const routesList = [...general, ...auth];

export { routesList };
