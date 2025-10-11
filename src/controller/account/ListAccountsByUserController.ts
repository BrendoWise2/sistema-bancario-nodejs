import { Request, Response } from "express"
import { ListAccountsByUserService } from "../../service/account/ListAccountsByUserService"


class ListAccountsByUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.query.user_id as string;

        const listAccountsByUserService = new ListAccountsByUserService();

        const account = await listAccountsByUserService.execute({ user_id })

        return res.json(account);
    }

}

export { ListAccountsByUserController }