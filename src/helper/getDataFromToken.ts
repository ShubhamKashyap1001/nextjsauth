import { request } from "http"
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"


export const getDataFromToken = (request : NextRequest) => {
    try {
        // request.cookies.get("token") → tries to read a cookie named "token".
        // ?.value → optional chaining; if cookie exists, take its value, else undefined.
        // || '' → if no cookie, fallback to an empty string.
        // At this point, token contains the JWT string (if present).
        const token = request.cookies.get("token")?.value || "";
        const decodedToken : any = jwt.verify(token , process.env.TOKEN_SECRET!)

        return decodedToken.id;

    } catch (error : any) {
        throw new Error(error.message)
    }
}