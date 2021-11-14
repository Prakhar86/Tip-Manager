import express from 'express';

export abstract class CommonRoutesConfig {
    public app: express.Application;
    public name: string;

    protected constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    public getName(): any {
        return this.name;
    }

    public abstract configureRoutes(): express.Application;
}
