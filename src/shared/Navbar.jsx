import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
      <div className="bg-white rounded-full shadow p-2 flex justify-around">
        <NavLink to="/home" className={({isActive})=>isActive? 'text-nokia font-semibold' : 'text-gray-500'}>Home</NavLink>
        <NavLink to="/devices" className={({isActive})=>isActive? 'text-nokia font-semibold' : 'text-gray-500'}>Devices</NavLink>
        <NavLink to="/speed" className={({isActive})=>isActive? 'text-nokia font-semibold' : 'text-gray-500'}>Speed</NavLink>
        <NavLink to="/settings" className={({isActive})=>isActive? 'text-nokia font-semibold' : 'text-gray-500'}>Settings</NavLink>
      </div>
    </nav>
  )
}
