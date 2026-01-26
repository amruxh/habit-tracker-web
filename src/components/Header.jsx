import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='w-full bg-white h-17.5 flex items-center px-8 border-b'>
      <Link to={"/"} className="text-2xl font-bold">Habit Tracker</Link>
    </div>
  )
}

export default Header
