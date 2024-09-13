import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token,
            verifyTokenExpiry: {
                $gt: Date.now()
            }
        })
        if(!user) {
            return NextResponse.json({error: "User not found"},{status:404})
        }
        console.log(user);

        user.isVarified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        const savedUser = await user.save()
        return NextResponse.json({
            message: "Email verified successfully",
            user: savedUser,
            success: true
        },{status:200})
        
        
    } catch (error) {
        return NextResponse.json((error as Error).message)  
    }
}