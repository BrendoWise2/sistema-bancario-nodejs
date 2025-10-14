import { Request, Response } from "express"
import { DepositService } from "../../service/transaction/DepositService"
import { Decimal } from "@prisma/client/runtime/library";



class DepositController {
    async handle(req: Request, res: Response) {

        const { amount: amountString, type, description, toAccountId } = req.body

        //Converter a string para o tipo Decimal
        const amountDecimal = new Decimal(amountString);

        const depositService = new DepositService();

        const deposit = await depositService.execute({
            amount: amountDecimal,
            type,
            description,
            toAccountId
        })

        return res.json(deposit);

    }

}

export { DepositController }