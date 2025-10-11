import { Account } from "@prisma/client";
import prismaClient from "../../prisma"

class ListUserService {
    async execute() {
        const user = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                photo: true,
                accounts: true,
                created_at: true,
                updated_at: true,
            }
        })

        return user;

    }

}

export { ListUserService }