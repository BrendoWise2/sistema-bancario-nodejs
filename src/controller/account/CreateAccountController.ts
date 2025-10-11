import { Request, Response } from "express"
import { CreateAccountService } from "../../service/account/CreateAccountService"


class CreateAccountController {
    async handle(req: Request, res: Response) {

        const { balance, accountType, status, userId } = req.body

        const createAccountService = new CreateAccountService();

        const account = await createAccountService.execute({
            balance,
            accountType,
            status,
            userId,
        });

        return res.json(account);

    }


}

export { CreateAccountController }