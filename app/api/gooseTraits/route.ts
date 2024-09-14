import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";
import { NextRequest, NextResponse } from "next/server";

// gets a list of all goose traits and associated ids
export async function GET(req: NextRequest) {
    try {
        await connect();
        const traitPrompts = await Goose.find({}, "traitsPrompt");
        return new NextResponse(JSON.stringify(traitPrompts), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                message: "Error in fetching traitsPrompt ",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}
