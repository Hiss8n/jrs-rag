"use client";
import axios from "axios";
import Link from "next/link";
import {  useEffect, useRef, useState, type KeyboardEvent } from "react";

interface Message {
  role: 'assistant' | 'user' | 'system'; // Restricts role to valid values
  content: string;
}

export default function Home() {

const WORDS = ["Digital Inclusion", "Education", "Mental Health & Psychosocial Support (MHPSS)","Livelihoods & Economic Inclusion","Advocacy & Protection"];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

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
  const sendMessage=async()=>{
    if (userInput.trim() === "") return;
       console.log("Messages:",messeges);
       setMesseges((prev)=>[...prev,{role:"user",content:userInput.trim()}])
      const answer = await fetchMessage(userInput.trim());
        setUserInput("");
      setMesseges((prev) => [
        ...prev,
        { role: "assistant", content: answer }
      ]);

  }
  const handleChatMessaging = async (e: KeyboardEvent<HTMLInputElement> | null) => {
   

    if (e.key === "Enter" && userInput.trim() !== "") {
      sendMessage()
    
    /*   setUserInput(""); */
    }
  };

   useEffect(()=>{
    const scrollToBottom=()=>{
      messageRef.current?.scrollIntoView({behavior:'smooth'})
    }

    scrollToBottom()

  },[messeges,userInput])


  useEffect(() => {
    // Change word every 4 seconds
    const interval = setInterval(() => {
      // Trigger fade out
      setFade(false);

      // Wait 300ms for fade-out animation to complete, then switch text and fade in
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % WORDS.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

 
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[linear-gradient(to_top_right,rgba(7,26,70,0.88)_0%,rgba(7,26,70,0.72)_38%,rgba(34,211,238,0.72)_58%,rgba(255,255,255,0.72)_80%,rgba(230,250,250,0.58)_100%),url('/background.jpg')] bg-cover font-sans inset-0">
      <header className="flex w-full h-24 justify-center">
        <ul className="flex min-h-12 w-full max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-lg sm:gap-6 sm:text-base border-b border-slate-200 pb-1">
          <li className="text-amber-500 text-xl border rounded-2xl px-3 py-1 font-bold">JRS DIGITAL</li>
          <li>About</li>
          <li>Refugee Services</li>
          <li>Contact Us</li>
          <Link href={"/faqs"} className="px-4 py-1 bg-amber-500 text-white font-bold rounded-md border border-amber-50"><li>Admin Page</li></Link>
        </ul>
        <hr className="my-4 border-t border-gray-300" />

      </header>
   <div className="flex flex-1 flex-col items-start justify-center gap-8 px-4 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4"> 
    <div className="w-full max-w-6xl"> 
      <section className="mx-0 max-w-4xl sm:mx-4">
        <h2 className="my-6 text-3xl font-extrabold sm:my-10 sm:text-4xl lg:text-5xl text-white ">Building the Digital Generation</h2>
        <span className={`text-2xl font-medium text-amber-500 sm:text-3xl animate-pulse transition-opacity duration-300 ease-in-out ${fade?"opacity-100":"opacity-0"}`}>{WORDS[index]}</span>
      </section>
      <section className="mt-6 sm:mx-4">
        <p className="mx-0 font-mono text-xl text-slate-200 sm:mx-4 sm:text-2xl">The start of a journey start with one step</p>
        <div className="mt-4 flex flex-col items-stretch gap-3 sm:mx-4 sm:flex-row sm:items-center">
           <button className="rounded-3xl border border-slate-200 bg-amber-500 px-8 py-3 text-xl text-taupe-100 sm:px-12 sm:text-2xl">Get in touch</button>
        <button className="rounded-3xl border border-slate-100 px-8 py-3 text-xl text-slate-100 sm:px-12 sm:text-2xl">Get in touch</button>
      
        </div>
       
      </section>
      </div>


      <div  className={`${!isOpen ? "hidden" : ""} fixed bottom-4 right-4 z-50 grid h-[min(28rem,calc(100dvh-2rem))] w-[calc(100vw-2rem)] max-w-[19.2rem] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-b-3xl rounded-t-sm bg-slate-200 shadow-xl sm:right-6`}>

        <div className="flex h-12 w-full items-center justify-between rounded-t-sm rounded-b-md bg-[#15c]"> 
          <div className="flex justify-center mx-4" >

         
            <img src={'/7.svg'} width={40} height={40}/>
          <h2 className="text-xl text-amber-400 font-bold text-start ml-2  mt-0.5 pt-2">
          
            
            Ask Zara</h2>
             </div>
          <button onClick={handleChatBot} className={`${!isOpen?"hidden":""} mr-4 text-slate-200 font-bold`}>x</button>
         </div> 
          <ul className='mx-2 mt-2 min-h-0 overflow-y-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden bg-transparent'>

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
          
  
          <div className='relative mt-3 flex w-full items-center bg-slate-100 px-1 pb-2'>

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
              className='w-full rounded-b-lg border-0 px-3 bg-slate-100 py-2 pl-4 pr-16 text-slate-700 focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0'
            />
            <button type="submit" className='absolute right-3 px-2 py-1 text-blue-600' onClick={sendMessage}>
            send
          </button>
      {/*     </div> */}


          </div>
        
          
          

      </div>

      <div  className={`fixed bottom-6 right-6 z-40 flex h-16 w-16 ${isOpen ? "hidden" : ""} cursor-pointer items-center justify-center rounded-full bg-amber-500 shadow-lg animate-bounce`}> 
     {/*  <div className="flex  rounded-full w-15 h-15 mr-8 bg-blue-400 items-center justify-center top-50 relative cursor-pointer animate-pulse"> */}
        <button onClick={handleChatBot} className={`${isOpen?"hidden":""} text-white font-medium `}>CHAT</button>
   {/*    </div> */}
        </div>
        
       </div>
     

    </div>
  );
}
