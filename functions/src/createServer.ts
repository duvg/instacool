import * as express from 'express';

export default () => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('hola mundo')
    });
    return app;
}