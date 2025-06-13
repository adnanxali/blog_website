import { Link } from "react-router-dom"

interface BlogCardTypes {
    title:string,
    content:string,
    author:string,
    id:string
}

export const BlogCard=({title,content,author,id}:BlogCardTypes)=>{
    const turnicatedContent = content.length>200?content.slice(0,100) +"....":content
  return (
    <Link to={`/blog/${id}`}>
      <div className="bg-slate-50 rounded shadow-md px-7 py-5 mb-10 cursor-pointer">
          <p className="text-sm font-light"> {author}</p>
          <h1 className="font-bold text-3xl mb-5">{title}</h1>
          <p className="font-normal text-lg">{turnicatedContent}</p>
      </div>
    </Link>
  )
}