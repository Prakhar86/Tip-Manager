import * as sqldbManager from '../connectionManager';
import SqlServerManager = sqldbManager.SqlClientManager;
import {ISignInModel, ISignUpModel} from "../dtos/userModel";
const bcrypt = require('bcrypt');
const saltRounds = 10;
class UserDao {
    public static getInstance(): UserDao {
        if (!UserDao.instance) {
            UserDao.instance = new UserDao();
        }
        return UserDao.instance;
    }
    private static instance: UserDao;

    public async isUserExist(user: ISignUpModel): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const db = await new SqlServerManager().instance();
            try {
                const dbResult = await db.query`Select ID from Users where Email=${user.email}`;
                resolve(dbResult.recordsets[0].length)
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });

    }

    public async addUser(user: ISignUpModel, profileName: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const db = await new SqlServerManager().instance();
            try {
                    const dbResult = await db.request()
                        .input('name', user.name)
                        .input('picture', profileName)
                        .input('email', user.email)
                        .input('password', this.encryptPassword(user.password))
                        .execute('InsertUser');
                    resolve(dbResult.rowsAffected[0]);
            } catch (err) {
                reject(err);
            }
        });
    }

    public encryptPassword(password: string): any {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    public async checkUserExist(user: ISignInModel): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const db = await new SqlServerManager().instance();
            try {
                const encryptedPassword = await db.query`Select Password from Users where Email=${user.email}`;
                if(encryptedPassword.recordsets[0].length > 0) {
                    const decryptedPassword = this.checkPassword(user.password, encryptedPassword.recordsets[0][0]?.Password);
                    resolve(decryptedPassword)
                }
                else {
                    resolve(false);
                }
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });

    }

    public checkPassword(password: any, hash: any): string {
       return bcrypt.compareSync(password, hash)
    }

}

export default UserDao.getInstance();
