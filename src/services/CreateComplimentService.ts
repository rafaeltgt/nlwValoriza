import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/complimentsRepositories"
import { TagsRepositories } from "../repositories/tagsRepositories"
import { UserRepositories } from "../repositories/userRepositories"


interface IComplimentRequest {
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}


class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const userRepositories = getCustomRepository(UserRepositories)
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if (user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver")
        }

        const userReceiverExists = await userRepositories.findOne(user_receiver)

        if (!userReceiverExists) {
            throw new Error("User Receiver does not exist")
        }

        const tagExists = await tagsRepositories.findOne(tag_id)

        if (!tagExists) {
            throw new Error("Incorrect Tag")
        }

        const compliment = complimentsRepositories.create({
            tag_id, user_sender, user_receiver, message
        })

        await complimentsRepositories.save(compliment)

        return compliment






    }
}

export { CreateComplimentService }