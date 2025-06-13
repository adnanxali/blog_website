import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {decode, sign, verify} from 'hono/jwt'
import user from './routes/user';
import blogs from './routes/blogs';
import { cors } from 'hono/cors';


const apiV1 = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET:string
  }
}>().basePath('/api/v1');
apiV1.use('/*',cors());
apiV1.route('/user',user);
apiV1.route('/blogs',blogs)





export default apiV1;
