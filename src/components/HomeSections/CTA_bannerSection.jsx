import React from 'react'

const CTA_bannerSection = () => {
  return (
    <section className='py-16 px-4 sm:px-6 h-full w-full'>
      <div className="py-[60px] m-auto gap-6 max-w-6xl flex flex-col justify-center px-4 lg:px-6 w-full shadow-lg rounded-2xl gradient">
        <h1 className='font-header font-semibold text-black leading-normal md:text-4xl text-3xl text-center'>Ready to Book a Professional?</h1>
        <h2 className='text-center font-semibold font-subheading subheader'>Join thousands of satisfied clients and start your journey today.</h2>

        <button className='btn shadow-xl bg-white text-black w-fit max-xs:text-xs m-auto'>Get Started Now</button>
      </div>
    </section>
  )
}

export default CTA_bannerSection
