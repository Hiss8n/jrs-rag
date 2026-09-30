'use server'

import { prisma } from '@/lib/prisma'
import { createFAQ } from '@/app/actions'

export default async function FAQsPage() {
  // Fetch existing items to display on the page
const faqs = await prisma.fAQ.findMany() 


  return (
    <main className='container flex flex-col justify-between mx-auto bg-blue-slate-400 items-center space-x-1 h-screen'>
      <h1 className="text-center text-gray-900 text-2xl font-mono mt-2">ADMIN DASHBOARD</h1>
     <div  className='container flex  justify-between mx-auto bg-blue-slate-400 items-center space-x-1 h-screen'>
      <section className='flex flex-col max-w-2xl h-96 mx-4 items-center justify-center rounded-md shadow'>
      <h1 className='text-center text-gray-950/45 text-2xl font-mono mt-2'>Add  FAQs</h1>
      {/* Form submitting to the Server Action */}
      <form action={createFAQ} className='max-w-full h-full m-3 flex flex-col gap-4'>
        <div className='max-w-full flex flex-col gap-0.5 space-x-2'>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            required
            className='border-slate-100 rounded-sm border-2 focus:border-amber-300 p-2 text-gray-900'
          />
        </div>

        <div>
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            name="answer"
            required
            rows={4}
            className='w-full border-2 p-3 focus:border-amber-300  border-slate-100 rounded-sm overflow-hidden resize-none'
          
          />
        </div>

        <button type="submit" style={{ padding: '10px 16px', cursor: 'pointer' }} className='px-12 py-4 bg-green-700 text-taupe-300 text-xl rounded-md focus:
        focus:bg-green-600 transition-colors '>
          Save FAQ
        </button>
      </form>
     </section>

    <section className='w-4xl h-96  mx-4 rounded-sm grid items-center mt-0.5 grid-cols-1'>

      <h2 className='text-2xl align-text-top text-center my-1.5'>Existing FAQs</h2>
      <ul className='w-full h-96 ml-4 overflow-y-auto'>
        {faqs.map((faq) => (
          <li key={faq.id} style={{ marginBottom: '1rem' }}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
      </section>
       </div>
    </main>
  )
}