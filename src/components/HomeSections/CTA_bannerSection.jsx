import React from 'react'

const CTA_bannerSection = () => {
  return (
    <section className='py-16 px-6 h-full w-full'>
      <div className="py-[60px] m-auto gap-5 max-w-6xl flex flex-col justify-center px-4 lg:px-6 w-full shadow-lg rounded-2xl gradient">
        <h1 className='header text-center'>Ready to Book a Professional?</h1>
        <h2 className='text-center font-semibold font-subheading subheader'>Join thousands of satisfied clients and start your journey today.</h2>

        <button className='btn shadow-xl bg-white text-black w-fit m-auto'>Get Started Now</button>
      </div>
    </section>
  )
}

export default CTA_bannerSection
