import React from 'react'

import { useEffect, useState } from 'react'
import axios from 'axios'
// import TextField from '@mui/material/TextField'
import { TextareaAutosize, Button, TextField } from '@mui/material'

import NavBar from '../Components/NavBar'

const CreateBlog = (props) => {

    const [userData, setUserData] = useState({});
    const [blogtitle, setBlogTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [theBlog, setTheBlog] = useState("");
    const [blogStatus, setBlogStatus] = useState([false, ""])
    const [isLogged, setIsLogged] = useState(false)


    if (props.token === null) {
        window.location = "/login"
    }


    const publishForm = () => {
        axios.post('http://localhost:5000/createBlog', {
            blogtitle,
            subTitle,
            dateOfPublish: Date.now(),
            theBlog,
            writer: userData._id
        }).then((response) => {
            console.log(response);
            if (response.data.errMessage) {
                setBlogStatus([true, response.data.errMessage])

            }
            else {
                setBlogStatus([true, "Published"])
                setTimeout(() => {
                    window.location = "/myBlogs";
                }, 2000);
            }
        })
    }

    useEffect(() => {
        const getData = () => {
            axios.post('http://localhost:5000/profileData', { id: props.token }).then((response) => {
                setUserData(response.data)
                console.log(response.data);
                setIsLogged(true)

            }).catch((error) => {
                console.log(error);
                setIsLogged(false)
            });
        }
        getData()
    }, [props.token])

    return (
        <>
            {
                isLogged ? (<><div className="container py-5">
                    <NavBar />
                    <br />
                    <br />


                    <TextField
                        id=""
                        label="Title of Blog"
                        value={blogtitle}
                        onChange={e => setBlogTitle(e.target.value)}
                        required
                        fullWidth
                    />
                    <br />
                    <br />
                    <TextField
                        id=""
                        label="Subtitle"
                        onChange={e => setSubTitle(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <br />
                    <TextareaAutosize
                        id=""
                        label="The Blog starts here"
                        value={theBlog}
                        onChange={e => setTheBlog(e.target.value)}
                        placeholder="The Blog starts here"
                        style={{ width: "100%", height: "42vh", border: "1.4px solid lightgrey", borderRadius: "4px", overflowY: "scroll" }}
                        className="p-3"
                        required

                    />
                    {
                        blogStatus[0] ? (<Button variant="contained" >{blogStatus[1]}</Button>) : (<Button variant="contained" onClick={publishForm}>
                            Publish
                        </Button>)
                    }


                </div>
                </>) : (
                    <>
                        <h1 className='text-center mt-5'>Loading...</h1>
                    </>
                )
            }

        </>
    )
}

export default CreateBlog;