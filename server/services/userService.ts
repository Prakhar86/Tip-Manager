import {ISignInModel, ISignUpModel} from "../../dbLayer/dtos/userModel";
import path from "path";
import fs from "fs";
import userDao from "../../dbLayer/daos/userDao";
const config = require('../../globalConfig');
import jwt from 'jsonwebtoken';

class UserService {
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    private static instance: UserService;

    public async signUp(user: ISignUpModel, profile:any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // is user already exist
                const isUserExist = await userDao.isUserExist(user);
                if(!isUserExist) {
                    const root = path.join(config.rootDirectory, 'profile');
                    const filePath = root + '/' + profile.name;
                    if (!fs.existsSync(root)) {
                        fs.mkdirSync(root);
                    }
                    fs.writeFileSync(filePath, profile.data);
                    // Insert Entry in user Table
                    resolve(await userDao.addUser(user, profile.name));
                } else {
                    reject('user Already Exist');
                }
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }

    public async sigin(user: ISignInModel): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // is user already exist
                const isUserExist = await userDao.checkUserExist(user);
                if(isUserExist) {
                    // genereate token
                    let email = user.email;
                    const token = jwt.sign({ email }, 'secretDog', { expiresIn: 7200 });
                    resolve({
                        email: email,
                        token: token
                    })

                } else {
                    reject({message: 'Unauthorized user Try again'});
                }
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }
}

export default UserService.getInstance();
