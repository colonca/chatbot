import {useState} from "react";
import Message from "./Message";

function ChatBot() {

 const [open,setOpen] = useState(false);

  return  (
       <div className='fixed bottom-4 right-4'>
            {open && (
               <div className="chat m-2 w-96 shadow-md rounded-lg">
                 <div className="bg-red-500 rounded-t-lg text-white flex justify-between items-center px-2 py-5">
                      <div className="flex">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                         </svg>
                         <div className="ml-2">ChatBot</div>
                      </div>
                      <button onClick={() => {setOpen(false)}}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </button>
                 </div>     
                 <div className="h-96 overflow-y-auto py-4">
                   <Message content={['Hola ¡qué bueno verte por aquí! 👋', 'En que te podemos ayudar']}/> 
                   <Message own={true} content={['Buen día 😍']}/>  
                 </div>
                 <div class="relative block border-t-2 rounded-lg border-gray-100">
                    <span class="sr-only">Search</span>
                    <span class="absolute inset-y-0 right-1 flex items-center pr-2 cursor-pointer">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                         </svg>
                    </span>
                    <input class="placeholder:italic placeholder:text-gray-400 block bg-white w-full py-4 pl-2 pr-3 focus:outline-none focus:border-gray-50 focus:ring-gray-50 focus:ring-1 sm:text-sm" 
                         placeholder="Escribir mensaje" 
                         type="text" 
                         name="message"
                    />
                 </div>
               </div>
            )}
            {!open && (
              <button onClick={() => setOpen(true)}>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <circle cx="30" cy="30" r="30" fill="#ef4444"></circle>
                         <path fill-rule="evenodd" clip-rule="evenodd" d="M44.7162 18.4889C44.4616 16.9135 43.5114 15.9649 41.9805 15.7484C41.9432 15.7395 38.2151 15.0243 32.3643 15.0243C26.5151 15.0243 22.787 15.7395 22.7619 15.7451C21.5643 15.9154 20.7292 16.5292 20.2954 17.5224C22.8025 17.2453 25.3233 17.1091 27.8457 17.1146C33.5165 17.1146 37.2892 17.7665 37.843 17.8686C40.3395 18.2432 42.0754 19.9751 42.4954 22.513C42.677 23.34 43.2511 26.2476 43.2511 29.7186C43.2511 31.577 43.0841 33.2822 42.9041 34.5851C43.8932 34.1668 44.516 33.3284 44.7122 32.117C44.7187 32.087 45.4362 29.0246 45.4362 25.2941C45.4362 21.5643 44.7187 18.5019 44.7146 18.4881" fill="white"></path>
                         <path fill-rule="evenodd" clip-rule="evenodd" d="M40.1976 22.9135C39.943 21.3373 38.9919 20.3886 37.4619 20.1713C37.4246 20.1632 33.6965 19.4497 27.8465 19.4497C21.9973 19.4497 18.2684 20.1632 18.244 20.1697C16.7011 20.3886 15.7508 21.3373 15.5003 22.8965C15.4921 22.9265 14.7754 25.9889 14.7754 29.7195C14.7754 33.4492 15.4921 36.5116 15.4962 36.5246C15.7508 38.1008 16.7011 39.0495 18.2319 39.2667C18.2619 39.2724 20.6805 39.7354 24.664 39.9162L27.0381 44.0286C27.12 44.1706 27.2378 44.2885 27.3797 44.3704C27.5216 44.4524 27.6826 44.4956 27.8465 44.4956C28.0103 44.4956 28.1713 44.4524 28.3132 44.3704C28.4551 44.2885 28.573 44.1706 28.6549 44.0286L31.0297 39.917C35.0132 39.7354 37.4294 39.2732 37.4497 39.2684C38.9919 39.0495 39.943 38.1008 40.1935 36.5416C40.2016 36.5116 40.9176 33.4492 40.9176 29.7195C40.9176 25.9889 40.2008 22.9265 40.1976 22.9135Z" fill="white"></path>
                    </svg>
               </button>
            )}
       </div>
  ); 
}

export default ChatBot;