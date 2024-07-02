import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import UserModel from "@/models/UserModel";
import {sendEmail} from "@/app/helpers/mailer";


// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest) {
// Defines an asynchronous POST request handler.
    try {
        await dbConnect();
        const reqBody = await request.json()
        const {username, email, password} = reqBody
// Parses the request body to extract username, email, and password.

//Checks if a user with the provided email already exists.
        const user = await UserModel.findOne({email})

//If yes, returns a 400 response.
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

//hash password using bcryptjs.
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

// Saves the new user to the database.
        const savedUser = await newUser.save()

//send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })



    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}