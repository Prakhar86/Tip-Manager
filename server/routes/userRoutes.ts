import express from 'express';
import { CommonRoutesConfig } from '../common/commonRouteSettings';
import userController from "../controllers/userController";

export class UserRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    public configureRoutes(): any {
        this.app.route('/api/v1/user/signup')
        .post(
            userController.signUp
        )
        this.app.route('/api/v1/user/signin')
            .get(
                userController.signin
            )
        return this.app;
    }
}
