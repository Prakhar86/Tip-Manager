const sql = require('mssql');
const env = require('dotenv');
env.config();
export class SqlClientManager {
    private dbInstance: any;

    public async instance() {
        if (this.dbInstance === null || this.dbInstance === undefined) {
            this.dbInstance = await new SqlClientManager().getConnection();
        }
        return this.dbInstance;
    }

    public getConnection(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const configuration = {
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    server: process.env.DB_SERVER,
                    database: process.env.DB_DATABASE,
                    options: {
                        trustServerCertificate: false,
                        enableArithAbort: false,
                        encrypt: false
                    }
                };
                this.dbInstance = await this.connect(configuration);
                resolve(this.dbInstance);
            } catch (exception) {
                reject(exception);
            }

        });
    }

    private async connect(configuration: object): Promise<any> {
        try {
            return await sql.connect(configuration);
        } catch (err) {
            console.log(' Error to connect with ms-sql server', err);
            throw err;
        }
    }
}

