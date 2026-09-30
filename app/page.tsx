"use client";

import { useState } from "react";


export default function Home() {
  const [isOpen,setIsOpen]=useState(false)

  const messages = [
  {
    id: 1,
    sender: "John",
    message: "Hey, how are you?",
    time: "09:01"
  },
  {
    id: 2,
    sender: "Jane",
    message: "I'm good. How about you?",
    time: "09:02"
  },
  {
    id: 3,
    sender: "John",
    message: "I'm doing great.",
    time: "09:03"
  },
  {
    id: 4,
    sender: "Jane",
    message: "What are you working on today?",
    time: "09:04"
  },
  {
    id: 5,
    sender: "John",
    message: "I'm working on a JavaScript project.",
    time: "09:05"
  },
  {
    id: 6,
    sender: "Jane",
    message: "That sounds interesting.",
    time: "09:06"
  },
  {
    id: 7,
    sender: "John",
    message: "Yes, I'm learning about arrays.",
    time: "09:07"
  },
  {
    id: 8,
    sender: "Jane",
    message: "Arrays are very useful.",
    time: "09:08"
  },
  {
    id: 9,
    sender: "John",
    message: "I'm also learning DOM manipulation.",
    time: "09:09"
  },
  {
    id: 10,
    sender: "Jane",
    message: "Great! DOM manipulation is important.",
    time: "09:10"
  },
  {
    id: 11,
    sender: "John",
    message: "I'm going to build a chat application.",
    time: "09:11"
  },
  {
    id: 12,
    sender: "Jane",
    message: "Will it have real-time messages?",
    time: "09:12"
  },
  {
    id: 13,
    sender: "John",
    message: "Yes, eventually.",
    time: "09:13"
  },
  {
    id: 14,
    sender: "Jane",
    message: "You could use Socket.IO.",
    time: "09:14"
  },
  {
    id: 15,
    sender: "John",
    message: "That's a good idea.",
    time: "09:15"
  },
  {
    id: 16,
    sender: "Jane",
    message: "Are you using React?",
    time: "09:16"
  },
  {
    id: 17,
    sender: "John",
    message: "For now, I'm using plain JavaScript.",
    time: "09:17"
  },
  {
    id: 18,
    sender: "Jane",
    message: "That is a good way to understand the basics.",
    time: "09:18"
  },
  {
    id: 19,
    sender: "John",
    message: "Exactly.",
    time: "09:19"
  },
  {
    id: 20,
    sender: "Jane",
    message: "How are you storing the messages?",
    time: "09:20"
  },
  {
    id: 21,
    sender: "John",
    message: "Currently, I'm storing them in an array.",
    time: "09:21"
  },
  {
    id: 22,
    sender: "Jane",
    message: "You can later connect it to a database.",
    time: "09:22"
  },
  {
    id: 23,
    sender: "John",
    message: "Maybe MongoDB.",
    time: "09:23"
  },
  {
    id: 24,
    sender: "Jane",
    message: "MongoDB would work well.",
    time: "09:24"
  },
  {
    id: 25,
    sender: "John",
    message: "I have used MongoDB before.",
    time: "09:25"
  },
  {
    id: 26,
    sender: "Jane",
    message: "Then you already have a good start.",
    time: "09:26"
  },
  {
    id: 27,
    sender: "John",
    message: "I also want to add message timestamps.",
    time: "09:27"
  },
  {
    id: 28,
    sender: "Jane",
    message: "That will make the chat look more realistic.",
    time: "09:28"
  },
  {
    id: 29,
    sender: "John",
    message: "Yes, and I want to add user avatars too.",
    time: "09:29"
  },
  {
    id: 30,
    sender: "Jane",
    message: "Nice! Keep building it.",
    time: "09:30"
  }
];
const handleChatBot=()=>{
  console.log("clikced")
  setIsOpen((prev)=>!prev)

}
  const sendMessage=()=>{
    console.log("mesage send")
  }

  return (
    <div className="relative  h-160 w-screen flex-col bg-[45deg,rgba(30,0,0,0.8),rgba(30,0,0,0.8)] font-sans bg-[url('/background.jpg')] bg-cover inset-0 bg-blend-multiply ">
      <header className="flex max-h-full justify-center gap-4">
        <ul className="flex max-w-2xl h-[80px] items-center gap-2">
          <li className="text-amber-500 text-xl border rounded-2xl px-3 py-1">JRS DIGITAL</li>
          <li>About</li>
          <li>Refugee Services</li>
          <li>Contact Us</li>
        </ul>
      </header>
   <div className="flex items-center justify-between h-98 gap-4"> 
    <div className="max-w-6xl"> 
      <section className="max-w-4xl mt-10  h-56 mx-4">
        <h2 className="text-4xl font-extrabold ml-4 my-10">Building the Digital Generation</h2>
        <span className="ml-4 text-3xl font-medium text-amber-500 my-12">Digital Inclusion</span>
      </section>
      <section className="mx-4">
        <p className="font-mono text-2xl text-slate-900 mx-4">The start of a journey start with one step</p>
        <div className="md:flex items-center ml-4 gap-3 mt-4">
           <button className="px-12 py-2 rounded-3xl text-2xl p-4 border bg-amber-500 text-taupe-100  border-slate-200 ">Get in touch</button>
        <button className="px-12 py-2 rounded-3xl text-2xl p-4 text-slate-950  border-slate-800 border">Get in touch</button>
      
        </div>
       
      </section>
      </div>


      <div  className={` ${!isOpen?"hidden":""} w-88 h-120  rounded-b-3xl bg-slate-200 items-center my-26 mt-36  grid-cols-1 justify-between rounded-t-sm mr-12 shadow-xl  `}>

        <div className="w-88 h-12 flex   bg-[#15c]  rouded-b-lg rounded-b-md  rouded-t-sm items-center justify-between  "> 
          <h2 className="text-xl text-amber-400 font-bold text-start ml-2  mt-0.5 pt-2">Zara-CHATBOT</h2>
          <button onClick={handleChatBot} className={`${!isOpen?"hidden":""} mr-4 text-red-600 font-bold`}>X</button>
         </div> 
          <ul className='mx-2 bg-transparent h-96 mt-2 overflow-y-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden'>
        {messages.map((msg,id) => (
          <li key={id} style={{ marginBottom: '1rem' }}>
           {/*  <strong>{msg.question}</strong> */}
           <div className="flex items-`${end}`"> <p >{msg.message}</p></div>
           
          </li>
        ))}
           </ul>
  
          <div className='w-full flex flex-col mt-3 items-center bg-amber-300  relative'>

{/* 
            <div className="w-96 mt-20 flex-1 flex relative bg-black">  */}
          
            <input
              type="text"
              id="question"
              name="question"
              placeholder="chat ..."
              required
              className='focus:outline-none focus:ring-0 focus:ring-offset-0  text-amber-400 bg-slate-400 px-6 py-2 rounded-b-lg  w-88 overflow-hidden absolute mx-4  mb-3 border-0 focus:border-0 sm:px-1'
            />
            <button type="submit" className='px-2 py-1  text-amber-400  right-0  absolute '>
            send
          </button>
      {/*     </div> */}


          </div>
        
          
          

      </div>

      <div  className={`flex ${isOpen?"hidden":""} rounded-full w-15 h-15 mr-8 bg-blue-400 items-center justify-center top-60 relative cursor-pointer`}> 
     {/*  <div className="flex  rounded-full w-15 h-15 mr-8 bg-blue-400 items-center justify-center top-50 relative cursor-pointer animate-pulse"> */}
        <button onClick={handleChatBot} className={`${isOpen?"hidden":""}`}>CHAT</button>
   {/*    </div> */}
        </div>
        
       </div>
     

    </div>
  );
}
