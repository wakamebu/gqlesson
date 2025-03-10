import './App.css'
import { GuestRoute, PrivatRoute } from './AuthRoute'
import Main from './components/Main'
import NotFound from './components/NotFound'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={ <GuestRoute children= { <SignIn />} />} />
        <Route path='/signup' element={ <GuestRoute children= { <SignUp />} />} />
        <Route path='/' element={ <PrivatRoute children={<Main />} />} />
        <Route path='*' element={ <NotFound /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
