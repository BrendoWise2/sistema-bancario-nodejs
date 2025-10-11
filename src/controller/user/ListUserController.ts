import { Request, Response } from "express";
import { ListUserService } from "../../service/user/ListUserService"


class ListUserController {
    async handle(req: Request, res: Response) {


        const listUserService = new ListUserService();

        const user = await listUserService.execute()

        res.json(user);

    }

}

export { ListUserController }