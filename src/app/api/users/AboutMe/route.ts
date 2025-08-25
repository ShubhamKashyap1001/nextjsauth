import {connect} from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helper/getDataFromToken';
import User from '@/model/usermodel';
import { NextRequest,NextResponse } from 'next/server';

connect();

export async function POST(request : NextRequest){
    // extract or get data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")

    console.log("userId : ",userId);
    console.log(typeof userId);

    console.log("user : ",user);
    console.log(typeof user);
    
    //check if there is no user
    return NextResponse.json({
        message : "User found",
        data : user
    })
}