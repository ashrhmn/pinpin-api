import express, { Request, Response } from 'express'
import { createConnection, getRepository } from 'typeorm'

import User from './model/User'

const app = express()

app.use(express.json())

app.get('/users', async(req: Request, res: Response) => {
    const result = await getRepository(User).find()
    return res.json(result)
})

app.post('/users',async(req:Request, res:Response)=>{
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role

//    const newData = await getRepository(User).create({username,password,role})

    const result = await getRepository(User).create({username,password,role}).save()
    return res.json(result)
})

const PORT = process.env.PORT || 5000

createConnection({
    type:'postgres',
    url: process.env.DATABASE_URL || "postgresql://ash:@localhost:5432/pinpin",
    synchronize : true,
    logging:true,
    entities:[User]
})
.then(connection=>{
    // console.log(connection);
    app.listen(PORT,() => console.log(`http://localhost:${PORT}`))    
})
.catch(error=>{
    console.log(error);
})
