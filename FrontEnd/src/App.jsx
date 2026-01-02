import './App.css'
import "../src/styles/public.css"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/contact-us' element={<ContactUs/>}></Route>
      </Routes>
    </>
  )
}

export default App
