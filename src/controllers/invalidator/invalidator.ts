import { NextFunction, Request, Response } from "express";
import { indalviateAllUntractedFilesFromDB } from "../../services/invalidator/invalidator";

export async function InlvaidatorRoute(
    req: Request,
    res: Response,
    next: NextFunction
){
    try{
        let x = await indalviateAllUntractedFilesFromDB(true)
        res.status(200).send(x)
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
}

export async function GetFilesCont(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let x = await indalviateAllUntractedFilesFromDB(false)
        res.status(200).send(x)
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}