import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import logo from "../assets/images/logo.png"

const Navbar = () => {

      const [open, setOpen] = useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 mb-4'>
           <div className='md:flex items-center justify-between bg-white  md:px-10 px-7'>
            {/* logo section */}
            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                <img src={logo} style = {{height:72}} className='h-10'/>
            </div>
            {/* Menu icon */}
            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon/> : <Bars3Icon />
                }
            </div>
            {/* linke items */}
            <ul className={`cursor-pointer md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>

                    <li className='text-gray-800 hover:text-blue-400 duration-2000 md:ml-8 md:my-0 my-7 font-semibold'>
                        HOME
                    </li>
                    <li className='text-gray-800 hover:text-blue-400 duration-2000 md:ml-8 md:my-0 my-7 font-semibold'>
                        PROFILE
                    </li>
                <button className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>hardcorekid03</button>
            </ul>
            {/* button */}
           </div>
        </div>
    );
};

export default Navbar;