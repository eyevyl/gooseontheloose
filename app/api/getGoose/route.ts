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

        const id = await getID();
        const midterm = await getMidterm(); 

        const mergedGooseData = {
            ...body,
            id: id,
            midterm: midterm,
        }

        const newGoose = new Goose(mergedGooseData);
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
    let sum = 0;
    let result = 0;

    for (let j = 0; j < 12; j++) {
        sum += Math.random();
    }

    sum -= 6;

    let p = Math.random(); 
    
    if (p >= 0.9) {
        result = Math.floor(sum * 5 / 6 + 95);
    } else if (p >= 0.6) {
        result = Math.floor(sum * 20 / 6 + 80);
    } else {
        result = Math.floor(sum * 50 / 6 + 50);
    }

    console.log("Midterm mark generated: " + result);
    return(result);
}
