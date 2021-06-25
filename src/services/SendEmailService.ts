import { createTransport } from "nodemailer"
import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/tagsRepositories"
import { UserRepositories } from "../repositories/userRepositories"



interface IEmailInputs {
    user_sender: string,
    user_receiver: string,
    tag_id: string,
    message: string
}

class SendEmailService {

    async execute({ user_sender, user_receiver, tag_id, message }: IEmailInputs) {
        const userRepositories = getCustomRepository(UserRepositories)
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const sender = await userRepositories.findOne(user_sender)
        const receiver = await userRepositories.findOne(user_receiver)
        const tag = await tagsRepositories.findOne(tag_id)

        const transporter = createTransport({

            host: process.env.MAIL_SERVER,
            port: parseInt(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS

            }
        })


        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: receiver.email,
            replyTo: sender.email,
            subject: `Congratulations, you received a compliment!!!`,
            text: `Awesome!!!\n\nYou just received a compliment from ${sender.name} due to your ${tag.name} skills\n\nAnd he/she let a message:\n${message}\n\nYou can reply this email to thank him/her`
        })

        console.log(info)





    }
}

export { SendEmailService }