import { Link, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import logo from '../assets/logo.svg'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Raise" className="h-10" />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <NavLink to="/campaigns" className={({ isActive }) => isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}>Explore</NavLink>
          {user && (
            <>
              <NavLink to="/create" className={({ isActive }) => isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}>Create</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'}>Dashboard</NavLink>
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
              <button onClick={logout} className="px-3 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-teal-600">Login</Link>
              <Link to="/signup" className="px-3 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
