import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import {Blogs} from './pages/Blogs'
import {Publish} from './pages/Publish'
import Header from './components/Header'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/publish' element={<Publish/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
