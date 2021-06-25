import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/userRepositories"


interface IAuthRequest {
    email: string
    password: string
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthRequest) {

        const userRepositories = getCustomRepository(UserRepositories)

        //verifica se email existe
        const user = await userRepositories.findOne({ email })

        if (!user) {
            throw Error("Email / Password incorrect")
        }


        //verifica se senha correta
        const passMatch = await compare(password, user.password)

        if (!passMatch) {
            throw Error("Email / Password incorrect")
        }

        //gera token
        const token = sign({
            email: user.email
        }, process.env.PRIVATE_KEY, {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }