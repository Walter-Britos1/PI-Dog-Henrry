import {  Route, Routes, useLocation } from 'react-router-dom';
import { Landing, Home } from './views/index';
import NavBar from './components/NavBar/NavBar';

function App() {
  const { pathname } = useLocation()

  return (
    <>
      {
        pathname !== '/' && <NavBar />
      }
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
