import { AuthUserService } from "../../service/user/AuthUserService"
import { Request, Response } from "express";


class AuthUserController {
    async handle(req: Request, res: Response) {

        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        const user = await authUserService.execute({
            email,
            password
        })

        return res.status(201).json(user);

    }

}

export { AuthUserController }