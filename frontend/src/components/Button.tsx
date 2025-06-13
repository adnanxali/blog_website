import {MouseEvent } from "react"
interface SubmitButtonInput {
    onClick:(e: MouseEvent<HTMLButtonElement>)=>void
}
export const SubmitButton=({onClick}:SubmitButtonInput)=>{
    return(
            <button onClick={onClick} className="bg-black text-white text-center rounded py-1 px-20" type="submit">Submit</button>

    )
}