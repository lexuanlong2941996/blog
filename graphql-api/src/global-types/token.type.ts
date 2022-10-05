import { Request, Response } from "express"

type TDecode = {
    userId?: string
    email?: string
    iat?: number
    exp?: number
}

export interface IExtendRequest extends Request {
    user: TDecode
}

export interface IContext {
    req: IExtendRequest
    res: Response
}
