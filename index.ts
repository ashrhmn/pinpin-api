import express, { Request, Response } from 'express'
import { createConnection } from 'typeorm'
import client from './database'
import User from './model/User'

const app = express()

app.get('/tables', (req: Request, res: Response) => {
    client.connect()
    client.query('SELECT table_schema,table_name FROM information_schema.tables;')
    .then(result=>{
        console.log(result.rows);
        return res.json(result.rows)
    })
    .catch(error=>{
        return res.json(error)
    })
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
    console.log(connection);
    app.listen(PORT,() => console.log(`http://localhost:${PORT}`))    
})
.catch(error=>{
    console.log(error);
})
