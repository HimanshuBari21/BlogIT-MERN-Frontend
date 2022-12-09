import React, { useEffect, useState } from 'react'
// import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
import { Table, TableRow, TableCell, TableBody, Button } from '@mui/material'
import NavBar from '../Components/NavBar'
import ProfilePic from '../Images/profile.png'

import { Helmet } from 'react-helmet'

import axios from 'axios'

const Profile = (props) => {

    const [userData, setUserData] = useState({})
    const [fileData, setFileData] = useState([])


    if (props.token == null) {
        window.location = "/login"
    }
    const SignOut = () => {

        if (window.confirm("Do you want to log out")) {
            localStorage.removeItem("secret");
            window.location = "/";
        }
    }

    useEffect(() => {
        const getData = () => {
            axios.post('http://localhost:5000/profileData', { id: props.token }).then((response) => {

                setUserData(response.data)
                console.log(response.data);

            }).catch((error) => {
                console.log(error);
            });
        }
        getData()
    }, [props.token])

    const handlePhoto = (e) => {
        setFileData({ ...fileData, [e.target.name]: e.target.files[0] })
        console.log(fileData.profile);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData()

        formData.append('profile', fileData.profile)
        formData.append('id', userData._id)

        axios.post('http://localhost:5000/imgUpload', formData).then((res) => {
            console.log(res);
            setTimeout(() => {
                window.location = "/profile"
            }, 2000);
        }).catch((err) => {
            console.log(err);
        })



    }

    return (
        <>
            <Helmet>
                <title>{"BlogIT - " + userData?.userType}</title>
            </Helmet>
            <NavBar />
            <br />
            <br />
            <br />
            <center>
                <img className="img-fluid" alt='profile' src={'http://localhost:5000/images/' + userData?.profilePicCode} style={{ borderRadius: "4.5%", height: "clamp(200px, 260px, 400px)", width: "clamp(200px, 260px, 400px)", objectFit: 'cover' }} />
                <form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <input type="file" name="profile" accept='image/*' onChange={handlePhoto} className="form-control w-25 m-2" />

                    <input type="submit" value="Update" className='form-control w-25 m-2 bg-primary text-light' />
                </form>
            </center>
            <div className="container">

                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">{userData._id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell align="right">{userData.username}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>User Type</TableCell>
                            <TableCell align="right">{userData.userType}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">{userData.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone</TableCell>
                            <TableCell align="right">{userData.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Password</TableCell>
                            <TableCell align="right">{userData.password}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <br />
            <br />
            <br />
            <br />


        </>
    )
}

export default Profile