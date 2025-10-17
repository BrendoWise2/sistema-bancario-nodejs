import { Request, Response } from "express"
import { GetTransactionService } from "../../service/transaction/GetTransactionService"


class GetTransactionController {
    async handle(req: Request, res: Response) {

        const accountIdSearch = req.query.accountIdSearch as string;

        const authenticatedUserId = req.user_id;

        const getTransactionService = new GetTransactionService();

        const statement = await getTransactionService.execute({
            accountId: accountIdSearch,
            user_id: authenticatedUserId,
        });

        res.json(statement);

    }


}

export { GetTransactionController }