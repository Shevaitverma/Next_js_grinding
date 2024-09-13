import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB()


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {email, password} = body
        
        // validation 
        console.log(body);

        // check if user exists
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: "User not found"})
        }

        // check if password is correct
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect) {
            return NextResponse.json({error: "Incorrect password"})
        }

        // generate token
        const token = jwt.sign(
            {
                email: user.email,
                username: user.username,
                id: user._id
            }, 
            process.env.JWT_SECRET!, 
            {
                expiresIn: "1h"
            })

        const repsonse = NextResponse.json({
            message: "Login successful",
            data: user, 
            token: token
        })

        repsonse.cookies.set("token", token, {
            httpOnly: true,
        })
        return repsonse
        

    } catch (error) {
        return NextResponse.json((error as Error).message) 
    }
}