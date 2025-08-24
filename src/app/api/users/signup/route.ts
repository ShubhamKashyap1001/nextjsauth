import {connect} from '@/dbConfig/dbConfig';
import bcryptjs from 'bcryptjs';
import User from '@/model/usermodel';
import { NextRequest,NextResponse } from 'next/server';
import { sendMail } from '@/helper/mailer';
import crypto from "crypto";


connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody;

        console.log(reqBody);

        //check if user already existed
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error:"User already existed"},{status : 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        //generate plain token (NOT bcrypt)
        const token = crypto.randomBytes(32).toString("hex");
        newUser.verifyToken = token;
        newUser.verifyTokenExpire = Date.now() + 3600000; // 1 hour

        //await newUser.save();

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verifivation mail
        await sendMail({email,emailType : "VERIFY",userId : savedUser._id})
        
        return NextResponse.json({
            message : "User created successfully",
            success : true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status : 500})
    }
}