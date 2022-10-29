import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import { errorMiddleware } from './middlewares/error';
import routes from './routes';

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);

    // Always use error middlewares before app.listen() => after all other middlewares
    app.use(errorMiddleware);
    return app.listen(process.env.PORT);
});