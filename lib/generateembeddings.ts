import dotenv from "dotenv"

dotenv.config()

import {prisma} from "./prisma"

import  {createEmbeddings} from './embeddings'


async function main() {

    const faqs= await prisma.fAQ.findMany()

    for (const faq of faqs){
        const text=`${faq.question} ${faq.answer}`;
        const embedding= await createEmbeddings(text);
        const vector=`[${embedding.join(",")}]`

        await prisma.$executeRaw`
        UPDATE "FAQ"
        SET embeddings=${vector}::vector
        WHERE id = ${faq.id}
        
        `;
        console.log(`🟢 Embedded ${faq.question}`)
    };
    console.log("DONE! 🎉")
    
}

main().catch((e)=>console.log("error occurred",e)).finally(()=>prisma.$disconnect())