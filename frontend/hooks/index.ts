import {useState,useEffect} from 'react'
import axios from 'axios'
import {BACKEND_URL_LOCAL} from '../config'

interface BlogsType {
    id:string,
    content:string,
    title:string,
    author:{
        name:string
    }
}

export const useBlogs= ()=>{
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<BlogsType[]>([]);

    const token = localStorage.getItem('token');
    useEffect(()=>{
        axios.get(`${BACKEND_URL_LOCAL}/blogs/bulk`,{
            headers:{
                Authorization:"Bearer "+token
            }
        }).then((response)=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])
    return {
        loading,
        blogs
    }

}

export const useBlog= ({id}:{id:string})=>{
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState<BlogsType>();

    const token = localStorage.getItem('token');
    useEffect(()=>{
        axios.get(`${BACKEND_URL_LOCAL}/blogs/${id}`,{
            headers:{
                Authorization:"Bearer "+token
            }
        }).then((response)=>{
            setBlog(response.data.blog);
            setLoading(false);
        })
    },[])
    return {
        loading,
        blog
    }

}