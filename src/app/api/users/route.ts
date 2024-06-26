import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET(request) {
    await dbConnect();
    const users = await User.find({});
    return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request) {
    const { name, email, age } = await request.json();
    await dbConnect();
    const newUser = new User({ name, email, age });
    await newUser.save();
    return new Response(JSON.stringify(newUser), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}