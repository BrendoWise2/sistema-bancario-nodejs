import { Decimal } from "@prisma/client/runtime/library";
import { TransferService } from "../../service/transaction/TransferService"
import { Request, Response } from "express";


class TransferController {
    async handle(req: Request, res: Response) {

        const { amount: amountString, type, fromAccountId, toAccountId } = req.body

        const amountDecimal = new Decimal(amountString);

        const transferService = new TransferService();

        const transfer = await transferService.execute({
            amount: amountDecimal,
            type,
            fromAccountId,
            toAccountId,
        });

        return res.json(transfer);
    }


}

export { TransferController }