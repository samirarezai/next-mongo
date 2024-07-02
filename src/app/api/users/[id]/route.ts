// app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import dbConnect from "@/lib/mongodb";
import UserModel from "@/models/UserModel"; // Ensure this model exists and is set up correctly

interface User {
    _id: ObjectId;
    name: string;
    email: string;
    // Add other user fields here
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    try {
        await dbConnect();

        const user = await UserModel.findById(new ObjectId(id)).lean<User>().exec();

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
