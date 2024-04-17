import React, { useState } from 'react'
import { GoogleGenerativeAI,GenerativeModel  } from '@google/generative-ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import {API_KEY} from './API.js'
function ImageGenerator() {
    const [text,settext]=useState('')
    const [input,setinput]=useState('')
   const [tf,settf]=useState(true)
   const copy=()=>{
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard")
  }
    const generateImage=async(e)=>{
        e.preventDefault();
       if(!input)
       {
        toast.error("Prompt is Empty !")
         return
       }
        try {
          settf(false)
          const apiKey = API_KEY
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-pro"});
          const response = await model.generateContent(input);
          settf(true)
          settext((prev)=> prev+"\nYou - "+input+"\n"+"RUDRA  \n"+response.response.candidates[0].content.parts[0].text)
          // settext((prev)=>prev+"\nYou -"+input+"\n"+"RUDRA  '\n"+respone)
          setinput('')
    }
         catch (error) {
          console.log("error= "+error);
        }
      };
      
  return (
    <>
    <div className='justify-center m-12 mainclass'>
      <div>
    <h1 className='text-3xl font-bold py-1 flex'> <span className='text-white'>AI </span><span className='underline decoration-sky-500 text-red-600 px-2'>RUDRA</span></h1>
    <div className=''>
      <div>
      <CodeMirror
      value={text}
      theme={vscodeDark}
      height="500px"
      width='800px'
    />
    <button className='ml-2 px-7 py-2 border-solid border-2 border-blue-500 bg-blue-700 hover:bg-blue-400 text-slate-200 rounded-full' disabled ={(text.length==0)?true:false} onClick={()=>settext("")}>Clear</button>
      <button className='ml-2 px-7 py-2 border-solid border-2 border-lime-700 bg-lime-600 hover:bg-lime-500 text-slate-200 rounded-full' disabled ={(text.length==0)?true:false} onClick={copy}>Copy</button>
        <form onSubmit={generateImage} >
        <div className="w-96 py-4">
  <div className="relative w-full min-w-[200px]">
  
    <div className=''>
  
     
     </div>
  </div>
  
</div>
    <input className='w-96 py-2 px-2 bg-black text-slate-200 rounded-full' type='text' placeholder='Enter a Promt' value={input} onChange={(e)=>setinput(e.target.value)} />
    <button className='ml-2 px-7 py-2 border-solid border-2 border-red-500 bg-red-700 hover:bg-red-400 text-slate-200 rounded-full'>{tf==false?'Generating...':'Generate'}</button>
    
    
    </form> 
    
    <div>
    </div>
    </div>
</div>
</div>
    </div>
    <ToastContainer />
    </>
  )
}

export default ImageGenerator