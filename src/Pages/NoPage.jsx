import React from 'react'
import NavBar from '../Components/NavBar'

const NoPage = (props) => {

    return (
        <>
            <NavBar />
            <br />
            <br />
            <br />
            <br />
            <div className="container">
                <div>You are Missing</div>
                <p>Requested page doesnot exit</p>
            </div>

        </>
    )
}

export default NoPage