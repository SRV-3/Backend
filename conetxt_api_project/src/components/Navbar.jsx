import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="flex justify-center items-center gap-x-10 text-sm mb-10">
      <NavLink className={(e)=> e.isActive ? "text-red-300":""} to='/'>HOME</NavLink>
      <NavLink className={(e)=> e.isActive ? "text-red-300":""} to='/recipes'>RECIPES</NavLink>
      <NavLink className={(e)=> e.isActive ? "text-red-300":""} to='/about'>ABOUT</NavLink>
      <NavLink className={`px-4 py-2 bg-gray-900 rounded ${(e)=> e.isActive ? "text-red-300":""}`} to='/create'>CREATE RECIPES</NavLink>
    </div>
  )
}

export default Navbar
