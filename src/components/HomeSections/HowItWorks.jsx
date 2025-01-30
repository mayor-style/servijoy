import React from 'react'
import { CalendarCheck, Briefcase, Handshake } from "phosphor-react";
import { FaCalendarAlt, FaSmileBeam, FaHandsHelping } from "react-icons/fa";

const HowItWorks = () => {
  const howItWorkData = [
    {index:1, title:'Describe your needs.', desc:'Describe the kind of service you need and get linked with the best professional.', icon: <FaCalendarAlt className='text-3xl'/>},

    {index:2, title:'Get matched instantly.', desc:'Get matched with the best Professionals around you with our sleek matching algorithm.', icon: <FaHandsHelping className='text-3xl'/>},

    {index:3, title:' Hire and complete your task.', desc:'Get in contact with your Professional and schedule a time to get the task done.', icon: <FaSmileBeam className='text-3xl' />},
  ]
  return (
    <section className="py-16 bg-gray-50">
    <div className='max-w-7xl mx-auto px-6 text-center'>
       {/* Section Heading */}
      <h2 className='header text-black mb-4'>How ServiJoy Works</h2>
      <p className="subheader text-gray-600 mb-10">
          Three Simple steps to book a service.
        </p>

       {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         {/* Steps */}
        {
          howItWorkData.map((data)=>
            <div key={data.index} className={`flex flex-col items-center text-center`}>
          <div className={` px-8 py-6 flex justify-center items-center ${data.index ===2 ? "gradient": "bg-green"} mb-4 rounded-tl-3xl rounded-br-3xl text-white`}>
           {data.icon}
          </div>
          <h3 className='font-header mb-2 font-semibold xs:text-xl text-lg'>{data.title}</h3>
          <p className=''>{data.desc}</p>
        </div>
          )
        }

      </div>
    </div>
    </section>
  );
}

export default HowItWorks;
