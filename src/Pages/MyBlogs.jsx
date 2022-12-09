import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button'
import { BsFillEyeFill, BsFileBinary } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import NavBar from '../Components/NavBar';



const MyBlogs = (props) => {

    const [myBlogs, setMyBlogs] = useState([])

    if (props.token === null) {

        window.location = "/login"
    }
    useEffect(() => {
        const getMyBlogs = () => {
            axios.post("http://localhost:5000/myBlogs", { _id: props.token }).then((response) => {
                setMyBlogs(response.data)

            })
        }
        getMyBlogs()
    }, [props.token])

    const DeleteBlog = (id) => {
        if (window.confirm("Are you sure to delete this Blog")) {
            axios.post("http://localhost:5000/deleteBlog", { id }).then((res) => {
                console.log(res);
                window.alert(res.data.msg)
                setTimeout(() => {
                    window.location = "/myBlogs"
                }, 2000);
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    var DateOfBlog = new Date(myBlogs.dateOfPublish)

    return (
        <>
            <div className="container py-5">
                <br />
                <NavBar />
                <h1 className="text-center">My Blogs</h1>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontSize: "1em" }}>Title</TableCell>
                                <TableCell style={{ fontSize: "1em" }}>Date - Time of Publish</TableCell>
                                <TableCell style={{ fontSize: "1em" }}></TableCell>
                            </TableRow>
                        </TableHead>

                        {
                            (myBlogs.length === 0) ? (<>

                                <TableBody className='text-center'>
                                    You havn't created any blog yet, <Button className='m-5' variant="contained" onClick={() => { window.location = "/createBlog" }}>
                                        Create Now
                                    </Button>
                                </TableBody>

                            </>) : (<TableBody>
                                {
                                    myBlogs?.map((blog) => {
                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell title={blog.content}>
                                                        {blog.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        Date: {Date(DateOfBlog.getTime()).substring(4, 25)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link title='View' to={`blog/${blog._id}`}>
                                                            <Button variant="contained">
                                                                <BsFillEyeFill color='white' />
                                                            </Button>
                                                        </Link >

                                                        <Button variant="contained" color="error" title={"Delete"} className='mx-2' name={blog._id} onClick={() => DeleteBlog(blog._id)}>
                                                            <MdDelete color='white' />
                                                        </Button>



                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })
                                }

                            </TableBody>)
                        }


                    </Table>
                </TableContainer>
            </div>

        </>
    )
}

export default MyBlogs