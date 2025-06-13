import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {decode, sign, verify} from 'hono/jwt'

const user = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET:string
      }
}>()

user.post('/signup',async (c)=>{
    const prisma =new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const newuser = await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.name
      }
      
    })
    const token = await sign({id:newuser.id},c.env.JWT_SECRET);
    c.header('Authorization',token);
    c.header('Access-Control-Expose-Headers', 'Authorization');
    c.status(200);
    return c.json({
      msg:"User creatred ",
      token:token
    });
  });
  user.get('/getalluser',async(c)=>{
    const prisma =new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const users= await prisma.user.findMany();
    return c.text(JSON.stringify(users));
  })
  
  
  user.delete('/deleteAll',async (c)=>{
    const prisma =new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    await prisma.user.deleteMany();
    return c.text("Delete all users in database");
  })
  
  
  user.post('/signin',async (c)=>{
    const prima = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body = await c.req.json()
    const user = await prima.user.findUnique({
      where:{
        email:body.email,
      }
    })
    console.log(user)
    if(!user){
      c.status(404);
      return c.json({
        error:"User Not found !"
      })
    }
    const jwt = await sign({id:user.id},c.env.JWT_SECRET);
    c.header('Authorization',jwt);
    c.header('Access-Control-Expose-Headers', 'Authorization');
    c.status(200);
    return c.json({
      jwt:jwt
    })
  });

  export default user;