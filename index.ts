import express, { Request, Response } from 'express'
import client from './database'

const app = express()

app.get('/tables', async(req: Request, res: Response) => {
    client.connect()
    let data = null
    // client.query('SELECT table_schema,table_name FROM information_schema.tables;', (error, result) => {
    //     if (error) throw error;
    //     for (let row of result.rows) {
    //         console.log(JSON.stringify(row));
    //     }
    //     data = result
    //     client.end();
    // });
    const {rows} = await client.query('SELECT table_schema,table_name FROM information_schema.tables;')
    return res.json(rows)
})

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`http://localhost:${PORT}`))