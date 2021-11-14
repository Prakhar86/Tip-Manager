import * as express from 'express';
import tipService from "../services/tipService";

class TipController {
    public static getInstance(): TipController {
        if (!TipController.instance) {
            TipController.instance = new TipController();
        }
        return TipController.instance;
    }
    private static instance: TipController;

    public async getTips(
        request: express.Request,
        response: express.Response
    ): Promise<any> {
        try {
            if(request.query && request.query.startDate && request.query.endDate) {
                if(request.query.analyticsType === undefined) {
                    const tips = await tipService.getTips(String(request.query.startDate),
                        String(request.query.endDate));
                    response.status(200).send(tips);
                } else {
                    const tips = await tipService.getTipPercentCount(String(request.query.startDate),
                        String(request.query.endDate), String(request.query.analyticsType));
                    response.status(200).send(tips);
                }
            }
            else {
                response.status(400).send('something is missing!!');
            }
        } catch (err) {
            response.status(500).send(err);
            console.log(err);
        }
    }

}

export default TipController.getInstance();
