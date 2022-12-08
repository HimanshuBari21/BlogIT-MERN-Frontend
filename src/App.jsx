import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Pages/Home.jsx';
import Registration from './Pages/Registration.jsx';
import NoPage from './Pages/NoPage.jsx';
import Login from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx';
import CreateBlog from './Pages/CreateBlog.jsx';
import Blog from './Pages/Blog.jsx';
import MyBlogs from './Pages/MyBlogs.jsx';
import Test from './Pages/Test.jsx';
// import NavBar from './Components/NavBar.jsx';
import UsersList from './Pages/OnlyForAdmin/UsersList.jsx';

import axios from 'axios';

// const HimanshuContext = createContext()

const App = () => {

    const [localToken, setLocalToken] = useState(localStorage.getItem("secret"))
    // const [userData, setUserData] = useState({})
    // const [himanshu, setHimanshu] = useState("Himanshu Bari")

    // useEffect(() => {
    //     const getData = () => {
    //         axios.post('http://localhost:5000/profileData', { id: localToken }).then((response) => {

    //             setUserData(response.data)
    //             console.log(response.data);

    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //     }
    //     getData()
    // }, [localToken])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route index element={<Home />} />
                        <Route path='/test' element={<Test token={localToken} />} />
                        <Route path='/login' element={<Login token={localToken} />} />
                        <Route path='/myBlogs' element={<MyBlogs token={localToken} />} />
                        <Route path='/profile' element={<Profile token={localToken} />} />
                        <Route path='/register' element={<Registration token={localToken} />} />
                        <Route path='/usersList' element={<UsersList token={localToken} />} />
                        <Route path='/createBlog' element={<CreateBlog token={localToken} />} />
                        <Route path='/myBlogs/blog/:blogId' element={<Blog token={localToken} />} />
                        <Route path='/*' element={<NoPage token={localToken} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App