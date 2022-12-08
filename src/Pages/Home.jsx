import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import NavBar from '../Components/NavBar'
import HimanshuContext from '../App'

const Home = (props) => {
    const dataH = useContext(HimanshuContext)

    if (props.token === null) {
        window.location = "/login"
    }


    return (
        <section className='bg-dark' style={{ height: "100vh", fontFamily: "Arial" }}>
            <NavBar />
            <br />
            <br />
            <br />
            <div className="container p-5">
                <h1 style={{ fontSize: "120px" }} className="text-center text-light p-5">Welcome to BlogIT</h1>
            </div>
        </section>
    )
}

export default Home