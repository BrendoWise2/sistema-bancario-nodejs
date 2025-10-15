import { Decimal } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";


interface TransferRequest {
    amount: Decimal;
    type: string;
    fromAccountId: string;
    toAccountId: string;

}


class TransferService {
    async execute({ amount, type, fromAccountId, toAccountId }: TransferRequest) {

        const accountToTransfer = await prismaClient.account.findUnique({
            where: {
                id: toAccountId
            },

        });

        const account = await prismaClient.account.findUnique({
            where: {
                id: fromAccountId
            },

        });

        if (!accountToTransfer) {
            throw new Error("Account to transfer not exist!");
        }

        if (account.balance.lessThan(amount)) {
            throw new Error("Insufficient Balance");

        }

        const transfer = await prismaClient.$transaction(async (tx) => {

            const transaction = await tx.transaction.create({
                data: {
                    amount: amount,
                    type: type,
                    fromAccountId: fromAccountId,
                    toAccountId: toAccountId,
                }
            });

            const deposit = await tx.account.update({
                where: {
                    id: toAccountId
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            });

            const withDrawal = await tx.account.update({
                where: {
                    id: fromAccountId
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            });

            return {
                transaction: transaction,
                account: withDrawal, deposit
            }

        });

        return transfer;

    }

}

export { TransferService }