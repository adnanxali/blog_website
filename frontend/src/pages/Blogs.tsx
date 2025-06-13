import { BlogCard } from "../components/BlogCard"
import {useBlogs} from '../../hooks/index'
export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();
    if(loading){
        return (
            <div className="animate-pulse">Loading ....</div>
        )
    }
    
    return (
        <div className="mx-40 my-20">
            {blogs.map((blog) => (
    <BlogCard 
        id={blog.id}
        author={blog.author.name ||"Anonymous"} 
        content={blog.content} 
        title={blog.title} 
    />
))}
            
        </div>
    )
}