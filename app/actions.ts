'use me' // Or 'use server'
'use server'

import { prisma } from '@/lib/prisma' // Adjust import path to your prisma.ts file
import { revalidatePath } from 'next/cache'

export async function createFAQ(formData: FormData) {
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  // Simple validation
  if (!question || !answer) {
    throw new Error('Question and Answer are required')
  }

  // Insert data into PostgreSQL using Prisma
  await prisma.fAQ.create({
    data: {
      question,
      answer,
    },
  })

  // Refresh page data cache so the new item displays immediately
  revalidatePath('/faqs')
}