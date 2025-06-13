import { useBlog } from "../../hooks"
import { useParams } from "react-router-dom";
export const Blog= ()=>{
    const { id }= useParams();
    const {loading,blog} = useBlog({
        id:id||""

    });
    if(loading){
        <div>
            loading....
        </div>  
    }
    return (
        <div className="flex justify-center px-40 h-screen">
            <div id="main-blog" className="text-left w-2/3 mt-20 px-10 py-20">
                <h1 className="font-bold text-4xl">{blog?.title}</h1>
                <p className="mt-10 text-sm text-slate-600 px-2">{blog?.content}</p>
            </div>
            <div className="mt-60 w-1/3">
                <p className="text-slate-400 ">Author</p>
                <p className="ml-5 mt-2 text-lg font-bold">{blog?.author.name||"Anonomys"}</p>
                <p className="ml-5 text-slate-600 text-sm">This is a great author</p>
            </div>
        </div>
    )
}