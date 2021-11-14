import * as sqldbManager from '../connectionManager';
import SqlServerManager = sqldbManager.SqlClientManager;
class TipDao {
    public static getInstance(): TipDao {
        if (!TipDao.instance) {
            TipDao.instance = new TipDao();
        }
        return TipDao.instance;
    }
    private static instance: TipDao;

    public async getTips(startDate: string, endDate: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const db = await new SqlServerManager().instance();
            try {
                const dbResult = await db.request()
                    .input('startDate', startDate)
                    .input('endDate', endDate)
                    .execute('getTips');
                resolve(dbResult.recordsets);
            } catch (err) {
                reject(err);
            }
        });
    }
    //getTipPercentCount
    public async getTipPercentCount(startDate: string, endDate: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const db = await new SqlServerManager().instance();
            try {
                const dbResult = await db.request()
                    .input('startDate', startDate)
                    .input('endDate', endDate)
                    .execute('getMaxTipsCount');
                resolve(dbResult.recordsets);
            } catch (err) {
                reject(err);
            }
        });
    }

}

export default TipDao.getInstance();
