// import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ID } from 'appwrite'
import Logout from './Logout'

function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  console.log(authStatus)

  const navItems =[
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/Signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/All-posts",
      active: authStatus,
  },
  {
      name: "postForm",
      slug: "/postForm",
      active: authStatus,
  },
  ]
  return (
    <header className='py-3 shadow bg-gray-500  '>
        <nav className='flex'>
          <div className='mr-4 '>
            <Link to='/'>
            <h1>E-cart</h1>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => item.active ? (
              <li key={ID.unique()}>
                <button type="button" 
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'
                onClick={() => navigate(item.slug)}
                >{item.name}</button>
              </li>
            ) : null)}

            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Header
