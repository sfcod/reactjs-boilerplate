import general from './routes/general';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const routesList = [...general, ...authRoutes, ...userRoutes];

export { routesList };
