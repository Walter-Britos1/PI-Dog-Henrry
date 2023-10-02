import { Route, Routes, useLocation } from 'react-router-dom';
import { Landing , Home, Detail, Form } from './views/index'
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation();
  return (
    <div>
      {
        location.pathname !== '/' && <NavBar />
      }

      <Routes>
        <Route exact={true} path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/:idRaza' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes> 
    </div>
  );
}

export default App;

