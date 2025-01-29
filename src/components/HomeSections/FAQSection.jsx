import React from 'react'

const FAQSection = () => {
  return (
    <div className='py-[100px] text-center px-6 md:px-20 h-full w-full bg-gray-100 '>
      <h1 className='header pb-20'>Frequently asked questions</h1>

      <div className="collapse border mb-6 bg-green collapse-plus text-white">
  <input type="radio" defaultChecked name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium font-header">Click to open this one and close others</div>
  <div className="collapse-content">
    <p className='font-subheading font-medium'>hello</p>
  </div>
    </div>
    <div className="collapse border mb-6 bg-green collapse-plus text-white">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
    <div className="collapse border bg-green collapse-plus text-white">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
    </div>
  )
}

export default FAQSection
