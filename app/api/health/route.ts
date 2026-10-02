import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {

    return NextResponse.json({status:'ok',message:"Responsive.all is well"},{status:200})
    
}