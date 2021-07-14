import React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/ducks/Auth'
import { Nav } from './styles'
const NavBar: React.FC = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Nav>
      <div className='logoContainer'>
        <h1>TLG</h1>
        <NavLink activeClassName='disable' className='home' to='/recent-games'>
          Home
        </NavLink>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName='disable' to='/account'>
              Account
            </NavLink>
          </li>
          <li>
            <button onClick={logoutHandler}>
              Log out <HiOutlineArrowRight />
            </button>
          </li>
        </ul>
      </nav>
    </Nav>
  )
}

export default NavBar
