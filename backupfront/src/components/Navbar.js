import './Navbar.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/localstorage'
import { setInitialState } from '../redux/actions/userAction'
import { setUserDeatils } from '../redux/actions/userAction'

const Navbar = ({ click }) => {
  const cart = useSelector(state => state.cart)
  const history = useHistory()
  const user = useSelector(state => state.user)
  console.log(user.userInfo);
  const dispatch = useDispatch()

  const { cartItems } = cart

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }
  const isPlayer = user.userInfo.playerDetails
  if(isPlayer){
    console.log(isPlayer);
  }
  else{
    console.log("not Player");
  }
  const _handleLogout = () => {
    dispatch(setInitialState())
    logout()
    history.push('/signin')
  }
  return (
    <div>
        <nav className="navbar">
          <div className="navbar__logo">
            <h2>Sports Shop</h2>
          </div>

          <ul className="navbar__links">
            <li>
              <Link to="/cart" className="cart__link">
                <i className="fas fa-shopping-cart"></i>
                <span>
                  Cart <span className="cartlogo__badge">{getCartCount()}</span>
                </span>
              </Link>
            </li>
            {isPlayer ? (
            <li>
              <Link to="/offers">Offers</Link>
            </li>
            ):(
              <li>
              <Link to="/players">Players</Link>
            </li>
            )}
            
            <li>
              <Link to="/">Shop</Link>
            </li>

            {!user.userInfo.isLogin ? (
              <li>
                <Link to="/signin">Login</Link>
              </li>
            ) : (
              <li>
                <p onClick={_handleLogout}>Logout</p>
              </li>
            )}
          </ul>

          <div className="hamburger__menu" onClick={click}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
    </div>
  )
}

export default Navbar

