import React from 'react'
import { CalendarCheck, Briefcase, Handshake } from "phosphor-react";

const HowItWorks = () => {
  return (
    <div className='h-full border-b border-gray-300 border-dashed py-28 px-6 w-full text-center bg-white'>
      <h1 className='header text-black'>How It Works</h1>

      <div className="pt-24 xl:px-10  justify-center grid md:grid-cols-3 gap-6">

        <div className="md:pb-0 pb-7">
          <div className=' w-fit m-auto bg-green px-6 md:px-8 md:py-6 py-5 rounded-tl-3xl mb-5 rounded-br-3xl text-white'>
            <CalendarCheck size={50} weight="regular" />
          </div>
          <h2 className='font-header mb-2 font-semibold text-xl'>1: Describe your needs.</h2>
          <p className='text-lg'>Describe the kind of service you need and get linked with the best professional.</p>
        </div>

        <div className="md:pb-0 pb-10">
          <div className=' w-fit m-auto gradient px-6 md:px-8 md:py-6 py-5 rounded-tl-3xl mb-5 rounded-br-3xl text-white'>
            <Handshake size={50} weight="regular" />
          </div>
          <h2 className='font-header font-semibold mb-2 text-xl'>2: Get matched instantly.</h2>
          <p className='text-lg'>Get matched with the best Professionals around you with our sleek matching algorithm.</p>
        </div>

        <div className="">
          <div className=' w-fit m-auto bg-green px-6 md:px-8 md:py-6 py-5 rounded-tl-3xl mb-5 rounded-br-3xl text-white'>
            <Briefcase size={50} weight="regular" />
          </div>
          <h2 className='font-header mb-2 font-semibold text-xl'>3: Hire and complete your task.</h2>
          <p className='text-lg'>Get in contact with your Professional and schedule a time to get the task done.</p>
        </div>

      </div>
    </div>
  );
}

export default HowItWorks;
