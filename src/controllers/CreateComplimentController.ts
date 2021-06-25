import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";
import { SendEmailService } from "../services/SendEmailService";
import { SendTelegramService } from "../services/SendTelegramService";



class CreateComplimentController {
    async handle(request: Request, response: Response) {
        const { tag_id, user_receiver, message } = request.body

        const { user_id } = request

        const createComplimentService = new CreateComplimentService()
        const sendEmailService = new SendEmailService()
        const sendTelegramService = new SendTelegramService()


        const compliment = await createComplimentService.execute({ tag_id, user_sender: user_id, user_receiver, message })

        sendEmailService.execute(compliment)
        sendTelegramService.execute(compliment)

        return response.json(compliment)
    }
}

export { CreateComplimentController }