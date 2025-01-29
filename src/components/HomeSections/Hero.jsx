import React from 'react'
import { IoIosSearch } from "react-icons/io";

const Hero = () => {
  return (
    <div className='min-h-screen flex w-full relative bg-hero bg-no-repeat bg-cover bg-center'>
       <div className="absolute inset-0 gradient-black"></div>
       <div className="relative flex pt-[200px] text-center w-full m-auto justify-center items-center flex-col text-white z-10 px-3 md:px-7 ">

    <h1 className="sm:text-4xl text-3xl md:text-5xl xl:text-6xl pb-3 font-header md:leading-normal
     font-bold">Find the Best Professionals in Your Area.</h1>
    <p className="sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-black ">Reliable, vetted, and ready to help with all your needs.</p>

    <div className="join pt-10">
  <div>
    <div>
      <input className="input text-lg w-full text-gray-500 input-bordered join-item" placeholder="Where do you need a service?" />
    </div>
  </div>
  <select className="select text-lg select-bordered text-black join-item">
    <option disabled selected>Service</option>
    <option>Cleaning</option>
    <option>Plumbng</option>
    <option>Painting</option>
    <option>Home Repair</option>
    <option>Flooring</option>
    <option>Capentry</option>
  </select>
  <div className="indicator">
    <button className="btn text-white join-item
     bg-gradient-to-r from-green to-green">
      Search
    </button>
  </div>
</div>


  </div>
    </div>
  )
}

export default Hero
