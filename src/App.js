import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { LikesPage } from './pages/LikesPage/LikesPage';
import { BookingsPage } from './pages/BookingsPage/BookingsPage';
import { EditProfilePage } from './pages/EditProfilePage/EditProfilePage';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        fetch("http://localhost:8001/bookings/")
            .then(res => res.json())
            .then(bookings => {
                for (let booking of bookings) {
                    let dateNow = new Date();
                    let dateReturn = new Date(Date.parse(booking.returnDate));
                    if (dateNow.getTime() > dateReturn.getTime() || booking.valid === false) {
                        fetch("http://localhost:8001/cars/" + booking.car)
                            .then((res) => res.json())
                            .then(cardata => {
                                console.log(cardata);
                                cardata.available = true;
                                fetch("http://localhost:8001/cars/" + booking.car, {
                                    method: "PUT",
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify(cardata)
                                });
                            });
                        fetch("http://localhost:8001/bookings/" + booking.id, {
                            method: "DELETE"
                        }).then(() => {
                            console.log("1 expired or invalid booking removed");
                        })
                    }
                }
            });
    }, []);

    return (
        <div className="App">
            <img className='backdrop' src={require(".//components/image/background.png")} alt='background'></img>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/signup' element={<SignupPage />}></Route>
                <Route path='/likes' element={<LikesPage />}></Route>
                <Route path='/bookings' element={<BookingsPage />}></Route>
                <Route path='/profile' element={<ProfilePage />}></Route>
                <Route path='/editprofile' element={<EditProfilePage />}></Route>
            </Routes>
        </div>
    ); //test comment
}

export default App;

