import {connect} from '@/dbConfig/dbConfig';
import User from '@/model/usermodel';
import { NextRequest , NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { error } from 'console';

connect();

export async function POST (request : NextRequest){
    try {
        const reqBody = await request.json();
        const { email,password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"user doesnot exist"},{status:400})
        }

        console.log("User existed...");

        //check if password is correct
        const validatePassword = await bcryptjs.compare(password,user.password)        
        if(!validatePassword){
            return NextResponse.json({error : "Invalid Password"},{status : 401})
        }

        console.log(user);
        
        //create tokenData
        const tokenData = {
            id: user._id,
            username : user.username,
            email: user.email
        };

        //create token
        const token  = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn : "1d"})

        const response = NextResponse.json(
            {
                message : "user loggedIn successful",
                success : true
            }
        )

        //cookies send karne ke liye 
        response.cookies.set("token", token,{
            httpOnly : true         //cookies abhi server manipulate kar sakta hai user ko browser mai dikhta hai par usko manupulate nhi kar sakta hai 
        })

        return response;

    } catch (error  : any) {
        return NextResponse.json({
            error : error.message
        },{status : 500})
    }
}