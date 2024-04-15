import React, { useState } from 'react'
import { GoogleGenerativeAI,GenerativeModel  } from '@google/generative-ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API_KEY} from './API.js'
function ImageGenerator() {
    const [text,settext]=useState('')
    const [input,setinput]=useState('')
   const [tf,settf]=useState(true)
    const generateImage=async(e)=>{
        e.preventDefault();
       if(!input)
       {
        toast.error("Promt is Empty !")
         return
       }
      
        try {
          settf(false)
          const apiKey = API_KEY
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-pro"});
          const response = await model.generateContent(input);
          settf(true)
          setinput('')
          settext((prev)=> prev+"\n"+response.response.candidates[0].content.parts[0].text)
    }
         catch (error) {
          console.log("error= "+error);
        }
      };
    
  return (
    <>
    <div className='justify-center m-12'>
      <div>
    <h1 className='text-3xl font-bold py-1 flex'> <span className='text-white'>AI </span><span className='underline decoration-sky-500 text-red-600 px-2'>RUDRA</span></h1>
    <div className='flex'>
        <form onSubmit={generateImage} >
        <div className="w-96 py-4">
  <div className="relative w-full min-w-[200px]">
    <textarea 
      value={text}
      className="flex textown peer h-full min-h-[500px] resize rounded-[7px] border border-blue-gray-200 border-t-transparent bg-black px-3 py-2.5 font-sans text-xl font-normal text-slate-300 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder="Your Response"></textarea>
  </div>
</div>
    <input className='w-96 py-2 px-2 bg-black text-slate-200 rounded-full' type='text' placeholder='Enter a Promt' value={input} onChange={(e)=>setinput(e.target.value)} />
    <button className='ml-2 px-7 py-2 border-solid border-2 border-red-500 bg-red-700 hover:bg-red-400 text-slate-200 rounded-full'>{tf==false?'Generating...':'Generate'}</button>
    <button className='ml-2 px-7 py-2 border-solid border-2 border-blue-500 bg-blue-700 hover:bg-blue-400 text-slate-200 rounded-full'  onClick={()=>settext("")}>Clear</button>
    </form> 
    <div>
    </div>
</div>
</div>
    </div>
    <ToastContainer />
    </>
  )
}

export default ImageGenerator