import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="App">
        <img className='backdrop' src={require(".//components/image/background.png")} alt='background'></img>
        <Routes>
          <Route path='/' element = {<HomePage/>}></Route>
          <Route path='/login' element = {<LoginPage/>}></Route>
          <Route path='/signup' element = {<SignupPage/>}></Route>
        </Routes>
    </div>
  ); //test comment
}

export default App;
