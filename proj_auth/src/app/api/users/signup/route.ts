import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connectDB()

interface ErrorWithMessage {
    message: string
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        // check if user already exists
        const user = await User.findOne({email: email})

        if(user){
            return NextResponse.json(
                {error: "user already exists"},
                {status: 400}
            )
        }

        // hash password 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        // console.log(savedUser);

        return NextResponse.json({
            message: "User is created",
            success: true,
            savedUser
        })
        
        
    } catch (error) {
        const err = error as ErrorWithMessage
        return NextResponse.json(
            {error: err.message},
            {status: 500}
        )
    }
}