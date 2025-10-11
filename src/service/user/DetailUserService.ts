import prismaClient from "../../prisma"

interface UserRequest {
    user_id: string;
}


class DetailUserService {
    async execute({ user_id }: UserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                name: true,
                email: true,
                photo: true,
                accounts: true,
                created_at: true,
                updated_at: true,
            }
        });

        return user;

    }


}

export { DetailUserService }