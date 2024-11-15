import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        // console.log("Received request body:", reqBody);
        

        // check if user exists 
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {error:"User Does not exist"},{status: 400}
            )
        }
        //check if password is correct 
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json(
                {error:"Wrong password, please enter correct password"},{status: 400}
            )
        }

        // create token data 
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        // create token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRETE!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        // set cookies 
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response

    } catch (error: any) {
        // console.error("Error during login:", error);
        return NextResponse.json(
            {error:error.message},{status: 500}
        )
    }
}