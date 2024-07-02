import { NextResponse } from 'next/server';
import specs from '../../../config/swagger';

export async function GET() {
    return NextResponse.json(specs);
}