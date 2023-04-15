import React from 'react'
import {BiSearch} from 'react-icons/bi'

const Search = () => {
  
  return (
    <>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 relative xl:left-40 lg:left-30 md:left-20 sm:left-10">
          <div className=''>
              
              <h1 className='text-2xl font-medium text-white'>Name or Number</h1>

              <div className='flex'>
                <input type="text"  className='p-2 w-8/12 border-4 border-gray-400 rounded' />
                <button className='px-5 ml-8 bg-orange-500 rounded'><BiSearch size={30} color='white'/></button>
              </div>
              <p className='text-white text-sm max-sm:text-xs'>Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!</p>
          </div>
          <div className='p-4 pt-2 max-md:my-5 lg:h-24 w-8/12 bg-green-500 rounded-md md:block max-sm:hidden'>
            <span className='text-white xl:text-xl lg:text-lg md:text-md '>Search for a Pokémon by name or using its National Pokédex number.</span>
          </div>
      </div>
    </>
  )
}

export default Search
