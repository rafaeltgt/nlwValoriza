import axios from "axios"
import { parse } from "dotenv"
import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/tagsRepositories"
import { UserRepositories } from "../repositories/userRepositories"

interface ITelegramInputs {
    user_sender: string,
    user_receiver: string,
    tag_id: string,
    message: string
}

class SendTelegramService {
    async execute({ user_sender, user_receiver, tag_id, message }) {

        const userRepositories = getCustomRepository(UserRepositories)
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const sender = await userRepositories.findOne(user_sender)
        const receiver = await userRepositories.findOne(user_receiver)
        const tag = await tagsRepositories.findOne(tag_id)

        const telegramUrl = `https://api.telegram.org/${process.env.BOT_TELEGRAM_ID}/sendMessage`

        const resp = axios.post(telegramUrl, {
            chat_id: parseInt(process.env.TELEGRAM_CHAT_ID),
            text: `WOW!\n\n${receiver.name} just received a compliment from ${sender.name} due his/her ${tag.name} skills!!!\n\n Also got a message:\n${message}`
        })

        console.log(resp)




    }
}

export { SendTelegramService }