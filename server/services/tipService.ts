import tipDao from "../../dbLayer/daos/tipDao";

class TipService {
    public static getInstance(): TipService {
        if (!TipService.instance) {
            TipService.instance = new TipService();
        }
        return TipService.instance;
    }
    private static instance: TipService;

    public async getTips(startDate: string, endDate: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await tipDao.getTips(startDate, endDate));
            } catch (err) {
                reject(err);
            }
        });
    }
    // getTipPercentCount
    public async getTipPercentCount(startDate: string, endDate: string, analyticType: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await tipDao.getTipPercentCount(startDate, endDate ));
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default TipService.getInstance();
