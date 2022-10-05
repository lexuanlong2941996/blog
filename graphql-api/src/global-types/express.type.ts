import { Request, Response } from "express"

export interface IExpressContext {
    req: Request
    res: Response
}
