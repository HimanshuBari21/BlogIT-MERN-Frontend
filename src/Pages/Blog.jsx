import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../Components/NavBar';

const Blog = (props) => {

    const [blogData, setBlogData] = useState({});
    const { blogId } = useParams()


    useEffect(() => {
        const getBlogData = async () => {
            await axios.post("http://localhost:5000/getBlogData", { blogId }).then((response) => {
                console.log(response.data);
                setBlogData(response.data)
            }).catch((err) => {
                console.log(err);
            })
        }
        getBlogData()
    }, [blogId])



    var DateOfBlog = new Date(blogData.dateOfPublish)


    return (

        <>
            {
                (blogData.title) ? (<><NavBar />
                    <br />
                    <br />
                    <br />
                    <div className="container" style={{ fontFamily: "Arial" }}>
                        <h1>{blogData?.title}</h1>
                        <p className='text-secondary'>{blogData?.subtitle}</p>
                        <p>Date: {Date(DateOfBlog.getTime()).substring(4, 15)}</p>
                        <p style={{ textAlign: "justify", fontSize: "18px" }}>{blogData?.content}</p>
                        <p className='bold'>{blogData?.writer}</p>
                    </div></>) : (<>
                        <h1 className='text-center mt-5'>Loading...</h1>

                    </>)
            }
        </>

    )
}

export default Blog 