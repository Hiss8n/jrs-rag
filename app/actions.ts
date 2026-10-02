'use me' // Or 'use server'
'use server'

import { createEmbeddings } from '@/lib/embeddings'
import { prisma } from '@/lib/prisma' // Adjust import path to your prisma.ts file
import { revalidatePath } from 'next/cache'

export async function createFAQ(formData: FormData) {
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  // Simple validation
  if (!question || !answer) {
    throw new Error('Question and Answer are required')

  
  }
;
    const text=`${question} ${answer}`
    const vectorString= await createEmbeddings(text);
    const vector =vectorString && vectorString.length > 0 ? `[${vectorString.join(",")}]`: null;


  // Insert data into PostgreSQL using 
  await prisma.$executeRaw`
  INSERT INTO "FAQ" ("question","answer","embeddings","createdAt")
  VALUES(
    ${question},
    ${answer},
    ${vector}::vector,
    NOW()
  )
  
  `

/*   await prisma.fAQ.create({
    data: {
     question,
      answer,
      embeddings:vector ?? null 
    }, 
  }) */

  // Refresh page data cache so the new item displays immediately
  revalidatePath('/faqs')
}