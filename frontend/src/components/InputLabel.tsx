import { ChangeEvent } from "react"

interface InputLabelType {
    label:string,
    placeholder:string,
    type:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
export const InputLabel =({label,placeholder,type,onChange}:InputLabelType)=>{
    return(
        <div className="mb-10">
            <label className="block font-medium mb-2">{label}</label>
            <input onChange={onChange} className="text-base px-2 py-1 w-full rounded border-slate-500" type={type} placeholder={placeholder} />
        </div>
    )
}