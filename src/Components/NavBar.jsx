import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';

const NavBar = (props) => {
    const [localToken, setLocalToken] = useState(localStorage.getItem("secret"))
    const [userData, setUserData] = useState({})


    const SignOut = () => {

        if (window.confirm("Do you want to log out")) {
            localStorage.removeItem("secret");
            window.location = "/login";
        }
    }

    useEffect(() => {
        const getData = () => {
            axios.post('http://localhost:5000/profileData', { id: localToken }).then((response) => {
                setUserData(response.data)
                console.log(response.data);

            }).catch((error) => {
                console.log(error);
            });
        }
        getData()
    }, [localToken])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light fixed-top">

                <div className="container">
                    <a className="navbar-brand" href="/">BlogIT</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {
                                (userData.userType === 'superAdmin') ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href='/profile'>Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/myBlogs">My Blogs</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/usersList">Users</a>
                                        </li>
                                    </>
                                ) : (userData.userType === 'blogger') ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href='/profile'>Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/myBlogs">My Blogs</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/createBlog">Create Blog</a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href='/profile'>Profile</a>
                                        </li>
                                    </>
                                )
                            }
                            {
                                (localToken === null) ? (<li className="nav-item">
                                    <a className="nav-link" href="/login" >Login</a>
                                </li>) : (<><li className="nav-item">
                                    <a className="nav-link" href=' ' onClick={SignOut}>Logout</a>
                                </li></>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar