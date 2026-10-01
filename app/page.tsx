"use client";

import { role } from "@prisma/orm-postgres/contract-builder";
import axios from "axios";
import { ScrollBehavior } from "next/dist/client/components/router-reducer/router-reducer-types";
import {  useEffect, useRef, useState, type KeyboardEvent } from "react";

interface Message {
  role: 'assistant' | 'user' | 'system'; // Restricts role to valid values
  content: string;
}

export default function Home() {

  const messageRef=useRef(null)

 
  const [isOpen,setIsOpen]=useState(false)

  const [userInput,setUserInput]=useState("")
  const [messeges,setMesseges]= useState<Message[]>([])

  const fetchMessage = async (query: string) => {
    const res = await axios.post("/api/chat", { query });
    console.log("Ans:",res.data)
    return res.data;
  };

  const handleChatBot=()=>{
  console.log("clikced")
  setIsOpen((prev)=>!prev)

}
  
  const handleChatMessaging = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (userInput.trim() === "") return;

    if (e.key === "Enter" && userInput.trim() !== "") {
       console.log("Messages:",messeges);
       setMesseges((prev)=>[...prev,{role:"user",content:userInput.trim()}])
      const answer = await fetchMessage(userInput.trim());
        setUserInput("");
      setMesseges((prev) => [
        ...prev,
        { role: "assistant", content: answer }
      ]);
    /*   setUserInput(""); */
    }
  };

   useEffect(()=>{
    const scrollToBottom=()=>{
      messageRef.current?.scrollIntoView({behavior:'smooth'})
    }

    scrollToBottom()

  },[messeges,userInput])

 
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
          <ul className='mx-2  h-96 mt-2 overflow-y-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden  bg-transparent'>

              {(messeges.length < 1
                ? [{ role: "assistant", content: "Hi👋🏻, ask me anything about Digipass. I can answer any question from our faqs" }] 
                : messeges
              ).map((msg, id) => (
                <li key={id}  className={`flex mb-2 ${msg.role==='user'?'justify-end':'justify-items-end'}`}>
                  <div className={`flex flex-col-reverse ${msg.role==='user'?'justify-end':'justify-items-start'} w-[60%] h-[50%] ${msg.role==='user'?' bg-blue-500':'bg-slate-300'} rounded-t-lg ${msg.role==='user'?'rounded-bl-lg':'rounded-br-lg'}`}>
                    <p className="text-md text-gray-700 p-1">{msg.content} </p>
                  </div>
                </li>
              ))}
               <div ref={messageRef}/>

           </ul>
          
  
          <div className='w-full flex flex-col mt-3 items-center bg-slate-700  relative'>

{/* 
            <div className="w-96 mt-20 flex-1 flex relative bg-black">  */}
          
            <input
              type="text"
              id="question"
              name="question"
              value={userInput}
              placeholder="chat ..."
              onChange={(e)=>setUserInput(e.target.value)}
              onKeyDown={(e)=>handleChatMessaging(e) }
              required
              className='focus:outline-none focus:ring-0 focus:ring-offset-0  text-slate-700 bg-slate-100 px-6 py-2 rounded-b-lg overflow-hidden absolute w-88  mx-4  mb-3 border-0 focus:border-0 sm:px-1'
            />
            <button type="submit" className='px-2 py-1  text-blue-600  right-0  absolute ' onClick={()=>{handleChatMessaging}}>
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
