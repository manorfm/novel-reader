import express from 'express'
import Router from './routes'
import path from 'path'

export default class Server {

    constructor() {
        this.server = express()
        this.setup()
        this.start()
    }

    setup() {
        this.server.set('port', 3000);
        this.server.set('view engine', 'ejs');

        const __dirname = path.resolve();
        this.server.use(express.static(path.join(__dirname, '/public')));
    }

    start() {
        this.routes()

        this.server.listen(this.server.get('port'), () => {
            console.log(`BECKEND is running on port ${this.server.get('port')}.`);
        });
    }

    routes() {
        const router = new Router();
        router.set(this.server)
    }
}
