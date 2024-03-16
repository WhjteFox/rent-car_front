import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="App"> 
        <Header></Header>
        <Routes>
          <Route path='/' element = {<HomePage/>}></Route>
          <Route path='/login' element = {<LoginPage/>}></Route>
          <Route path='/signup' element = {<SignupPage/>}></Route>
        </Routes>
    </div>
  ); //test comment
}

export default App;
