import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { SignupPage } from './pages/SignupPage';
import { SigninPage } from './pages/SigninPage';
import { HomePage } from './pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <div className="App"> 
    <Header/>
    <Routes>
      <Route index element={ <HomePage/> }/>
      <Route path='/signin' element={ <SigninPage/> }/>
      <Route path='/signup' element={ <SignupPage/> }/>
    </Routes>
    </div>
  ); //test comment
}

export default App;
