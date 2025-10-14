import prismaClient from "../../prisma"

interface AccountRequest {
    user_id: string;
}


class ListAccountsByUserService {
    async execute({ user_id }: AccountRequest) {

        const account = await prismaClient.account.findMany({
            where: {
                userId: user_id,
            },

            select: {
                id: true,
                balance: true,
                accountType: true,
                status: true,
                userId: true,
                created_at: true,
                updated_at: true,
            }
        });

        return account;

    }

}

export { ListAccountsByUserService }