import express from 'express';
import { CommonRoutesConfig } from '../common/commonRouteSettings';

import tipController from "../controllers/tipController";

export class TipRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TipRoutes');
    }

    public configureRoutes(): any {
        this.app.route('/api/v1/tip')
            .get(
                tipController.getTips
            )
        return this.app;
    }
}
