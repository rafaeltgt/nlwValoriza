import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    //  receber token
    const authToken = request.headers.authorization
    // ver se token ta preenchido
    if (!authToken) {
        return response.status(401).end() //.end() -> mensagem padrao do erro 401
    }

    const [, token] = authToken.split(" ")
    // ver se token é válido 


    try {
        const { sub } = verify(token, process.env.PRIVATE_KEY) as IPayload

        request.user_id = sub

        return next()

    } catch (error) {
        return response.status(401).end()
    }



    //recuperar informações do usuário


}