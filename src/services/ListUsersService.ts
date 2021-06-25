import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/userRepositories"
import { classToPlain } from "class-transformer"


class ListUsersService {

    async execute() {
        const userRepositories = getCustomRepository(UserRepositories)

        const users = userRepositories.find()

        return classToPlain(users)
    }
}

export { ListUsersService }