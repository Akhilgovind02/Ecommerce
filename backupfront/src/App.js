import './App.css'
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route,useLocation} from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'

// Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SignUp from './screens/SignUp'
import Player from './screens/Player'
import SignIn from './screens/SignIn'
import {useDispatch} from 'react-redux'
import {fetchCart} from './redux/actions/cartActions'
import {setUserDeatils} from './redux/actions/userAction'
import PlayerScreen from './screens/PlayerScreen'
import AdminSignup from './screens/SignUp/AdminSignup'
import AdminSignIn from './screens/SignIn/AdminSignIn'
import AdminDashboard from './components/AdminDashboard'
import ViewPlayer from './screens/ViewPlayer'
import OfferScreen from './screens/OfferScreen'
function App() {
  const [sideToggle, setSideToggle] = useState(false)
  // fetchCart
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCart())
    dispatch(setUserDeatils())
  }, [dispatch])

  // const isDashboardRoute = window.URL. === '/dashboard'
  const isDashboardRoute = window.location.pathname === '/dasboard';

  return (
    <Router>
      {isDashboardRoute ?null :(
        <>
        <Navbar click={() => setSideToggle(true)} />
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
        </>
         )}
        
      <main className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path = "/signup/player" component={Player}></Route>
          <Route exact path="/signin" component={SignIn} />
          <Route excat path = "/players" component = {PlayerScreen} />
          <Route excat path = "/player/:id" component = {ViewPlayer}></Route>
          <Route excat path = "/offers" component = {OfferScreen}></Route>  
          <Route excat path = "/admin/signup" component = {AdminSignup}></Route>
          <Route excat path = "/admin/signin" component = {AdminSignIn}></Route>
          <Route exact path="/dasboard" component={AdminDashboard} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
