import {z} from 'zod'

export const signupInputs = z.object({
    email:z.string().email(),
    name:z.string().optional(),
    password:z.string().min(6)
})

export const signinInputs = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const createBlogInputs = z.object({
    title:z.string(),
    content:z.string().min(1)
})

export const updateBlogInputs = z.object({
    title:z.string(),
    content:z.string().min(1),
    id:z.string()
})

export type SignupInputs = z.infer<typeof signupInputs>
export type SigninInputs = z.infer<typeof signinInputs>
export type CreateBlogInputs = z.infer<typeof createBlogInputs>
export type UpdateBlogInput = z.infer<typeof updateBlogInputs>