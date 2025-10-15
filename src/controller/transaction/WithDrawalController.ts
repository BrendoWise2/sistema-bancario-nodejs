import { WithDrawalService } from "../../service/transaction/WithDrawalService"
import { Request, Response } from "express";



class WithDrawalController {
    async handle(req: Request, res: Response) {

        const { amount, type, fromAccountId } = req.body

        const withDrawalService = new WithDrawalService();

        const withDrawal = await withDrawalService.execute({
            amount,
            type,
            fromAccountId,
        });

        return res.json(withDrawal);

    }

}

export { WithDrawalController }