'use server'

import { prisma } from '@/lib/prisma'
import { createFAQ } from '@/app/actions'

export default async function FAQsPage() {
  // Fetch existing items to display on the page
const faqs = await prisma.fAQ.findMany({
  /* sortedbyDESC */
}) 


  return (
    <main className='mx-auto flex min-h-screen w-full max-w-7xl flex-col bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8'>
      <h1 className="mt-2 text-center font-mono text-2xl font-bold sm:text-3xl">ADMIN DASHBOARD</h1>
     <div className='mx-auto mt-6 grid w-full grid-cols-1 gap-6 md:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'>
      <section className='flex min-w-0 flex-col rounded-md bg-white p-4 shadow-sm sm:p-6'>
      <h2 className='mt-1 text-center font-mono text-2xl font-semibold text-blue-600'>Add Data</h2>
      {/* Form submitting to the Server Action */}
      <form action={createFAQ} className='mt-4 flex w-full flex-col gap-4'>
        <div className='flex w-full flex-col gap-1'>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            required
            className='w-full rounded-sm border-2 border-slate-200 p-3 text-slate-900 focus:border-amber-400 focus:outline-none'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            name="answer"
            required
            rows={4}
            className='w-full resize-y rounded-sm border-2 border-slate-200 p-3 text-slate-900 focus:border-amber-400 focus:outline-none'
          
          />
        </div>

        <button type="submit" className='w-full rounded-md bg-green-700 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto'>
          Save FAQ
        </button>
      </form>
     </section>

    <section className='flex min-h-72 min-w-0 flex-col rounded-md bg-white p-4 shadow-sm sm:p-6'>

      <h2 className='my-1.5 text-center text-2xl font-semibold'>Existing FAQs</h2>
      <ul className='mt-3 max-h-[60vh] w-full space-y-4 overflow-y-auto pr-2 md:max-h-144'>
        {faqs.map((faq) => (
          <li key={faq.id} className='border-b border-slate-200 pb-4 last:border-b-0'>
            <strong className='block wrap-break-word'>{faq.question}</strong>
            <p className='mt-1 whitespace-pre-wrap wrap-break-word text-slate-700'>{faq.answer}</p>
          </li>
        ))}
      </ul>
      </section>
       </div>
    </main>
  )
}