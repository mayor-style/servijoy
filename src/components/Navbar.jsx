import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const links = [
    {name: 'About Us', path:"/about"},
    {name: 'How It Works', path:"/how-it-works"},
    {name: 'Services', path:"/services"},
    {name: 'FAQ', path:"/faq"},
  ]

  return (
    <nav className='fixed bg-soft-white right-0 left-0 top-0 py-4 px-8 shadow-xl items-center flex justify-between z-50 border-b border-b-gray-200'>

      {/* smaller screen size- mobile menu*/}
      <div className="lg:hidden">
      <label  className=" swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" />

      {/* hamburger icon */}
      <svg
        className="swap-off fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512">
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>

      {/* close icon */}
      <svg
        className="swap-on fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512">
        <polygon
          points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
    </label>

      </div>

      <Link to={'/'} className="">
      <h1 className='font-header text-gradient font-semibold max-xs:text-2xl text-3xl '>Servi<span>Joy</span></h1>
      </Link>

      <ul className="lg:flex hidden gap-8 text-lg items-center justify-center">
      
        {
          links.map((link, index)=> 
            <li key={index} className='hover:text-green transition'>
          <Link to={link.path}>{link.name}</Link>
        </li>
  
          )
        }

      </ul>

      <div className="lg:space-x-10 text-lg hidden md:flex items-center">
      <span className='text-black lg:block hidden hover:text-green transition'>
        <Link>Login / SignUp</Link>
      </span>

      <button className='btn font-subheading hover:gradient bg-green text-white'><Link to={'/become-a-vendor'}>Become a Vendor</Link></button>
      </div>
  
        <div className="flex md:hidden"></div>
    </nav>
  )
}

export default Navbar
