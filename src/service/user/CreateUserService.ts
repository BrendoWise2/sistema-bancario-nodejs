import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';


interface UserRequest {
    name: string;
    email: string
    password: string;
    photo: string;
}


class CreateUserService {
    async execute({ name, email, password, photo }: UserRequest) {

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                photo
            },
            select: {
                id: true,
                name: true,
                password: true,
                photo: true
            }
        })

        return user;

    }


}

export { CreateUserService }