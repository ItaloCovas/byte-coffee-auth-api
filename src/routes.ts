import { Router } from 'express';
import { LoginController } from './controllers/LoginController';
import { UserController } from './controllers/UserController';
import { authMiddleware } from './middlewares/authMiddleware';


const routes = Router();

routes.post('/user', new UserController().create);
routes.post('/login', new LoginController().login);

routes.use(authMiddleware);

routes.get('/profile', new LoginController().getProfile);



export default routes;