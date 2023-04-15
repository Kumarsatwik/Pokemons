import React from 'react'
import {TbBrandChrome} from 'react-icons/tb'
const Sort = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-between w-full relative xl:left-40 lg:left-30 md:left-20 sm:left-10 py-5 ">
            
            <div className="">
              <button type="button" className='px-10 rounded-md bg-[#1b82b1] text-white h-10 flex justify-center items-center'><TbBrandChrome size={30}/> Surprise Me</button>
            </div>
            
              <div className='flex  lg:px-4 lg:w-full '>
                <p className='text-gray-500 mr-5 mt-1 text-xl max-lg:hidden '>Sort By</p>
                <select name="" className="rounded-md bg-black text-white lg:px-10 py-2" >
                  <option value="">Lowest Number (First)</option>
                  <option value="">Highest Number (First)</option>
                  <option value="">A-Z</option>
                  <option value="">Z-A</option>
                </select>
            </div>
        </div>
        
    </>
  )
}

export default Sort
