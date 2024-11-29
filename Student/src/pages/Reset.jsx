import React, { useState } from 'react'

export default function Reset() {

  return <>

<form className='container pt-16 pb-48 '>
    <div class="w-96 mx-auto">
         <div class="">
        <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm Email</label>
        <input type="email" id="email" class="bg-gray-50 border  border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required />
    </div> 
    <div className='pt-2'>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
    </div>
   
</form>

  
  
  </>
}
