import prismaClient from "../../prisma"

interface StatementRequest {
    accountId: string;
    user_id: string;
    startDate?: string;
    endDate?: string;
    type?: string,

}



class GetTransactionService {
    async execute({ accountId, user_id, startDate, endDate, type }: StatementRequest) {

        const dataFilters: any = {}
        const whereConditions: any = {}

        if (startDate) {
            dataFilters.gte = new Date(startDate)
        }

        if (endDate) {
            dataFilters.lte = new Date(endDate)
        }

        const account = await prismaClient.account.findFirst({

            where: {
                id: accountId,
                userId: user_id,

            },

        });

        if (!account) {
            throw new Error("Account not exist!");

        }

        whereConditions.OR = [
            { fromAccountId: accountId },
            { toAccountId: accountId }
        ];


        if (startDate || endDate) {
            // Adiciona a chave 'created_at' ao objeto whereConditions, 
            // usando o objeto dataFilters que acabamos de criar.
            whereConditions.created_at = dataFilters;
        }

        if (type) {
            whereConditions.type = type;
        }

        const statement = await prismaClient.transaction.findMany({
            where: whereConditions, // Usa o objeto completo
            orderBy: {
                created_at: "desc"
            }
        });


        return statement;

    }

}

export { GetTransactionService }