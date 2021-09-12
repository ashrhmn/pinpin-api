import {Client} from 'pg'

const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgresql://ash:@localhost:5432/postgres",
    // ssl:{
    //     rejectUnauthorized: false
    // }
})

export default client