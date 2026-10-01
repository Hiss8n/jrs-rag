
import dotenv from "dotenv"
dotenv.config()
import { NextRequest, NextResponse } from "next/server";

import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(
  process.env.HF_API_KEY
);
import { createEmbeddings } from "@/lib/embeddings";
import { prisma } from "@/lib/prisma";

console.log('my embeddings')


export async function POST(req:NextRequest) {

    try {

        const {query}=await req.json()

        const embedding= await createEmbeddings(query)
     

       /*  const vector=`[${(embedding.join(","))}]`; */
        const vectorString = JSON.stringify(embedding)

        const faqs= await prisma.$queryRaw<{
            id:string,
            question:string,
            answer:string
        
        }[]>`
        select
            id,
            question,
            answer
        from match_faqs(
            ${vectorString}::vector,
            0.4,
            10
        )
        `
        if(!faqs || faqs.length==0){
            return NextResponse.json([
                
                     "I don't have any information about that.Please try asking another questions "
                
            ]
               
            )
        }

        const context= faqs.map(f=>`Q:${f.question}\nA:${f.answer}`).join("n\n\\")

        /* TODO: SET UP a chat response AI e.g chatgpt chat commpletions, needs an api key */ 

        const response= await hf.chatCompletion({
            model:"Qwen/Qwen2.5-Coder-32B-Instruct",
            messages:[{
                role:"system",
                content:`You are a helpful Q&A assistant. Answer the user's question using ONLY using this context:n\n\:${context}`
            },
            {
                role:"user",
                content:`${query}`
            }
        ],
        max_tokens:500,
        temperature:0.2
        })

/*         console.log(response.choices[0]?.message?.content)
 */
        return NextResponse.json(response.choices[0]?.message?.content ?? "Sorry ,I counldn't generate response right now.Please try agin later")
        
    } catch (error) {
        console.log("An error occurred",error)
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
    
}