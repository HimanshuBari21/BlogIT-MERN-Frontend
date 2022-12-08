import { TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import NavBar from '../Components/NavBar'
// import Button from '@mui/material/Button'

const Register = () => {
    const [formData, setFormData] = useState({
        userType: "",
        username: "",
        email: "",
        phone: "",
        password: ""
    })
    const [registered, setRegistered] = useState([false, ""])
    const [submitValue, setSubmitValue] = useState(false)

    const handleChange = (fieldName) => (event) => {
        setFormData({ ...formData, [fieldName]: event.target.value })
    }

    const logData = async (e) => {
        e.preventDefault();
        setSubmitValue(true)
        await axios.post('http://localhost:5000/create', formData).then((response) => {
            console.log(response.data);
            if (response.data.existErr) {
                setRegistered([true, response.data.existErr])
            }
            else {
                setRegistered([true, response.data.message]);
                setTimeout(() => {
                    setSubmitValue(false);
                    window.location = "/";
                }, 1500)
            }
        })
    }

    return (
        <>

            <div className="container py-5 col-md-4 col-12">

                <form className='' method='post' onSubmit={logData} >
                    {registered[0] ? (<>{registered[1]}</>) : (<></>)}
                    <h1>Registration</h1>
                    <br />

                    <label htmlFor="userType">Select User Type</label>
                    <select className='form-control' name="userType" onChange={handleChange('userType')} value={formData.userType} required>
                        <option value="" >Select</option>
                        <option value="superAdmin">Admin</option>
                        <option value="blogger">Blogger</option>
                        <option value="reader">Reader</option>
                    </select>
                    <br />

                    <TextField variant='outlined' type="text" name="username" id="username outlined-basic" placeholder="Username" onChange={handleChange('username')} value={formData.username} required className="form-control" /> <br />
                    <br />

                    <TextField variant='outlined' type="email" name="email" id="email outlined-basic" placeholder="Email" onChange={handleChange('email')} value={formData.email} className="form-control" /> <br />
                    <br />

                    <TextField variant='outlined' type="tel" name="phone" id="phone outlined-basic" placeholder="Phone" onChange={handleChange('phone')} value={formData.phone} required className="form-control" /> <br />
                    <br />
                    <TextField variant='outlined' type="password" name="password" id="password outlined-basic" placeholder="Password" onChange={handleChange('password')} value={formData.password} required className="form-control" /> <br />

                    {submitValue ? (<button className='btn btn-primary'>Registering...</button>) : (<button className="btn btn-primary mx-2" type='submit'>Register</button>)}


                </form>
            </div>

        </>)
}

export default Register