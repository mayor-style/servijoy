import React from 'react'
import { Link } from 'react-router-dom'
import cleaner from '../../assets/imgs/home_repair.jpg'
import Plumbing from '../../assets/imgs/plumbing.jpg'
import Painting from '../../assets/imgs/painting.jpg'
import Capentry from '../../assets/imgs/carpentry.jpg'
import home_repair from '../../assets/imgs/electrical.jpg'
import Flooring from '../../assets/imgs/flooring.jpg'

const FeaturedServices = () => {

    const featuredService = [
        {title:'Cleaning', img: cleaner },
        {title:'Plumbing', img: Plumbing },
        {title:'Painting', img: Painting },
        {title:'Capentry', img: Capentry },
        {title:'Home Repair', img: home_repair },
        {title:'Flooring', img: Flooring },
    ]

  return (
    <section className="py-16 bg-gray-100">
       <div className="max-w-7xl mx-auto px-5">
        {/* Section Title */}
        <div className="mb-12">
        <h2 className='header'>
        Popular Services
        </h2>
        <p className="md:text-lg max-xs:text-sm text-gray-600 mt-3">
            Discover the wide range of services we offer, tailored to meet your needs.
          </p>
        </div>
      
      {/* Service Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 sm:gap-y-20 gap-x-6 ">

       {

        featuredService.map((service, index)=>
         

            <div key={index} className={`relative flex h-36 items-center sm:gap-4 cursor-pointer transition-all ease-in-out shadow-lg hover:shadow-2xl hover:scale-105 duration-300 
            sm:h-[300px] rounded-2xl bg-green sm:w-72   ${index===1 || index===3 || index===5? "gradient":"" }  ${index > 3 ? "sm:flex hidden": ""} `}>
                <div className="p-2 sm:w-full w-[50%] h-full sm:absolute inset-0 ">
                    <img loading='lazy' className='sm:h-[67%]  h-full w-full rounded-2xl object-cover' src={service.img} alt="" />
                </div>
                <div className="px-3 w-full text-gray-200 sm:absolute bottom-3">
                <h2 className='text-white font-header font-semibold text-lg sm:text-xl'>{service.title}</h2>
                <p className='font-semibold max-xs:text-sm'>{`Experience the best ${service.title} service on ServiJoy!`}</p>
                </div>
            </div>
        )

            }
         <Link className='sm:hidden hover:underline font-subheading text-green font-semibold text-center text-lg cursor-pointer'>View all services</Link>   

      </div>
    </div>
    </section>
  )
}

export default FeaturedServices
