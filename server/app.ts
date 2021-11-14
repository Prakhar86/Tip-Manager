import express from 'express';
import bodyParser from 'body-parser';
import {SqlClientManager} from "../dbLayer/connectionManager";
import { UserRoutes} from "./routes/userRoutes";
import {TipRoutes} from "./routes/tipRoutes";
const fileUpload = require('express-fileupload');

class App {
    public app: express.Application;
    constructor() {
       this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        this.app.use(fileUpload({
            limits: { fileSize: 1024 * 1024 * 1024 }
        }));
        this.routes()
    }
    public async init(): Promise<any> {
        try {
            await new SqlClientManager().getConnection();
            console.log('Sql-server started successfully!')
        } catch (e) {
            console.log('Unable to connect the sql-server, Exception :', e);
        }
    }

    public  routes(): void {
        new UserRoutes(this.app);
        new TipRoutes(this.app);
    }
}
function expressApp(): any {
    const app = new App();
    app.init().then(() => {
        return app.app;
    }).catch(error => {
        console.log('Not able to start the server, Exiting from here.', error);
        process.exit(1);
        return 1;
    });
    return app.app;
}
export default expressApp;