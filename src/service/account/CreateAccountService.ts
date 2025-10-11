import prismaClient from "../../prisma"

interface AccountRequest {
    userId: string;
    balance: string;
    accountType: string;
    status: string;
}

class CreateAccountService {
    async execute({ balance, accountType, status, userId }: AccountRequest) {

        const account = await prismaClient.account.create({
            data: {
                balance,
                accountType,
                status,
                userId,
            }
        })

        return account;

    }


}

export { CreateAccountService }