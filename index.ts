import express, { Request, Response } from 'express'
import client from './database'

const app = express()

app.get('/tables', (req: Request, res: Response) => {
    client.connect()
    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
})

const PORT = process.env.PORT || 5000

app.listen(() => console.log(`http://localhost:${PORT}`))