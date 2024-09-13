import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server';

connectDB()

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })

        return response

    } catch (error) {
        return NextResponse.json((error as Error).message) 
    }
}