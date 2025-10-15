import { Decimal } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma"

interface WithDrawalRequest {
    amount: Decimal;
    type: string;
    fromAccountId: string;
}


class WithDrawalService {
    async execute({ amount, type, fromAccountId }: WithDrawalRequest) {

        const account = await prismaClient.account.findUnique({
            where: {
                id: fromAccountId
            }
        });

        if (!account) {
            throw new Error("Account not exist!");
        }

        const transaction = await prismaClient.$transaction(async (tx) => {

            const createTransition = await tx.transaction.create({
                data: {
                    amount: amount,
                    type: type,
                    fromAccountId: fromAccountId,
                }
            });

            const withDrawal = await tx.account.update({
                where: {
                    id: fromAccountId,
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            });

            return {
                transaction: createTransition,
                account: withDrawal,
            }

        })

        return transaction;

    }


}

export { WithDrawalService }