import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";

import { NextRequest, NextResponse } from "next/server";

let idCounter = 0;

// http://localhost:3000/api/getGoose

// Gets all geese from the database

export async function GET(req: NextRequest) {
    try {
        await connect();
        const geese = await Goose.find();
        return new NextResponse(JSON.stringify(geese), { status: 200 });
    } catch (error: any) {
        return NextResponse.json("Error in fetching geese" + error.message, {
            status: 500,
        });
    }
}

// Creates a new goose 

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connect();
        const newGoose = new Goose(body);
        await newGoose.save();
    
        return new NextResponse(
          JSON.stringify({ message: "New goose created.", goose: newGoose }),
          { status: 200 }
        );
      } catch (error: any) {
        return new NextResponse("Error in creating goose" + error.message, {
          status: 500,
        });
    }
}

async function getID() {
    idCounter++; 
    return idCounter; 
} 

async function getMidterm() {
    
}
