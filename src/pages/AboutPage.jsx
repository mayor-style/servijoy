import React from 'react'

const AboutPage = () => {
  return (
    <div className='py-80 bg-yellow-300'>
    <label htmlFor="my-drawer" className="btn ml-[400px] btn-primary drawer-butto">Open drawer</label>
      <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
 
  <div className="drawer-side ">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-black min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li className='text-5xl text-black'><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li className='text-5xl text-black'><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      <li className='text-5xl text-black'><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default AboutPage
