import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/utils/mailer'

connectDB()


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {uesrname, email, password} = body
        
        // validation 
        console.log(body);

        // check if user exists
        const user = await User.findOne({email})
        if(user) {
            return NextResponse.json({error: "User already exists"})
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);


        // create new user
        const newUser = new User({
            username: uesrname,
            email,
            password: hashedPassword
        })
        // save new user
        const savedUser = await newUser.save()
        console.log(savedUser);
        
        // send verification mail
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({message: "User created successfully", success: true, savedUser})
        


    } catch (error) {
        return NextResponse.json((error as Error).message)
    }
}