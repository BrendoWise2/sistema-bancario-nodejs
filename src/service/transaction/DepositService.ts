import { Decimal } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma"

interface DepositRequest {
    amount: Decimal;
    type: string
    description: string;
    toAccountId: string;
}

class DepositService {
    async execute({ amount, type, description, toAccountId }: DepositRequest) {

        const account = await prismaClient.account.findUnique({
            where: {
                id: toAccountId,
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
                    description: description,
                    toAccountId: toAccountId,
                }
            });

            const deposit = await tx.account.update({
                where: {
                    id: toAccountId,
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            });

            return {
                transaction: createTransition,
                account: deposit
            };
        });

        return transaction;
    }

}

export { DepositService }