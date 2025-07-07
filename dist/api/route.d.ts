import { NextResponse } from 'next/server';
export declare function chatHandler(req: Request): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    response: string;
}>>;
