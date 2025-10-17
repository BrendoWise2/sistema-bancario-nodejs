import prismaClient from "../../prisma"

interface StatementRequest {
    accountId: string;
    user_id: string;
}



class GetTransactionService {
    async execute({ accountId, user_id }: StatementRequest) {

        const account = await prismaClient.account.findFirst({

            where: {
                id: accountId,
                userId: user_id,
            },
        });

        if (!account) {
            throw new Error("Account not exist!");

        }

        const statement = await prismaClient.transaction.findMany({
            where: {
                OR: [
                    { fromAccountId: accountId },
                    { toAccountId: accountId }
                ]
            },
            orderBy: {
                created_at: "desc"
            }
        });

        return statement;

    }

}

export { GetTransactionService }