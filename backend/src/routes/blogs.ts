import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {decode, sign, verify} from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types';

const blogs = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET:string
      },
    Variables:{
        userId:string;
    }
}>()

blogs.use("/*", async(c,next)=>{
    const headerToken= c.req.header("Authorization")||"";
    const token = headerToken.split(" ")[1];
    const decode =await  verify(token,c.env.JWT_SECRET);
    if(decode){
        //@ts-ignore
      c.set("userId",decode.id);
      console.log("user id:",decode.id)
      await next();
    }else{
      c.status(403)
      return c.json({
        error:"User not verified forbidden"
      })
    }
  })
blogs.post('/',async (c)=>{
    const prisma =new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const userId = c.get("userId")
    const newPost = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })
    return c.json({
        postId:newPost.id
    })
  });
blogs.put('/',async (c)=>{
    const prisma =new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body =await c.req.json();
    const updatedPost = await  prisma.post.update({
        where:{
            id : body.id
        },
        data:{
            title:body.title,
            content:body.content
        }

    })
    return c.json({
        updatedPost
    })

  });
blogs.get('/bulk',async (c)=>{
    const prisma =new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json({
        blogs,
    })
})
blogs.get('/:id',async (c)=>{
    const prisma =new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = await c.req.param("id");
    const blog = await prisma.post.findFirst({
        where:{
            id
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    if(!blog){
        return c.json({
            message:"Blog not found"
        })
    }
    return c.json({
        blog
    })
  });



export default blogs;
  