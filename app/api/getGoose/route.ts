import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";

import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/getGoose

// Gets all geese from the database

export async function GET(req: NextRequest) {
    try {
        await connect();
        const geese = await Goose.find();
        return new NextResponse(JSON.stringify(geese), {status: 200}); 
    } catch (error: any) {
        return NextResponse.json("Error in fetching users" + error.message, {status: 500,});
    }
}
