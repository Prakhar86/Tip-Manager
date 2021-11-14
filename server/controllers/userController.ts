import userService from "../services/userService";

class UserController {
    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }
    private static instance: UserController;

    public async signUp(
        request: any,
        response: any
    ): Promise<any> {
        try {
            if(request.body && request.body.name && request.body.email && request.body.password
            && request.files.profile || Object.keys(request.files.profile).length > 0) {
                const insertTedUser = await userService.signUp(request.body, request.files.profile);
                response.status(200).send('user inserted successfully');
            } else {
                response.status(400).send('Body Not defined')
            }
        } catch (err) {
            response.status(403).send(err)
        }
    }

    public async signin(
        request: any,
        response: any
    ): Promise<any> {
        try {
            if(request.body && request.body.email && request.body.password) {
                const signedInUser = await userService.sigin(request.body);
                response.status(200).send(signedInUser);
            } else {
                response.status(400).send('Body Not defined')
            }

        } catch (err) {
            response.status(403).send(err)
        }
    }
}

export default UserController.getInstance();
